function save(obj) {
	var scriptId = $('#textarea2').attr("scriptId");
	;

	var content = $('#textarea2').val();
	$.post("savescript", {
		scriptId : scriptId,
		content : content
	}

	);
	window.close();
}
function cancel(obj) {

	window.close();
}
function getvars() {

	var vars = [], hash;

	var hashes = window.location.href.slice(
			window.location.href.indexOf('?') + 1).split('&');

	for ( var i = 0; i < hashes.length; i++)

	{

		hash = hashes[i].split('=');

		vars.push(hash[0]);

		vars[hash[0]] = hash[1];

	}

	return vars;
}

function loadscript() {

	var scriptId = getvars()['scriptId'];
	if (scriptId != null) {
		$.post("editscript", {
			scriptId : scriptId
		}, function(data) {
				$('#textarea2').val(
						$('#textarea2').val(data));	
		});
		$('#textarea2').attr("scriptId", scriptId);
	} else
		window.close();
}

$(document).ready(function(scriptId) {
	loadscript();
});