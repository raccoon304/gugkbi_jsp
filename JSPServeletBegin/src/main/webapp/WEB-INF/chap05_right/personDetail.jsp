<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
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
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	
	<title>개별 회원의 성향 결과</title>
	
	<!-- Bootstrap CSS -->
	<link rel="stylesheet" href="<%= ctxPath%>/bootstrap-4.6.2-dist/css/bootstrap.min.css" type="text/css">
	<!-- 사용자정의 CSS -->	
	<link rel="stylesheet" href="<%= ctxPath%>/chap05_css_js_images/css/personDetail.css" type="text/css">
	<!-- JavaScript -->
	<script src="<%= ctxPath%>/js/jquery-3.7.1.min.js"type="text/javascript"></script>
	<script src="<%= ctxPath%>/js/bootstrap.min.js"type="text/javascript"></script>
	<script src="<%= ctxPath%>/chap05_css_js_images/js/personDetail.js"type="text/javascript"></script>
	
</head>
<body class="py-3">
	<div class="container ">
		<div class="card my-5">
			<div class="card-header"> <!-- .card-header에는 카드 머리말이 들어갑니다. -->
				<p class="h2 text-center">
					<span class="text-primary">${requestScope.psdto.name}</span>&nbsp;<small>님의 개인성향 결과</small>
				</p>
			</div>
			
			<div class="card-body"> <!-- .card-body에는 카드 내용이 들어갑니다. -->
				<div class="row">
					<div class="col-md-3 border-bottom my-3 pb-2">회원번호</div>
					<div class="col-md-9 border-bottom my-3 pb-2">${psdto.seq}</div>
					
					<div class="col-md-3 border-bottom my-3 pb-2">성명</div>
					<div class="col-md-9 border-bottom my-3 pb-2 h5">${psdto.name}</div>
					
					<div class="col-md-3 border-bottom my-3 pb-2">학력</div>
					<div class="col-md-9 border-bottom my-3 pb-2 h5">${psdto.school}</div>
					
					<div class="col-md-3 border-bottom my-3 pb-2">색상</div>
					<div class="col-md-9 border-bottom my-3 pb-2 h5">
						<c:choose>
							<c:when test="${psdto.color eq 'red'}">빨강</c:when>
							<c:when test="${psdto.color eq 'blue'}">파랑</c:when>
							<c:when test="${psdto.color eq 'green'}">초록</c:when>
							<c:when test="${psdto.color eq 'yellow'}">노랑</c:when>
							<c:otherwise></c:otherwise>
						</c:choose>
						<span id="colorbox" style="background-color:${psdto.color}"></span>
					</div>
					
					<div class="col-md-3 border-bottom my-3 pb-2">음식</div>
					<div class="col-md-9 border-bottom my-3 pb-2 h5">${psdto.strFood}</div>
					
					<div class="col-md-3 border-bottom my-3 pb-2">음식이미지파일명</div>
					<div class="col-md-9 border-bottom my-3 pb-2 h5">
						<c:if test="${empty psdto.strFood_imgFileName}">
							없음.
						</c:if>
						
						<c:if test="${not empty psdto.strFood_imgFileName}">
							${psdto.strFood_imgFileName}"
						</c:if>
						
					</div>
					
					
					<div class="col-md-3 border-bottom my-3 pb-2">음식사진</div>
					<div class="col-md-9 border-bottom my-3 pb-2 ">
						<c:if test="${empty psdto.strFood_imgFileName}">
							없음.
						</c:if>
						
						<c:if test="${not empty psdto.strFood_imgFileName}">
							<c:forTokens var="food" items="${psdto.strFood_imgFileName}" delims=",">
								<img alt="food" src="<%= ctxPath%>/chap05_css_js_images/images/${food}" style="width: 130px;" class="img-fluid rounded mr-1">
								
							</c:forTokens>
						</c:if>
					</div>
				</div>
			</div>
			
			<div class="card-footer"> <!-- .card-footer에는 카드 꼬리말이 들어갑니다. -->
				<div class="row">
					<div class="col-md-3 text-center">
						<a href="personSelect.do" class="btn btn-info">목록보기1</a>
					</div>
					
					<div class="col-md-3">
						<!-- 
						<button type="button" onclick="javascript:location.href='personSelect.do'" class="btn btn-success">
							목록보기2
						</button>
						 -->
						<!-- 또는  javascript: 빼도댐/-->
						<button type="button" onclick="location.href='personSelect.do'" class="btn btn-success text-center">
							목록보기2
						</button>
					</div>
					
					<div class="col-md-3 text-center">
						<button type="button" class="btn btn-danger text-center" onclick="">
							삭제하기
						</button>
					</div>
					<div class="col-md-3 text-center">
						<button type="button" class="btn btn-primary text-center" onclick="">
							내정보 수정하기
						</button>
					</div>
					
				</div>
			</div>
		</div>
	</div>
</body>
</html>