<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>테스트4입니다.</title>
</head>
<body>
안녕하세요 ${name}
<img alt="img" src="<%=request.getContextPath()%>/images/${img}">
</body>
</html>