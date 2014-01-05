<%@ page language="java" contentType="text/html; charset=UTF-8"  
    pageEncoding="UTF-8"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<div class="span2 main-menu-span">
<fmt:bundle basename="i18n">
	<div class="well nav-collapse sidebar-nav">
		<ul class="nav nav-tabs nav-stacked main-menu">
			<li class="nav-header hidden-tablet"><fmt:message key="main" /></li>
			<li><a class="ajax-link" href="agentManage.jsp"><i
					class="icon-home"></i><span class="hidden-tablet"><fmt:message key="agentmanage" /></span></a></li>
			<li><a class="ajax-link" href="portManage.jsp"><i
					class="icon-eye-open"></i><span class="hidden-tablet"><fmt:message key="portmanage" /></span></a></li>
		</ul>
		<label id="for-is-ajax" class="hidden-tablet" for="is-ajax"> <input
			id="is-ajax" type="checkbox"> Ajax on menu
		</label>
	</div>
</fmt:bundle>
</div>
