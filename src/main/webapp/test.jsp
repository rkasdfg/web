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
<link href='bench4q-css/bench4q.css' rel='stylesheet'>
<link rel="shortcut icon" href="img/favicon.ico">

</head>

<body>
	<fmt:bundle basename="i18n">
		<jsp:include page="publiccontrol/navigatebar.jsp"></jsp:include>
		<div class="container-fluid">
			<div class="row-fluid">
				<jsp:include page="publiccontrol/leftmenubar.jsp"></jsp:include>
				<div id="content" class="span10">
					<!-- content starts -->

					<!-- up navigatebar start-->
					<div>
						<ul class="breadcrumb">
							<li><a href="homepage.jsp"><fmt:message key="home" /></a> <span
								class="divider">/</span></li>
							<li><a href="#"><fmt:message key="creatatest" /></a></li>
						</ul>
					</div>
					<!-- up navigatebar ends -->
					<div id="selectScripts" class="hide" >
						<div class="row-fluid sortable">
							<div class="box span12 center">
								<div class="box-header well">
									<h2>
										<fmt:message key="choosethescriptrecorded" />
									</h2>
								</div>
								<div class="box-content">
									<%-- <p class="center">
								<a class="btn btn-large btn-primary" onClick="selectScript()"><fmt:message key="loadascript" /></a> <a class="btn btn-large btn-primary"
									onClick="startTest()"><fmt:message key="startthetest" /></a> <a
									class="btn btn-large btn-primary"
									onClick="$('#configip').modal('show')"><fmt:message key="configthecluster" /></a>
							</p> --%>

									<div class="table-body">
										<table id="scriptLib"
											class="table table-striped table-bordered bootstrap-datatable datatable">
											<thead>
												<tr>
													<th><fmt:message key="choose" /></th>
													<th><fmt:message key="scriptname" /></th>
													<th>ID</th>
													<th><fmt:message key="datecreated" /></th>
													<th><fmt:message key="actions" /></th>
												</tr>
											</thead>
											<tbody>

											</tbody>
										</table>
									</div>
									<div>
										<button type="button" class="btn btn-primary"
											data-dismiss="modal" onClick="submitSelectedScript()">
											<fmt:message key="choose" />
										</button>
										<button type="button" class="btn btn-primary"
											data-dismiss="modal">
									<fmt:message key="cancel" />
										</button>
									</div>
								</div>
								<!--box content-->
							</div>
							<!-- box span -->
							<div class="box span12 center">
								<div class="box-header well">
									<h2>
										<fmt:message key="selectedScripts" />
									</h2>
								</div>
								<div class="box-content">
									<table id="selectedScripts"
										class="table table-striped table-bordered bootstrap-datatable datatable">
										<thead>
											<tr>
												<th><fmt:message key="scriptname" /></th>
												<th>ID</th>
												<th><fmt:message key="datecreated" /></th>
												<th><fmt:message key="actions" /></th>
											</tr>
										</thead>
										<tbody>
										</tbody>
									</table>
								</div>
								<!-- box content -->
							</div>
							<!-- box span12 -->
							<div class="nextButton ">
								<button type="button"
									title=<fmt:message key="configthecluster" />
									class="btn btn-large btn-primary" data-dismiss="modal"
									onClick="next('selectScripts','configCluster')">
									<fmt:message key="next" />
								</button>
							</div>
						</div>
						<!-- row-fluid span12 -->
					</div>
					<!-- selectScripts -->
					<div id="configCluster" class="hide">

						<div class="row-fluid sortable">
							<div class="box span12 center">
								<div class="box-header well">
									<h2>
										<fmt:message key="choosethescriptrecorded" />
									</h2>
								</div>
								<div class="box-content">
									<div class="ip-div">
										<lable class="control-label" for="focusedInput">IP:</lable>
										<input type="text" class="input-medium focused" id="inputIP"
											value="" />
									</div>
									<div id="ipNullMessage" class="hide green"></div>
									<div>
										<button type="button" class="btn btn-primary"
											onClick="addIP()">
											<fmt:message key="add" />
										</button>
										<button type="button" class="btn btn-primary"
											onClick="clearIP()">
											<fmt:message key="clear" />
										</button>
									</div class="div-distance">
									<div>
										<table id="ipTable"
											class="table table-striped table-bordered bootstrap-datatable datatable">
											<thead>
												<tr>
													<th><fmt:message key="number" /></th>
													<th>IP</th>
													<th><fmt:message key="actions" /></th>
												</tr>
											</thead>
											<tbody>
											</tbody>
										</table>
									</div>
									<div class="nextButton ">
										<button type="button"
											title=<fmt:message key="startthetest" />
											class="btn btn-large btn-primary" data-dismiss="modal"
											onClick="startTest()">
											<fmt:message key="startthetest" />
										</button>
									</div>
								</div>
								<!-- box content -->
							</div>
							<!-- box span -->
						</div>
						<!-- row fluid -->
					</div>
					<!-- configCluster -->

				
				</div>
				<!-- span10 -->
			</div>
			<!-- row-fluid span10 -->
			<!-- content ends -->

		</div>
		<!--/fluid-row-->

		<hr>

		<div class="modal hide fade" id="configScript">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">x</button>

				<h3>
					<fmt:message key="selectparams" />
				</h3>
			</div>
			<div class="modal-body">
				<p>
					<fmt:message key="choosethescriptrecorded" />
				</p>
				<form class="form-horizontal">
					<fieldset>
						<div class="control-group">
							<label class="control-label" for="focusedInput">requireLoad</label>
							<div class="controls">
								<input class="input-xlarge focused" id="requireLoad" type="text"
									value="0">
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="focusedInput">warm up</label>
							<div class="controls">
								<input class="input-xlarge focused" id="warmup" type="text"
									value="0">
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="focusedInput">cooldown</label>
							<div class="controls">
								<input class="input-xlarge focused" id="cooldown" type="text"
									value="0">
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="focusedInput">executeRange</label>
							<div class="controls">
								<input class="input-xlarge focused" id="executeRange"
									type="text" value="0">
							</div>
						</div>
					</fieldset>
				</form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-primary" data-dismiss="modal"
					onClick="submitform()">
					<fmt:message key="submit" />
				</button>
				<button type="button" class="btn btn-primary" data-dismiss="modal">
					<fmt:message key="cancel" />
				</button>
			</div>
		</div>



		<footer>
			<p class="pull-left">&copy; Bench4Q 2013</p>
			<p class="pull-right">
				<fmt:message key="poweredby" />
				: Bench4Q
			</p>
		</footer>

		</div>
		<!--/.fluid-container-->

		<!-- external javascript
	================================================== -->
		<!-- Placed at the end of the document so the pages load faster -->

		<!-- jQuery -->
		<script src="js/jquery-1.7.2.min.js"></script>
		<!-- jQuery UI -->
		<script src="js/jquery-ui-1.8.21.custom.min.js"></script>
		<!-- modal / dialog library -->
		<script src="js/bootstrap-modal.js"></script>
		<!-- custom dropdown library -->
		<script src="js/bootstrap-dropdown.js"></script>
		<!-- library for advanced tooltip -->
		<script src="js/bootstrap-tooltip.js"></script>
		<!-- popover effect library -->
		<script src="js/bootstrap-popover.js"></script>
		<!-- library for cookie management -->
		<script src="js/jquery.cookie.js"></script>
		<!-- data table plugin -->
		<script src='js/jquery.dataTables.min.js'></script>
		<!-- application script for Charisma demo -->
		<script src="js/charisma.js"></script>
			<script src="js/theme.js"></script>
		<script src="js/jquery.i18n.properties-1.0.9.js"></script>
		<script src="script/base.js"></script>
		<script src="script/test.js"></script>
		<script src="script/scriptAction.js"></script>
	</fmt:bundle>
</body>
</html>
