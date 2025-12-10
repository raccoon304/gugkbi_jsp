<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
    
<%-- === JSTP(Java Standard Tag Library) 사용하기 === --%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>    
    
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
    
    
<% String ctxPath = request.getContextPath(); %>  
    
    
    
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>forTokens 를 이용하여 친구이름 출력하기, split 함수를 이용하여 친구이름 출력하기</title>
</head>
<body>
	<h2 style="background-color: navy; color: white;">forTokens 를 이용하여 친구이름 출력하기</h2>
	
	
	<c:if test="${empty man}">
		<span style="color: red;">남자가 없습니다.</span>
	</c:if>
	
	<c:if test="${not empty man}">
		<div>
			<ol>
				<!-- forEach는 배열 또는 리스트에 사용하고, forTokens는 split의 경우. -->
				<c:forTokens var="name" items="${man}" delims=",">
								<!-- KEY 값 --> <!-- 스플릿 기준 -->
					<%-- forTokens 에서 items="${}" 에 들어오는 것은 배열이나 List가 아닌 하나의 문자열이 들어온다. --%>
                    <%-- 문자열을 , 로 잘라서 배열로 만들어준다. --%>
                	<li>${name}</li>   
				</c:forTokens>
			</ol>
		</div>
	</c:if>
	
	
	
	<hr style="border: solid 1px red">
	
	
	
	<c:if test="${not empty woman}">
		<div>
			<ol>
				<!-- forEach는 배열 또는 리스트에 사용하고, forTokens는 split의 경우. -->
				<c:forTokens var="name" items="${woman}" delims=",./">
								<!-- KEY 값 --> <!-- 스플릿 기준 -->
					<%-- forTokens 에서 items="${}" 에 들어오는 것은 배열이나 List가 아닌 하나의 문자열이 들어온다. --%>
                    <%-- 문자열을 , 로 잘라서 배열로 만들어준다. --%>
                	<li>${name}</li>   
				</c:forTokens>
			</ol>
		</div>
	</c:if>
	
	
	
	<hr style="border: solid 1px red">
	
	
	
	<h2 style="background-color: navy; color: yellow;">split 함수를 이용하여 친구이름 출력하기</h2>

	<c:if test="${not empty man}">
		<c:set var="arrMan" value="${fn:split(man,',')}"/>
					<!-- KEY가 man을 찾아서 , 로 split 해주고 배열을 arrMan에 담음 -->
		<div>
			<ol>
				<c:forEach var="name" items="${arrMan}">
					<li>${name}</li>   
				</c:forEach>	
			</ol>
		</div>
	</c:if>
	
	
	
	<hr style="border: solid 1px red">
	
	
	
	<c:if test="${not empty woman}">
		<c:set var="arrWoman" value="${fn:split(woman,',./')}"/>
					<!-- KEY가 man을 찾아서 , 로 split 해주고 배열을 arrMan에 담음 -->
		<div>
			<ol>
				<c:forEach var="name" items="${arrWoman}">
					<li>${name}</li>   
				</c:forEach>	
			</ol>
		</div>
	</c:if>
	
	
	
	
	
	
	
	
	
	
</body>
</html>