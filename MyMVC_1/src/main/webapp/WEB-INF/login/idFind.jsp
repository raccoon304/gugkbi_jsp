<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%
	String ctxPath = request.getContextPath();
	

%>

<!-- Required meta tags -->
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

<!-- Bootstrap CSS -->
<link rel="stylesheet" type="text/css" href="<%= ctxPath%>/bootstrap-4.6.2-dist/css/bootstrap.min.css" > 

<!-- Optional JavaScript -->
<script type="text/javascript" src="<%= ctxPath%>/js/jquery-3.7.1.min.js"></script>
<script type="text/javascript" src="<%= ctxPath%>/bootstrap-4.6.2-dist/js/bootstrap.bundle.min.js" ></script> 

<script type="text/javascript">
	$(function(){
		
		const method = "${requestScope.method}";
		// requestScope.method로 넘어오면 GET 또는 POST 로 넘어올텐데, 스크립트는 "GET" 또는 "POST"로 넣기에 
		// 홑, 쌍 따움표를 무조건 해줘야됨.  아니면, 변수로 이해해버림. 
		
/*		console.log("확인용 method : " + method);
		//확인용 method : POST
*/		
		if(method == "GET"){
			$("div#div_findResult").hide();	
		}
		else{
			$('input:text[name="name"]').val('${requestScope.name}');
			$('input:text[name="email"]').val('${requestScope.email}');
		}
		
		
		$('input:text[name="email"]').bind("keyup", function(e){
			if(e.keyCode == 13){
				goFind();
			}
		});
		$("button.btn-success").click(function(){
			goFind();
		});
	});// EoP function()
	
	
	//Function Declearation
	function goFind(){
		const name = $('input:text[name="name"]').val().trim();
		if(name == ""){
			alert("성명을 입력하세요.")
			return; // goFind() 함수 종료 
		}
		const email = $('input:text[name="email"]').val().trim();
		const regExp_email = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i; // 이메일 정규 표현식 
		
		const bool = regExp_email.test(email)
		
		if(!bool){ //이메일 정규표현식에 위배된 경우 
			alert("이메일을 다시 확인해 주세요.");
			return;
		}
		
		const frm = document.idFindFrm;
		<%-- frm.action = "<%= ctxPath%>/login/idFind.up"; --%> //해당 폼에 action이 따로 없을경우 default는 자기 페이지를 가리키고, GET 방식으로 하게됨. 
		frm.method = "post";
		frm.submit();
		
		
	}// EoP function goFind(){}
	
	
	// 아이디 찾기 모달창에 입력한 input 태그 value 값 초기화 시켜주는 함수 생성하기
	function func_form_reset_empty(){
		document.querySelector('form[name="idFindFrm"]').reset();
		$('div#div_findResult').empty();
	}
	

</script> 


<form name="idFindFrm">

   <ul style="list-style-type: none;">
      <li style="margin: 25px 0">
          <label style="display: inline-block; width: 90px;">성명</label>
          <input type="text" name="name" size="25" autocomplete="off" /> 
      </li>
      <li style="margin: 25px 0">
          <label style="display: inline-block; width: 90px;">이메일</label>
          <input type="text" name="email" size="25" autocomplete="off" /> 
      </li>
   </ul> 

   <div class="my-3 text-center">
      <button type="button" class="btn btn-success">찾기</button>
   </div>
   
</form>

<div class ="my-3 text-center" id="div_findResult">
	ID : <span style="color: red; font-size: 16pt; font-weight: bold;">${requestScope.userid}</span>
</div>




