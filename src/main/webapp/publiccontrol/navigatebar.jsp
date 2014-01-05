<%@ page language="java" contentType="text/html; charset=UTF-8"  
    pageEncoding="UTF-8"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<div class="navbar">
<fmt:bundle basename="i18n">
	<div class="navbar-inner">
		<div class="container-fluid">
			<a class="btn btn-navbar" data-toggle="collapse"
				data-target=".top-nav.nav-collapse,.sidebar-nav.nav-collapse"> <span
				class="icon-bar"></span> <span class="icon-bar"></span> <span
				class="icon-bar"></span>
			</a> <a class="brand" href="index.jsp"> <img alt="Charisma Logo"
				src="img/bench4q-1.png" /> <span>Bench4Q</span></a>

			<!-- theme selector starts -->
			<div class="btn-group pull-right theme-container">
				<a class="btn dropdown-toggle" data-toggle="dropdown" href="#">
					<i class="icon-tint"></i><span class="hidden-phone"> <fmt:message key="changetheme" /></span> <span class="caret"></span>
				</a>
				<ul class="dropdown-menu" id="themes">
					<li><a data-value="classic" href="#"><i class="icon-blank"></i>
							<fmt:message key="classic" /></a></li>
					<li><a data-value="cerulean" href="#"><i
							class="icon-blank"></i> <fmt:message key="cerulean" /></a></li>
					<li><a data-value="cyborg" href="#"><i class="icon-blank"></i>
							<fmt:message key="cyborg" /></a></li>
					<li><a data-value="redy" href="#"><i class="icon-blank"></i>
							Redy</a></li>
					<li><a data-value="journal" href="#"><i class="icon-blank"></i>
							<fmt:message key="journal" /></a></li>
					<li><a data-value="simplex" href="#"><i class="icon-blank"></i>
							Simplex</a></li>
					<li><a data-value="slate" href="#"><i class="icon-blank"></i>
							Slate</a></li>
					<li><a data-value="spacelab" href="#"><i
							class="icon-blank"></i> Spacelab</a></li>
					<li><a data-value="united" href="#"><i class="icon-blank"></i>
							United</a></li>
				</ul>
			</div>
			<!-- theme selector ends -->

			<!-- user dropdown starts -->
			<div class="btn-group pull-right">
				<a class="btn dropdown-toggle" data-toggle="dropdown" href="#">
					<i class="icon-user"></i><span class="hidden-phone"> <%=session.getAttribute("username")%></span>
					<span class="caret"></span>
				</a>
				<ul class="dropdown-menu">
					<li><a href="#"><fmt:message key="profile" /></a></li>
					<li class="divider"></li>
					<li><a href="login.html"><fmt:message key="logout" /></a></li>
				</ul>
			</div>
			<!-- user dropdown ends -->

			<div class="top-nav nav-collapse">
				<ul class="nav">
					<li><a href="#"><fmt:message key="visitsite" /></a></li>
					<li>
						<form class="navbar-search pull-left">
							<input placeholder="Search" class="search-query sp an2"
								name="query" type="text">
						</form>
					</li>
				</ul>
			</div>
			<!--/.nav-collapse -->
		</div>
	</div>
</fmt:bundle>
</div>