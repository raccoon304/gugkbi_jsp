<%@page import="chap03.MemberDTO"%>
<%@page import="java.lang.reflect.Member"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
    
<%
	/* MemberDTO 객체 생성하기. */
	MemberDTO mbr1 = new MemberDTO();
	mbr1.setName("이순신");
	mbr1.setJubun("9811271234567");
	
	String name1 = mbr1.getName();
	String jubun1 = mbr1.getJubun();
	String gender1 = mbr1.getGender();
	
%>
    
    
    
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>JSP 표준 액션 중 useBean에 대해서 알아보기.</title>
</head>
<body>
	<div>
		<h2>스크립틀릿을 사용하여 MemberDTO 클래스의 객체정보 불러오기</h2>
	</div>
	
	<hr style="border: solid 1px red;">
	
	<div>
		<h2>JSP 표준액션 중 useBean을 사용하여 MemberDTO 클래스의 객체정보 불러오기</h2>
	</div>


</body>
</html>