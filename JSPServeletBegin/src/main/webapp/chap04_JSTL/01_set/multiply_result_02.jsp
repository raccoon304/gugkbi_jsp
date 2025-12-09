<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
    
    
<%
	String firstNum = request.getParameter("firstNum");
	String secondNum = request.getParameter("secondNum");
	
	int result = Integer.parseInt(firstNum) * Integer.parseInt(secondNum);
%>
<%-- === JSTP(Java Standard Tag Library) 사용하기 === --%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%-- === 태그를 사용하여 변수를 선언하기 === --%>
<c:set var="num1" value="${param.firstNum}}"></c:set>
<c:set var="num2" value="${param.secondNum}}"></c:set>
<c:set var="result" value="${num1 * num2}}"></c:set>
<!-- 자동 형변환 되어짐.  -->

<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>두개의 수를 입력받아 곱셈한 결과 출력하기 </title>
</head>
<body>
	<h2>두개의 수를 입력받아 곱셈한 결과 출력하기</h2>
	<br>
	<%= firstNum%> 와 <%= secondNum %>의 곱은 <%= result %>입니다.

	<br>
	<hr style="border: solid 1px red;">
	${num1} 과 ${num2}의 곱은 ${result}입니다. 
	
	<br>
	<hr style="border: solid 1px red;">
	${param.firstNum} 과 ${param.secondNum}의 곱은 ${result}입니다. 




</body>
</html>