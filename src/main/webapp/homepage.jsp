<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<html>
<head>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<meta charset="utf-8">
<title>Bench4Q</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description"
	content="Bench4Q, a new method for QOS benchmarking.">
<meta name="author" content="Kai Ren">
<!-- The styles -->
<link id="bs-css" href="css/bootstrap-cerulean.css" rel="stylesheet">
<link href="css/bootstrap-responsive.css" rel="stylesheet">
<link href="css/charisma-app.css" rel="stylesheet">
<link href="css/jquery-ui-1.8.21.custom.css" rel="stylesheet">
<link href='css/jquery.noty.css' rel='stylesheet'>
<link href='css/noty_theme_default.css' rel='stylesheet'>
<link href='css/opa-icons.css' rel='stylesheet'>

<link rel="shortcut icon" href="img/bench4q-1.ico">

</head>

<body>
	<fmt:bundle basename="i18n">
		<jsp:include page="publiccontrol/navigatebar.jsp"></jsp:include>
		<!-- topbar ends -->
		<div class="container-fluid">
			<div class="row-fluid">


				<div id="content" class="span10 center">
					<!-- content starts -->
					<div class="sortable row-fluid">
						<a data-rel="tooltip" class="well span4 top-block" href="test.jsp">
							<span class="icon32 icon-blue icon-plus"></span>
							<div>
								<fmt:message key="creattestplan" />
							</div>
						</a> <a data-rel="tooltip" class="well span4 top-block"
							href="script.jsp"> <span class="icon32 icon-green icon-edit"></span>
							<div>
								<fmt:message key="scriptmanagement" />
							</div>
						</a> <a data-rel="tooltip" class="well span4 top-block"
							href="testplan.jsp"> <span
							class="icon32 icon-color icon-star-on"></span>
							<div>
								<fmt:message key="testhistory" />
							</div>
						</a>
					</div>

					<div class="row-fluid">
						<div class="box span12">
							<div class="box-introduction">
								<div class="alert1 alert-error"
									style="float: left; width: 278px;">
									<br />
									<fmt:message key="creat" />
									<br /> <br />
									<fmt:message key="testplan" />
									<br /> <br /> <br />

								</div>
								<div class="alert2 alert-info"
									style="float: right; width: 550px;">
									<fmt:message key="creattestplanhead" />
									<br /> <br />
									<fmt:message key="creattestplancontent1" />
									<br />
									<fmt:message key="creattestplancontent2" />
									<br />
									<fmt:message key="creattestplancontent3" />
									<br /> <br />
								</div>
								<div style="clear: both;"></div>
							</div>

						</div>
						<!--/span-->
					</div>
					<!--/row-->
					<div class="row-fluid">
						<div class="box span12">
							<div class="box-introduction"></div>
							<div class="alert1 alert-success"
								style="float: left; width: 278px;">
								<br />
								<fmt:message key="script" />
								<br /> <br /> <br />
								<fmt:message key="management" />
								<br /> <br /> <br />
							</div>
							<div class="alert2 alert-info"
								style="float: right; width: 550px;">

								<fmt:message key="scriptmanagementhead" />
								<br /> <br />
								<fmt:message key="scriptmanagementcontent1" />
								<br />
								<fmt:message key="scriptmanagementcontent2" />
								<br />
								<fmt:message key="scriptmanagementcontent3" />
								<br /> <br /> <br />
							</div>
						</div>
						<!--/span-->
					</div>
					<!--/row-->
					<div class="row-fluid">
						<div class="box span12">
							<div class="alert1 alert-heading"
								style="float: left; width: 278px;">
								<br />
								<fmt:message key="test" />
								<br /> <br /> <br />
								<fmt:message key="history" />
								<br /> <br /> <br />

							</div>
							<div class="alert2 alert-info"
								style="float: right; width: 550px;">

								<fmt:message key="testhistoryhead" />
								<br /> <br />
								<fmt:message key="testhistorycontent1" />
								<br />
								<fmt:message key="testhistorycontent2" />
								<br /> <br /> <br /> <br />
							</div>
							<div class="box-introductiont"></div>
						</div>
						<!--/span-->
					</div>
					<!--/row-->
					<div class="clearfix"></div>

					<!-- content ends -->
				</div>
				<!--/#content.span10-->
			</div>
			<!--/fluid-row-->

			<hr>
			<footer>
				<p class="pull-left">
					&copy; <a href="http://usman.it" target="_blank">Bench4Q</a> 2013
				</p>
				<p class="pull-right">
					<fmt:message key="poweredby" />
					: <a href="http://usman.it/free-responsive-admin-template">Bench4Q</a>
				</p>
			</footer>

		</div>
		<!--/.fluid-container-->
		<!-- external javascript ========== -->
		<script src="js/jquery-1.7.2.min.js"></script>
		<!-- jQuery UI -->
		<script src="js/jquery-ui-1.8.21.custom.min.js"></script>
		<!-- association with remembering the selected theme -->
		<script src="js/bootstrap-dropdown.js"></script>
		<script src="js/jquery.cookie.js"></script>
		<script src="js/theme.js"></script>
	</fmt:bundle>
</body>
</html>
