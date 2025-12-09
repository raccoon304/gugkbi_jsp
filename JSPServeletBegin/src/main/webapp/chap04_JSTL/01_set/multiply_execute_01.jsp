<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
    
    
<%
	String ctxPath = request.getContextPath();
%>
    
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>두개의 수를 입력받아 곱셈하기</title>
	
	<script type="text/javascript" src="<%= ctxPath%>/chap04_JSTL/01_set/js/01.js"></script>
	
</head>
<body>
	<form name="myFrm">
		<p>
			첫번째 수 : <input type="text" name="firstNum" size="5" maxlength="5" />
			두번째 수 : <input type="text" name="secondNum" size="5" maxlength="5" />  
		</p>
		<button type="button" onclick="goSubmit()">계산하기1</button>
		<!-- 
		<button type="submit" onclick="goSubmit()">계산하기2</button>
		<button onclick="goSubmit()">계산하기3</button>
		 
		 -->
		<!-- 버튼 태그가 form 태그 밖에 나온경우 type을 지정하지 않을시, button태그 이고, 
			 버튼 태그사 form 태그 내에 있는경우 type을 지정하지 않을시, submit이다.  -->
		<button type="reset">취소</button>   
	</form>
</body>
</html>