<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>


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
		if(method == "POST"){
	
			$('input:text[name="userid"]').val('${requestScope.userid}'); 
			$('input:text[name="email"]').val('${requestScope.email}');
			
			if(${requestScope.isUserExists == true && requestScope.sendMailSuccess == true} ){// 해당 유저가 있고 메일 발송이 성공한 경우 
				$('button.btn-success').hide();
				
			}		
		}
		
		$('input:text[name="email"]').bind("keyup", function(e){
			if(e.keyCode == 13){
				goFind();
			}
		});
		$("button.btn-success").click(function(){
			goFind();
		});
		
		
		// === 인증하기 버튼 클릭시 이벤트 처리해주기 시작 === //
		$('button.btn-info').click(function(){
			const input_confirmCode = $('input:text[name="input_confirmCode"]').val().trim();
			
			if(input_confirmCode == ""){
				alert("인증코드를 입력하세요.")
				return;
			}
			
			const frm = document.verifyCertificationFrm;
			frm.userCertificationCode.value = input_confirmCode;
			frm.userid.value = $('input:text[name="userid"]').val();
			
			frm.action = "<%= ctxPath%>/login/verifyCertification.up";
			frm.method = "post";
			frm.submit();
			
		});
		
		// === 인증하기 버튼 클릭시 이벤트 처리해주기 끝 === //
		
		
	});// EoP function()
	
	
	
	
	
	
	//Function Declearation
	function goFind(){
		const userid = $('input:text[name="userid"]').val().trim();
		if(userid == ""){
			alert("아이디를 입력하세요.")
			return; // goFind() 함수 종료 
		}
		const email = $('input:text[name="email"]').val().trim();
		const regExp_email = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i; // 이메일 정규 표현식 
		
		const bool = regExp_email.test(email)
		
		if(!bool){ //이메일 정규표현식에 위배된 경우 
			alert("이메일을 다시 확인해 주세요.");
			return;
		}
		
		const frm = document.pwdFindFrm;
		<%-- frm.action = "<%= ctxPath%>/login/pwdFind.up"; --%> //해당 폼에 action이 따로 없을경우 default는 자기 페이지를 가리키고, GET 방식으로 하게됨. 
		frm.method = "post";
		frm.submit();
		
		
	}// EoP function goFind(){}

</script> 


<form name="pwdFindFrm">

   <ul style="list-style-type: none;">
      <li style="margin: 25px 0">
          <label style="display: inline-block; width: 90px;">아이디</label>
          <input type="text" name="userid" size="25" autocomplete="off" /> 
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
	

	<c:if test="${requestScope.isUserExists eq false}">
		<span style="color: red;">사용자 정보가 없습니다</span>
	</c:if>
		
	<c:if test="${requestScope.isUserExists eq true && requestScope.sendMailSuccess eq true}">
		<span style="font-size: 10pt;">
			인증코드가 ${requestScope.email}로 발송되었습니다.<br>
			인증코드를 입력해주세요
		</span>
		<br>
		<input type="text" name="input_confirmCode" />
		<br><br> 
		<button type="button" class="btn btn-info">인증하기</button>
	</c:if>	
	
	<c:if test="${requestScope.sendMailSuccess eq false}">
		<span style="color: red;">메일발송이 실패했습니다</span>
	</c:if>
</div>


<%-- 인증하기 form --%>
<form name="verifyCertificationFrm">
   <input type="hidden" name="userCertificationCode" />
   <input type="hidden" name="userid" />
</form>




