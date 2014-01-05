<%@ page language="java" contentType="text/html; charset=UTF-8"  
    pageEncoding="UTF-8"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<div class="span2 main-menu-span">
<fmt:bundle basename="i18n">
	<div class="well nav-collapse sidebar-nav">
		<ul class="nav nav-tabs nav-stacked main-menu">
			<li class="nav-header hidden-tablet"><fmt:message key="main" /></li>
			<li><a class="ajax-link" href="homepage.jsp"><i
					class="icon-home"></i><span class="hidden-tablet"> <fmt:message key="homepage" /></span></a></li>
			<li><a class="ajax-link" href="test.jsp"><i
					class="icon-list-alt"></i><span class="hidden-tablet">
						<fmt:message key="creattestplan" /></span></a></li>
			<li><a class="ajax-link" href="script.jsp"><i
					class="icon-edit"></i><span class="hidden-tablet"> <fmt:message key="script" /></span></a></li>
			<li><a class="ajax-link" href="testplan.jsp"><i
					class="icon-eye-open"></i><span class="hidden-tablet"> <fmt:message key="testhistory" /></span></a></li>
		</ul>
	</div>
</fmt:bundle>
</div>