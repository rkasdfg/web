<%@page contentType="text/html"%>
<%@ page isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>PortManage Page</title>
<!-- <link id="bs-css" href="style/bootstrap-cerulean.css" rel="stylesheet">
<link href="css/bootstrap-responsive.css" rel="stylesheet">
<link href="style/charisma-app.css" rel="stylesheet">
<link href="css/bootstrap-classic.css" rel="stylesheet"> -->
<link id="bs-css" href="style/bootstrap-cerulean.css" rel="stylesheet">
<link href="css/bootstrap-responsive.css" rel="stylesheet">
<link href="css/charisma-app.css" rel="stylesheet">
<link href="css/jquery-ui-1.8.21.custom.css" rel="stylesheet">
<link href='css/jquery.noty.css' rel='stylesheet'>
<link href='css/noty_theme_default.css' rel='stylesheet'>
<link href='css/opa-icons.css' rel='stylesheet'>
</head>
<body class="logged_out wider windows  env-production">
	<jsp:include page="publiccontrol/navigatebar.jsp"></jsp:include>
	<div class="container-fluid">
		<div class="row-fluid">
			<jsp:include page="publiccontrol/adminleftmenubar.jsp"></jsp:include>
			<div id="content" class="span10">
				<div>
					<ul class="breadcrumb">
						<li><a href="#">Home</a> <span class="divider">/</span></li>
						<li><a href="#">Port Management</a></li>
					</ul>
				</div>
				<div class="row-fluid sortable">
					<div class="box span12 center">
						<div class="box-header well" data-original-title>
							<h2>
								<i></i>Ports
							</h2>
							<div class="box-icon">
								<a href="#" class="btn btn-setting btn-round"><i
									class="icon-plus" onClick="addPort()"></i></a> <a href="#"
									class="btn btn-minimize btn-round"><i
									class="icon-chevron-up"></i></a> <a href="#"
									class="btn btn-close btn-round"><i class="icon-remove"></i></a>
								<a href="#" class="btn btn-round" onClick="loadPorts()"><i
									class="icon-list"></i></a>
							</div>
						</div>
						<div class="box-content">
							<table id="table"
								class="table table-striped table-bordered bootstrap-datatable datatable">
								<thead>
									<tr>
										<th>port</th>
										<th>ID</th>
										<th>isInUse</th>
										<th>Action</th>
									</tr>
								</thead>
								<tbody>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
		<hr>

		<div class="modal hide fade" id="portParam">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">�</button>
				<h3>Settings</h3>
			</div>
			<div class="modal-body">
				<tr>
					<td><label class="control-label" for="focusedInput">port</label>
					</td>
					<td>
						<div>
							<input class="input-xlarge focused" id="port" type="text"
								value="0">
						</div>
					</td>
				</tr>
			</div>
			<div class="model-footer">
				<button type="button" class="btn btn-primary" data-dismiss="modal"
					onClick="addPortToDB()">Submit</button>
				<button type="button" class="btn btn-primary" data-dismiss="modal">Cancel</button>
			</div>
		</div>
		<footer>
			<p class="pull-left">&copy; Bench4Q 2013</p>
			<p class="pull-right">Powered by: Bench4Q</p>
		</footer>
	</div>
	<script src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-2.0.3.min.js"></script>
	<script
		src="http://ajax.aspnetcdn.com/ajax/jquery.dataTables/1.9.4/jquery.dataTables.min.js"></script>
	<script
		src="http://ajax.aspnetcdn.com/ajax/jquery.ui/1.10.3/jquery-ui.min.js"></script>
	<script src="script/bench4q.table.js"></script>
	<script src="script/portManage.js"></script>
	<script src="js/bootstrap-modal.js"></script>
	
	<!-- library for cookie management, association with remembering the selected theme -->
		<script src="js/bootstrap-dropdown.js"></script>
		<script src="js/jquery.cookie.js"></script>
		<script src="js/charisma.js"></script>
</body>
</html>
