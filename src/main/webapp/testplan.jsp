<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"  
    pageEncoding="UTF-8"%>
<html>
<head>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>Bench4Q</title>
<link id="bs-css" href="style/bootstrap-cerulean.css" rel="stylesheet">
<link href="css/bootstrap-responsive.css" rel="stylesheet">
<link href="style/charisma-app.css" rel="stylesheet">
<link href="css/bootstrap-classic.css" rel="stylesheet">
</head>

<body>
  <fmt:bundle basename="i18n">
	<jsp:include page="publiccontrol/navigatebar.jsp"></jsp:include>
	<div class="container-fluid">
		<div class="row-fluid">
			<jsp:include page="publiccontrol/leftmenubar.jsp"></jsp:include>
			<noscript>
				<div class="alert alert-block span10">
					<h4 class="alert-heading"><fmt:message key="warning" />!</h4>
					<p>
						<fmt:message key="warningcontent1" /><a href="http://en.wikipedia.org/wiki/JavaScript"
							target="_blank">JavaScript</a> <fmt:message key="warningcontent2" />.
					</p>
				</div>
			</noscript>

			<div id="content" class="span10">
				<!-- content starts -->


				<div>
					<ul class="breadcrumb">
						<li><a href="#"><fmt:message key="home" /></a> <span class="divider">/</span></li>
						<li><a href="#"><fmt:message key="testplan" /></a></li>
					</ul>
				</div>

				<div class="row-fluid sortable">
					<div class="box span12 center">
						<div class="box-header well" data-original-title>
							<h2>
								<i></i> <fmt:message key="testplan" />
							</h2>
							<div class="box-icon">
								<a href="#" class="btn btn-minimize btn-round"><i
									class="icon-chevron-up"></i></a> <a href="#"
									class="btn btn-close btn-round"><i class="icon-remove"></i></a>
								<a href="#" class="btn btn-round" onClick="loadTestPlans()"><i
									class="icon-list"></i></a>
							</div>
						</div>
						<div class="box-content">
							<table id="table"
								class="table table-striped table-bordered bootstrap-datatable datatable">
								<thead>
									<tr>
										<th><fmt:message key="testplanrunid" /></th>
										<th>ID</th>
										<th><fmt:message key="createdatetime" /></th>
										<th><fmt:message key="actions" /></th>
									</tr>
								</thead>
								<tbody>
								</tbody>
							</table>
						</div>
					</div>
					<!--/span-->

				</div>
				<!--/row-->


				<!-- content ends -->
			</div>
			<!--/#content.span10-->
		</div>

		<footer>
			<p class="pull-left">&copy; Bench4Q 2013</p>
			<p class="pull-right"><fmt:message key="poweredby" />: Bench4Q</p>
		</footer>

	</div>
	<!--/.fluid-container-->

	<script src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-2.0.3.min.js"></script>
	<script
		src="http://ajax.aspnetcdn.com/ajax/jquery.dataTables/1.9.4/jquery.dataTables.min.js"></script>
	<script
		src="http://ajax.aspnetcdn.com/ajax/jquery.ui/1.10.3/jquery-ui.min.js"></script>
	<script src="script/bench4q.table.js"></script>
	<script src="script/testPlan.js"></script>
	<script src="js/bootstrap-modal.js"></script>
  </fmt:bundle>
</body>
</html>
