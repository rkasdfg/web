<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<html>
<head>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<meta charset="utf-8">
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
<!-- <link href="css/bootstrap-responsive.css" rel="stylesheet"> -->
<link href="css/charisma-app.css" rel="stylesheet">
<!-- <link rel="shortcut icon" href="img/favicon.ico"> -->
</head>

<body>
	<fmt:bundle basename="i18n">
		<div class="container-fluid">
			<div class="row-fluid">

				<div class="row-fluid">
					<div class="span12 center login-header">
						<h2>
							<fmt:message key="welcometo" />
						</h2>
					</div>
					<!--/span-->
				</div>
				<!--/row-->

				<div class="row-fluid">
					<div class="well span5 center login-box">
						<div class="alert alert-info">
							<fmt:message key="loginwith" />
						</div>
						<br />

						<div class="input-prepend" title="Username" data-rel="tooltip">
							<span class="add-on"><i class="icon-user"></i></span> <input
								autofocus class="input-large span10" name="username"
								id="username" type="text" onblur="checkName(this.value)" /> <img
								id="imgName" src="">
						</div>
						<div class="clearfix"></div>

						<div class="input-prepend" title="Password" data-rel="tooltip">
							<span class="add-on"><i class="icon-lock"></i></span> <input
								class="input-large span10" name="password" id="password"
								type="password" onblur="checkPass(this.value)" /> <img
								id="imgPass" src="">
						</div>
						<div class="clearfix"></div>

						<div class="clearfix"></div>

						<p class="center span5">
							<button type="submit" class="btn btn-primary" onClick="login()">
								<fmt:message key="login" />
							</button>
						</p>
						<!-- <div class="clearfix"></div>

						<div class="clearfix"></div> -->
						<p class=" hide" id="loginMsg" >ggg</p>
						<!-- 		<div class="clearfix"></div> -->
						<p class="center span5">
							<a href="register.jsp"> <fmt:message key="sign" /></a>
						</p>
					</div>
					<!--/span-->
				</div>
				<!--/row-->
			</div>
			<!--/fluid-row-->
		</div>
	</fmt:bundle>
	<!--/.fluid-container-->
	<script src="js/jquery-1.7.2.min.js"></script>
	<script src="js/jquery.i18n.properties-1.0.9.js"></script>
	<script src="script/base.js"></script>
	<script src="script/login.js"></script>
</body>
</html>
