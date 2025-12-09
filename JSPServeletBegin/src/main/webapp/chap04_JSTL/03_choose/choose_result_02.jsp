<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<%-- === JSTP(Java Standard Tag Library) 사용하기 === --%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>



<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>choose 를 사용하여 전송되어져온 주민번호를 가지고 성별을 파악한 결과물 출력하기</title>
</head>
<body>
	<c:set var="jubun" value="${param.jubun}"></c:set>
	
	<!-- 주민번호에 - 가 없는 경우  -->
	<c:if test="${fn:length(jubun) eq 13}">
		<c:set var="gender" value="${fn:substring(jubun, 6, 7)}"></c:set>
	</c:if>
	
	<!-- 주민번호에 - 가 있는 경우  -->
	<c:if test="${fn:length(jubun) eq 14}">
		<c:set var="gender" value="${fn:substring(jubun, 7, 8)}"></c:set>
	</c:if>
	
	
	
	주민번호 : ${jubun}<br>
	<c:choose>
		<c:when test="${gender eq '1' or gender eq '3'}">
			남자입니다<br>
		</c:when>
		
		<%-- <c:when test="${gender eq '2' or '4'}">
			여자입니다<br>
		</c:when> --%>
		
		<c:otherwise>
			여자입니다.<br>
		</c:otherwise>
	</c:choose>
</body>
</html>