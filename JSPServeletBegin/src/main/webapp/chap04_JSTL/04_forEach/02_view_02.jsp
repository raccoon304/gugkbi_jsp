<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<%-- === JSTP(Java Standard Tag Library) 사용하기 === --%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>    
    
<%
	String ctxPath = request.getContextPath();				  
%>
    
    
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>개인성향 테스트 입력 결과</title>
</head>
<body>
	<h2>개인 성향 테스트 입력 결과</h2>
	<h3>EL(Expression Language)을 사용한것.</h3>
	<div>
		<ol>
			<li>성명 : ${requestScope.name}</li>
			<!-- 원래는 위처럼 requestScope.name으로 찍어주는게 전체이나, ${name} 만 해도 무관하다. 즉, 생략 가능하다. -->
			<li>학력 : ${school}</li>
			<li>색상 : <span style="display: inline-block; width: 20px; height: 20px; border-radius: 50%; background-color:${color}"></span></li>
			<li>음식 : 
				<c:forEach var="foodImg" items ="${arrFood}">
					<%-- items ="${}"에 들어오는 것은 배열 또는 List이다. 
						 반복의 횟수는 배열길이 또는 List의 size만큼 반복된다 --%>
				 <img alt="img" src="<%= ctxPath%>/chap04_JSTL/04_forEach/images/${foodImg}" width="76.5px" height="57px"/>
				</c:forEach>
		</ol>
	</div>
	
</body>
</html>