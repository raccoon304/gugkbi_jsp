<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%@ page import="java.util.List, chap05.oracle.domain.PersonDTO_02" %>

<!-- JSTL 사용 -->
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%
    // 컨텍스트 패스명(context path name)을 알아오고자 한다.
    String ctxPath = request.getContextPath();
    // ctxPath ==> /JSPServletBegin 
%> 



<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>개인성향 출력페이지</title>
	<!-- Bootstrap CSS -->
	<link rel="stylesheet" href="<%= ctxPath%>/bootstrap-4.6.2-dist/css/bootstrap.min.css" type="text/css">
	<!-- 사용자정의 CSS -->	
	<link rel="stylesheet" href="<%= ctxPath%>/chap05_css_js_images/css/personSelectAll.css" type="text/css">
	<!-- JavaScript -->
	<script src="<%= ctxPath%>/js/jquery-3.7.1.min.js"type="text/javascript"></script>
	<script src="<%= ctxPath%>/js/bootstrap.min.js"type="text/javascript"></script>
	<script src="<%= ctxPath%>/chap05_css_js_images/js/personSelectAll.js"type="text/javascript"></script>
</head>
<body>
	<div id="div1">
		<h3>개인성향 모든 정보 출력 페이지(스크립틀릿을 사용하여 작성한 것)</h3>
<% 
	List<PersonDTO_02> personList = (List<PersonDTO_02>) request.getAttribute("personList");
	
	if(personList.size() > 0 ){
%>
	<table>
		<thead>
			<tr>
				<th>성명</th>
				<th>학력</th>
				<th>색상</th>
				<th>음식</th>
				<th>등록일자</th>
				<th>변경일자</th>
			</tr>
		</thead>
		<tbody>
<%
	for(PersonDTO_02 psdto : personList){
%>
		<tr>
			<td><span><%= psdto.getSeq()%></span><%= psdto.getName()%></td>
			<td><%= psdto.getSchool()%></td>
			<td><%= psdto.getColor()%></td>
			<td><%= psdto.getStrFood()%></td> <!-- food는 배열 형태로, join을 하거나 DTO에 메서드를 만들어줘야함. join쓰기에는 null일 경우도 있고 코드가 길어져서 메소드로 만듬  -->
			<td><%= psdto.getRegisterday()%></td>
			<td><%= psdto.getUpdateday()%></td>
		</tr>
<%
	}// EoP for
%>
		</tbody>
	</table>
<%	
	}
	else{
%>
	<span style="color: red;">데이터가 존재하지 않습니다.</span>
<%	
	}
%>		
		
	</div>
	
	<hr style="border: solid 1px red; margin: 3% auto; width: 80%;">
	
	<div id="div2">
		<div class="container">
			<h3>개인성향 모든 정보 출력 페이지(JSTL을 사용하여 작성한 것)</h3>
			<c:if test="${not empty personList}">
				  <!-- requestScope 생략 -->
				<table class="table table-hover mt-4">
					<thead>
						<tr>
							<th>성명</th>
							<th>학력</th>
							<th>색상</th>
							<th>음식</th>
							<th>등록일자</th>
							<th>변경일자</th>
						</tr>
					</thead>
					<tbody>
						<c:forEach var="psdto" items="${personList}">
							<tr>
								<td><span>${psdto.seq}</span>${psdto.name}</td>
								<td>${psdto.school }</td>
								<td>${psdto.color }</td>
								<td>${psdto.strFood }</td>
								<td>${psdto.registerday }</td>
								<td>${psdto.updateday }</td>
							</tr>
						</c:forEach>
					</tbody>
				</table>
			</c:if>	
			<c:if test="${empty personList}">
				<span style="color: red;">데이터가 존재하지 않습니다.</span>
			</c:if>
			
			<div class="text-center my-5">
				<a href="personRegister.do" class="btn btn-info">개인성향 입력하기</a>	
			</div>
		
		</div>
	</div>
</body>
</html>