<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<%

	String ctxPath = request.getContextPath();
	//	 /JSPservletBegin
	String name = (String) request.getAttribute("name"); 
	String school = (String) request.getAttribute("school"); 
	String color = (String) request.getAttribute("color"); 
	String[] arrFood = (String[]) request.getAttribute("arrFood"); 	
	// request.getAttribute("키",데이터값); ==> requestScope라는 저장소에 데이터값을 "키"값으로 저장된 데이터를 꺼내옴
	// 결과물은 Object 로 나오므로 반드시 castion(형변환)을 꼭 해주어야 한다. 
					  
%>
    
    
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>개인성향 테스트 입력 결과</title>
</head>
<body>
	<h2>개인 성향 테스트 입력 결과</h2>
	<h3>스크립틀릿을 사용한 것</h3>
  
	<div>
		<ol>
			<li>성명 : <%= name %></li>
			<li>학력 : <%= school %></li>
			<li>색상 : <span style="display: inline-block; width: 20px; height: 20px; border-radius: 50%; background-color: <%= color %>"></span></li>
			<li>음식 : 
			<% for(int i=0; i<arrFood.length; i++){ %>
				<img alt="img" src="<%= ctxPath%>/chap03_StandardAction/images/<%=arrFood[i]%>" width="76.5px" height="57px"/>
			<%}%></li>
		</ol>
	</div>

	<hr style="border: solid 1px blue;">
	

	
	<h3>EL(Expression Language)을 사용한것.</h3>
	<div>
		<ol>
			<li>성명 : ${requestScope.name}</li>
			<!-- 원래는 위처럼 requestScope.name으로 찍어주는게 전체이나, ${name} 만 해도 무관하다. 즉, 생략 가능하다. -->
			<li>학력 : ${school}</li>
			<li>색상 : <span style="display: inline-block; width: 20px; height: 20px; border-radius: 50%; background-color:${color}"></span></li>
			<li>음식 : 
			
		</ol>
	</div>
	
	
</body>
</html>