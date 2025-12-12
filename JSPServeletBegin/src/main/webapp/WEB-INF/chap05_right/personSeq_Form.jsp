<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<%
    // 컨텍스트 패스명(context path name)을 알아오고자 한다.
    String ctxPath = request.getContextPath();
    // ctxPath ==> /JSPServletBegin 
%>   
  
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Insert title here</title>
	
	<!-- JavaScript -->
	<script src="<%= request.getContextPath()%>/js/jquery-3.7.1.min.js"type="text/javascript"></script>
	
	<script type="text/javascript">
		/* window.onload = function(){}; ==> JavaScript */
		/* 
		$(document).ready(function(){}); ==> jQuery
		또는
		$(function(){});
		 */
		$(function(){
			const frm = document.myFrm;
			frm.action = "<%= ctxPath%>/personDetail.do"
			frm.method = "post";
			frm.submit();
			
		});
	</script>
</head>
<body>
	<form name="myFrm">
		<input type="text" name="seq" value="${requestScope.seq}">
	</form>
</body>
</html>