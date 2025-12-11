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
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<title>SQL 장애가 발생하는 경우에 보여주는 페이지</title>
	
	<!-- Bootstrap CSS -->
	<link rel="stylesheet" href="<%= ctxPath%>/bootstrap-4.6.2-dist/css/bootstrap.min.css" type="text/css">
	
	<!-- JavaScript -->
	<script src="<%= ctxPath%>/js/jquery-3.7.1.min.js"type="text/javascript"></script>
	<script src="<%= ctxPath%>/js/bootstrap.min.js"type="text/javascript"></script>
</head>

<body>
	<div class="container py-5">
      <p class="h2 text-danger">경고</p>
      <p class="h4 text-primary mt-3">임의 접근 금지.</p>
   </div>
</body>
</html>