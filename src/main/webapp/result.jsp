<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<html>
<head>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<meta charset="utf-8">
<title>Bench4q 2013</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description"
	content="Charisma, a fully featured, responsive, HTML5, Bootstrap admin template.">
<meta name="author" content="Muhammad Usman">

<link id="bs-css" href="css/bootstrap-cerulean.css" rel="stylesheet">
<style type="text/css">
body {
	padding-bottom: 40px;
}

.sidebar-nav {
	padding: 9px 0;
}
</style>
<link href="css/bootstrap-responsive.css" rel="stylesheet">
<link href="css/charisma-app.css" rel="stylesheet">
<link href="css/jquery-ui-1.8.21.custom.css" rel="stylesheet">
<link href='css/fullcalendar.css' rel='stylesheet'>
<link href='css/fullcalendar.print.css' rel='stylesheet' media='print'>
<link href='css/chosen.css' rel='stylesheet'>
<link href='css/uniform.default.css' rel='stylesheet'>
<link href='css/colorbox.css' rel='stylesheet'>
<link href='css/jquery.cleditor.css' rel='stylesheet'>
<link href='css/jquery.noty.css' rel='stylesheet'>
<link href='css/noty_theme_default.css' rel='stylesheet'>
<link href='css/elfinder.min.css' rel='stylesheet'>
<link href='css/elfinder.theme.css' rel='stylesheet'>
<link href='css/jquery.iphone.toggle.css' rel='stylesheet'>
<link href='css/opa-icons.css' rel='stylesheet'>
<link href='css/uploadify.css' rel='stylesheet'>
<link rel="stylesheet" href="TreeView/css/jquery.treeview.css">
<link rel="stylesheet" href="TreeView/css/screen.css">
<link rel="shortcut icon" href="img/favicon.ico">
</head>

<body>
	<fmt:bundle basename="i18n">
		<jsp:include page="publiccontrol/navigatebar.jsp"></jsp:include>
		<div class="container-fluid">
			<div class="row-fluid">
				<!-- left menu starts -->
				<div class="span2 main-menu-span">
					<div class="well nav-collapse sidebar-nav">
						<ul id="testresult" class="filetree treeview-famfamfam">
							<li><span> <fmt:message key="testResult" />
							</span>
								<ul>
									<li><span> <fmt:message key="script" /></span>
										<ul id="scripts" class="filetree treeview-famfamfam">
										</ul></li>
									<li><span> <fmt:message key="sut" /></span>
										<ul id="sut" class="filetree treeview-famfamfam">
										</ul></li>
								</ul></li>
						</ul>
					</div>
					<!--/.well -->
				</div>
				<!--/span-->
				<!-- left menu ends -->
				<noscript>
					<div class="alert alert-block span10">
						<h4 class="alert-heading">
							<fmt:message key="warning" />
							!
						</h4>
						<p>
							<fmt:message key="warningcontent1" />
							<a href="http://en.wikipedia.org/wiki/JavaScript" target="_blank">JavaScript</a>
							<fmt:message key="warningcontent2" />
							.
						</p>
					</div>
				</noscript>

				<div id="content" class="span10">
					<!-- content starts -->



					<div>
						<ul class="breadcrumb">
							<li><a href="homepage.jsp"><fmt:message key="home" /></a> <span
								class="divider">/</span></li>
							<li><a href="test.jsp"><fmt:message key="creatatest" /></a>
								<span class="divider">/</span></li>
							<li><a href="#"><fmt:message key="charts" /></a></li>
						</ul>
					</div>

					<div class="row-fluid sortable">

						<div class="box">
							<div class="box-header well">
								<h2>
									<i class="icon-list-alt"></i>
									<fmt:message key="chartwithpoints" />
								</h2>
								<div class="box-icon">
									<a href="#" class="btn btn-setting btn-round"><i
										class="icon-cog"></i></a> <a href="#"
										class="btn btn-minimize btn-round"><i
										class="icon-chevron-up"></i></a> <a href="#"
										class="btn btn-close btn-round"><i class="icon-remove"></i></a>
								</div>
							</div>
							<div class="box-content" id="container"></div>
						</div>
						<!-- content ends -->
					</div>
					<!--/#content.span10-->
				</div>
				<!--/fluid-row-->

				<hr>



				<footer>
					<p class="pull-left">
						&copy; <a href="http://usman.it" target="_blank">Bench4Q 2013</a>

					</p>
					<p class="pull-right">
						<fmt:message key="poweredby" />
						: <a href="http://usman.it/free-responsive-admin-template">Bench4Q</a>
					</p>
				</footer>
			</div>
			<!--/.row-fluid-->
		</div>
		<!--/.fluid-container-->

		<!-- external javascript
	================================================== -->
		<!-- jQuery -->
		<script src="js/jquery-1.7.2.min.js"></script>
		<!--jQuery UI  -->
		<script src="js/jquery-ui-1.8.21.custom.min.js"></script>
		<!-- modal / dialog library -->
		<script src="js/bootstrap-modal.js"></script>
		<!-- custom dropdown library-->
		<script src="js/bootstrap-dropdown.js"></script>
		<!-- library for advanced tooltip -->
		<script src="js/bootstrap-tooltip.js"></script>
		<!-- popover effect library -->
		<script src="js/bootstrap-popover.js"></script>
		<!-- library for cookie management -->
		<script src="js/jquery.cookie.js"></script>
		<script src='js/jquery.dataTables.min.js'></script>
		<!-- application script for Charisma demo -->
		<script src="js/charisma.js"></script>
		<script src="js/theme.js"></script>
		<script src="TreeView/js/jquery.treeview.js"></script>
		<script src="script/highcharts.js"></script>
		<script src="script/exporting.js"></script>
		<script src="script/result.js"></script>
	</fmt:bundle>
</body>
</html>