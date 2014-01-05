package org.bench4q.web.communication;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.ConnectException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.Map;
import java.util.Vector;

import org.springframework.stereotype.Component;

@Component
public class HttpRequester {
	private String defaultContentEncoding;

	public HttpRequester() {
		this.setDefaultContentEncoding(Charset.defaultCharset().name());
	}

	public String getDefaultContentEncoding() {
		return defaultContentEncoding;
	}

	public void setDefaultContentEncoding(String defaultContentEncoding) {
		this.defaultContentEncoding = defaultContentEncoding;
	}

	public HttpResponse sendPost(String urlString, Map<String, String> params,
			Map<String, String> properties) throws IOException {
		return this.send(urlString, "POST", params, "", properties);
	}

	public HttpResponse sendPostXml(String urlString, String contentString,
			Map<String, String> properties) throws IOException {
		if (properties == null) {
			properties = new HashMap<String, String>();
		}
		properties.put("Content-Type", "application/xml");
		return this.send(urlString, "POST", null, contentString, properties);
	}

	public HttpResponse sendGet(String urlString, Map<String, String> params,
			Map<String, String> properties) throws IOException {
		return this.send(urlString, "GET", params, "", properties);
	}

	private HttpResponse send(String urlString, String method,
			Map<String, String> parameters, String Content,
			Map<String, String> propertys) throws IOException {
		HttpURLConnection urlConnection = null;

		if (method.equalsIgnoreCase("GET") && parameters != null) {
			StringBuffer param = new StringBuffer();
			int i = 0;
			for (String key : parameters.keySet()) {
				if (i == 0)
					param.append("?");
				else
					param.append("&");

				String encodedValue = URLEncoder.encode(parameters.get(key),
						"UTF-8");
				param.append(key).append("=").append(encodedValue);
				i++;
			}
			urlString += param;
		}

		if (!urlString.startsWith("http://")) {
			urlString = "http://" + urlString;
		}
		URL url = new URL(urlString);
		urlConnection = (HttpURLConnection) url.openConnection();

		urlConnection.setRequestMethod(method);
		urlConnection.setDoOutput(true);
		urlConnection.setDoInput(true);
		urlConnection.setUseCaches(false);

		if (propertys != null)
			for (String key : propertys.keySet()) {
				urlConnection.addRequestProperty(key, propertys.get(key));
			}

		if (method.equalsIgnoreCase("POST") && parameters != null) {
			StringBuffer param = new StringBuffer();
			for (String key : parameters.keySet()) {
				param.append("&");
				String encodedValueString = URLEncoder.encode(
						parameters.get(key), "UTF-8");
				param.append(key).append("=").append(encodedValueString);
			}
			urlConnection.getOutputStream().write(param.toString().getBytes());
			urlConnection.getOutputStream().flush();
			urlConnection.getOutputStream().close();
		} else if (method.equalsIgnoreCase("POST") && !Content.isEmpty()) {
			urlConnection.getOutputStream().write(Content.getBytes());
			urlConnection.getOutputStream().flush();
			urlConnection.getOutputStream().close();
		}

		try {
			HttpResponse result = this.makeContent(urlString, urlConnection);
			return result;
		} catch (ConnectException e) {
			return null;
		}

	}

	private HttpResponse makeContent(String urlString,
			HttpURLConnection urlConnection) throws ConnectException {
		HttpResponse httpResponser = new HttpResponse();

		try {
			System.out.println("contentLength in header:"
					+ urlConnection.getContentLengthLong());
			byte[] contentBuffer = null;
			if (urlConnection.getContentLengthLong() > 0) {
				contentBuffer = getOutputStreamWithValidContentLength(urlConnection);
			} else {
				contentBuffer = getOutputWithInvalidContentlength(
						urlConnection, httpResponser);
			}
			return buildHttpResponse(urlString, urlConnection, contentBuffer);
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		} finally {
			if (urlConnection != null)
				urlConnection.disconnect();
		}
	}

	private HttpResponse buildHttpResponse(String urlString,
			HttpURLConnection urlConnection, byte[] contentBuffer)
			throws UnsupportedEncodingException, IOException {
		HttpResponse result = new HttpResponse();
		String ecod = urlConnection.getContentEncoding();
		if (ecod == null)
			ecod = this.defaultContentEncoding;

		result.setUrlString(urlString);
		result.setDefaultPort(urlConnection.getURL().getDefaultPort());
		result.setPort(urlConnection.getURL().getPort());
		result.setProtocol(urlConnection.getURL().getProtocol());
		result.setContent(new String(contentBuffer, ecod));
		result.setByteContent(contentBuffer);
		result.setContentEncoding(ecod);
		result.setCode(urlConnection.getResponseCode());
		result.setMessage(urlConnection.getResponseMessage());
		result.setContentType(urlConnection.getContentType());
		result.setConnectTimeout(urlConnection.getConnectTimeout());
		result.setReadTimeout(urlConnection.getReadTimeout());
		return result;
	}

	private byte[] getOutputWithInvalidContentlength(
			final HttpURLConnection urlConnection,
			final HttpResponse httpResponser) throws IOException {
		BufferedReader bufferedReader = new BufferedReader(
				new InputStreamReader(urlConnection.getInputStream()));
		httpResponser.setContentCollection(new Vector<String>());

		StringBuffer result = new StringBuffer();
		String line = bufferedReader.readLine();
		while (line != null) {
			httpResponser.contentCollection.add(line);
			result.append(line).append("\r\n");
			line = bufferedReader.readLine();
		}
		bufferedReader.close();
		return result.toString().getBytes();
	}

	private byte[] getOutputStreamWithValidContentLength(
			final HttpURLConnection urlConnection) throws IOException {
		int readCount = 0;
		byte[] buffer = new byte[1024];
		long startPosition = 0;
		InputStream in = urlConnection.getInputStream();

		ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
		while ((readCount = in.read(buffer, 0, 1024)) > 0
				&& startPosition < urlConnection.getContentLengthLong()) {
			outputStream.write(buffer, 0, readCount);
			startPosition += readCount;
		}
		System.out.println("outputStream length : " + outputStream.size());
		System.out.println("startPosition : " + startPosition);
		return outputStream.toByteArray();
	}

	public class HttpResponse {

		String urlString;

		int defaultPort;

		int port;

		String protocol;

		String contentEncoding;

		String content;

		byte[] byteContent;

		String contentType;

		int code;

		String message;

		int connectTimeout;

		int readTimeout;

		Vector<String> contentCollection;

		public String getUrlString() {
			return urlString;
		}

		public void setUrlString(String urlString) {
			this.urlString = urlString;
		}

		public int getDefaultPort() {
			return defaultPort;
		}

		public void setDefaultPort(int defaultPort) {
			this.defaultPort = defaultPort;
		}

		public int getPort() {
			return port;
		}

		public void setPort(int port) {
			this.port = port;
		}

		public String getProtocol() {
			return protocol;
		}

		public void setProtocol(String protocol) {
			this.protocol = protocol;
		}

		public String getContentEncoding() {
			return contentEncoding;
		}

		public void setContentEncoding(String contentEncoding) {
			this.contentEncoding = contentEncoding;
		}

		public byte[] getByteContent() {
			return byteContent;
		}

		public void setByteContent(byte[] byteContent) {
			this.byteContent = byteContent;
		}

		public String getContent() {
			return content;
		}

		public void setContent(String content) {
			this.content = content;
		}

		public String getContentType() {
			return contentType;
		}

		public void setContentType(String contentType) {
			this.contentType = contentType;
		}

		public int getCode() {
			return code;
		}

		public void setCode(int code) {
			this.code = code;
		}

		public String getMessage() {
			return message;
		}

		public void setMessage(String message) {
			this.message = message;
		}

		public int getConnectTimeout() {
			return connectTimeout;
		}

		public void setConnectTimeout(int connectTimeout) {
			this.connectTimeout = connectTimeout;
		}

		public int getReadTimeout() {
			return readTimeout;
		}

		public void setReadTimeout(int readTimeout) {
			this.readTimeout = readTimeout;
		}

		public Vector<String> getContentCollection() {
			return contentCollection;
		}

		public void setContentCollection(Vector<String> contentCollection) {
			this.contentCollection = contentCollection;
		}

	}
}
