<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
    
<%@ page import="chap04.PersonDTO, java.util.*" %>    

<%
	PersonDTO person_1 = new PersonDTO();
	person_1.setName("이순신");
	person_1.setSchool("대졸");
	person_1.setColor("빨강");
	person_1.setFood("김밥,라면,짜장면".split("\\,"));
	
	PersonDTO person_2 = new PersonDTO();
	person_2.setName("엄정화");
	person_2.setSchool("대학원졸");
	person_2.setColor("blue");
	person_2.setFood("돈까스,볶음밥,냉모밀,제육볶음".split("\\,"));
	
	PersonDTO person_3 = new PersonDTO();
	person_3.setName("홍길동");
	person_3.setSchool("초대졸");
	person_3.setColor("green");
	person_3.setFood("계란말이,빵,수제비,칼국수".split("\\,"));
	
	PersonDTO person_4 = new PersonDTO();
	person_4.setName("유관순");
	person_4.setSchool("대졸");
	person_4.setColor("yellow");
	person_4.setFood("라면,공기밥,짜장면,한식부페".split("\\,"));
	
	
	List<PersonDTO> personList = new ArrayList<>();
	personList.add(person_1);
	personList.add(person_2);
	personList.add(person_3);
	personList.add(person_4);
	
	request.setAttribute("personList", personList);
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
	Map<String, String> map_1 = new HashMap<>();
	map_1.put("name","이순신2");
	map_1.put("school","대졸");
	map_1.put("color","red");
	map_1.put("food","김밥,라면,짜장면");
	
	Map<String, String> map_2 = new HashMap<>();
	map_2.put("name","엄정화2");
	map_2.put("school","대학원졸");
	map_2.put("color","blue");
	map_2.put("food","돈까스,볶음밥,냉모밀,제육볶음");
	
	Map<String, String> map_3 = new HashMap<>();
	map_3.put("name","홍길동2");
	map_3.put("school","초대졸");
	map_3.put("color","green");
	map_3.put("food","계란말이,빵,수제비,칼국수");
	
	Map<String, String> map_4 = new HashMap<>();
	map_4.put("name","유관순2");
	map_4.put("school","대졸");
	map_4.put("color","yellow");
	map_4.put("food","라면,공기밥,짜장면,한식부페");

	List<Map<String, String>> mapList = new ArrayList<>();
	mapList.add(map_1);
	mapList.add(map_2);
	mapList.add(map_3);
	mapList.add(map_4);
	
	request.setAttribute("mapList", mapList);
	
	//==========View단 페이지 설정하기.======================================================================//
	RequestDispatcher dispatcher = request.getRequestDispatcher("03_forEach_List_view_02.jsp");
	dispatcher.forward(request, response);
	
	
%>
    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>

</body>
</html>