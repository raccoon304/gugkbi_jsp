<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<% 
	String friend_man_name = "김태일,김태리,안태훈,손영대,김민수,정제형,김지섭";
	String friend_woman_name = "양소라,정민정.이한경/홍인혜,김서영";
	
	request.setAttribute("man", friend_man_name);
	request.setAttribute("woman", friend_woman_name);
	
	RequestDispatcher dispatcher = request.getRequestDispatcher("./forTokens_view_02.jsp");
	dispatcher.forward(request, response);
	
	
%>
    
 