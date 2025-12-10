<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<%-- ==== JSTL(JSP Standard Tag Library) 사용하기 ==== --%>     
<%@ taglib prefix="c"  uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt" %>    
    
    
    
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>문자열로 되어진 숫자를 누적한 결과값(자동형변환, 형변환) 나타내기 및 정수로 되어진 데이터를 세자리마다 콤마를 찍어서 나타내어주기</title>
</head>
<body>
	<h2>문자열로 되어진 숫자를 누적한 결과값(자동형변환) 나타내기(JSTL을 사용한것)</h2>
	<c:set var="sum" value="0"></c:set>
	<c:if test="${not empty arr_point_1}">
		<ul>
			<c:forEach var="point" items="${arr_point_1}">
				<li>${point}</li>
				<c:set var="sum" value="${sum+point}"></c:set>
			</c:forEach>
		</ul>
		arr_point_1 누적의 합계 : ${sum}
	</c:if>
	
	
	
	<br><br>
	<hr style="border: solid 1px orange">
	<br>
	
	
<%-- 	
	<h2>문자열로 되어진 숫자를 정수로 형변환하여 결과값 나타내기(JSTL을 사용한것)</h2>
	
	<c:set var="sum" value="0"></c:set>
	<c:if test="${not empty arr_point_1}">
		<ul style="list-style-type: circle;">
			<c:forEach var="point" items="${arr_point_1}">
				<li>
					<fmt:parseNumber var="pointNum" value="${point}" integerOnly="true"></fmt:parseNumber>
					${pointNum}
				</li>
				<c:set var="sum" value="${sum+pointNum}"></c:set>
			</c:forEach>
		</ul>
		arr_point_1 누적의 합계 : ${sum}
	</c:if>
 --%>
	
	
	
	<h2>정수로 되어진 데이터를 세자리 마다 콤마를 찍어서 나타내어 주기(JSTL을 사용한것)</h2>

	<c:set var="sum" value="0"></c:set>
	<c:if test="${not empty arr_price}">
		<ul>
			<c:forEach var="price" items="${arr_price}">
				<li><fmt:formatNumber value="${price}" pattern="#,###" /></li>
				<c:set var="sum" value="${sum+price}"></c:set>
			</c:forEach>
		</ul>
		arr_price 누적의 합계 : <fmt:formatNumber value="${sum}" pattern="#,###" />
	</c:if>


</body>
</html>