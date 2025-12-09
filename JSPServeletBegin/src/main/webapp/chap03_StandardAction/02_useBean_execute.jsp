<%@page import="chap03.MemberDTO"%>
<%@page import="java.lang.reflect.Member"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
    
<%
	 
	/* MemberDTO 객체 생성하기. */
	MemberDTO mbr1 = new MemberDTO();
	mbr1.setSeongmyong("이순신");
	mbr1.setJubun("9811271234567");
	
	String name1 = mbr1.getIrum();
	String jubun1 = mbr1.getJubun();
	String gender1 = mbr1.getGender();
	
//////////////////////////////////////////////////////////////////////////
	MemberDTO mbr2 = new MemberDTO("엄정화", " 9611272234567");
	
	String name2 = mbr2.getIrum();
	String jubun2 = mbr2.getJubun();
	String gender2 = mbr2.getGender();
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
		
 		<ul>
			<li>성명 : <%=name1%></li>
			<li>주번 : <%=jubun1%></li>
			<li>성별 : <%=gender1%></li>
		</ul>
		
		<br>
		
		<ul>
			<li>성명 : <%=name2%></li>
			<li>주번 : <%=jubun2%></li>
			<li>성별 : <%=gender2%></li>
		</ul>
	</div>
	
	<hr style="border: solid 1px red;">
	
	<div>
		<h2>JSP 표준액션 중 useBean을 사용하여 MemberDTO 클래스의 객체정보 불러오기</h2>
		<jsp:useBean id="mbr3" class="chap03.MemberDTO"/>
		<!--위의 것은 아래의 뜻이다. 
		chap03.MemberDTO mbr3 = new chap03.MemberDTO();
		즉, chap03.MemberDTO 클래스의 기본생성자로 mbr3 라는 객체를 생성하는 것이다.
		그래서 JSP 표준 액션중 useBean 을 사용하려면 반드시 기본생성자가 존재해야 한다.    -->
		
		<jsp:setProperty name="mbr3" property="seongmyong" value="김태희"/>
		<!-- 위의 것은 아래의 뜻이다. 
			 mbr3.setName("김태희");
		 -->
		<jsp:setProperty name="mbr3" property="jubun" value="8912092234567"/>
		<ul>
			<li>성명 : <jsp:getProperty property="irum" name="mbr3"/></li>
			<!-- 위의 것은 아래의 뜻이다. 
			 mbr3.getName();
		 	-->
			<li>주번 : <jsp:getProperty property="jubun" name="mbr3"/></li>
			<!-- 위의 것은 아래의 뜻이다. 
			 mbr3.getJubun();
		 	-->
			<li>성별 : <jsp:getProperty property="gender" name="mbr3"/></li>
			<!-- 위의 것은 아래의 뜻이다. 
			 mbr3.getGender();
		 	-->
		</ul>
		
		
	</div>


</body>
</html>