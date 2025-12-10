<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<%-- === JSTP(Java Standard Tag Library) 사용하기 === --%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>    
    
<% String ctxPath = request.getContextPath(); %>
    
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>개인성향 회원정보 출력하기.</title>
	
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<!-- Bootstrap CSS -->
	<link rel="stylesheet" href="<%= ctxPath %>/bootstrap-4.6.2-dist/css/bootstrap.min.css" type="text/css">

</head>
<body>
	<div class="container">
		
		<div style ="border: solid 0px red; width: 60%; margin:3% auto;">
			<table class ="table table-bordered">
				<thead>
					<tr>
						<th>번호</th>
						<th>성명</th>
						<th>학력</th>
						<th>색상</th>
						<th>선호음식</th>
					</tr>
				</thead>
				<tbody>
					<c:if test="${empty personList}">
								<!-- empty는 공백, null 전부 잡음. -->
						<tr>
							<td colspan="5" class="text-center">데이터가 없습니다.</td>
						</tr>
					</c:if>
					
					<c:if test="${not empty personList}">
						<c:forEach var="personDto" items="${personList}" varStatus="status">
							<tr>										  <!-- varStatus=" " -->
						   <%-- <td>${status.index}</td> --%>
								<!-- 0 1 2 ... 를 줌. -->
								<td>${status.count}</td>
								<!-- 1 2 3 ... 를 줌. -->
								<td>${personDto.name}</td>
								<td>${personDto.school}</td>
								<td>${personDto.color}</td>
								<td>${personDto.strFood}</td>
							</tr>
						</c:forEach>
					</c:if>
				</tbody>	
			</table> 
		</div>
		
		<hr style="border: solid 1px blue">
		
		<div style ="border: solid 0px red; width: 60%; margin:3% auto;">
			<table class ="table table-bordered table-dark">
				<thead>
					<tr>
						<th>번호</th>
						<th>성명</th>
						<th>학력</th>
						<th>색상</th>
						<th>선호음식</th>
					</tr>
				</thead>
				<tbody>
					<c:if test="${empty mapList}">
								<!-- empty는 공백, null 전부 잡음. -->
						<tr>
							<td colspan="5" class="text-center">데이터가 없습니다.</td>
						</tr>
					</c:if>
					
					<c:if test="${not empty mapList}">
						<c:forEach var="map" items="${mapList}" varStatus="status">
							<tr>										  <!-- varStatus=" " -->
						   <%-- <td>${status.index}</td> --%>
								<!-- 0 1 2 ... 를 줌. -->
								<td>${status.count}</td>
								<!-- 1 2 3 ... 를 줌. -->
								<td>${map.name}</td>
								<td>${map.school}</td>
								<td>${map.color}</td>
								<td>${map.food}</td>
								<!-- 맵은 key명으로 가져ㅇ옴. -->
							</tr>
						</c:forEach>
					</c:if>
				</tbody>	
			</table> 
		</div>
	</div>
</body>
</html>