<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!-- JSP를 그대로 실행하면 URL에 그대로 디렉터리 구조가 노출댐.  -->

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
	<title>개인성향 데이터 수정하기</title>
	<!-- Bootstrap CSS -->
	<link rel="stylesheet" href="<%= ctxPath%>/bootstrap-4.6.2-dist/css/bootstrap.min.css" type="text/css">
	<!-- 사용자정의 CSS -->	
	<link rel="stylesheet" href="<%= ctxPath%>/chap05_css_js_images/css/personUpdate.css" type="text/css">
	<!-- JavaScript -->
	<script src="<%= ctxPath%>/js/jquery-3.7.1.min.js"type="text/javascript"></script>
	<script src="<%= ctxPath%>/js/bootstrap.min.js"type="text/javascript"></script>
	
	<%-- <script src="<%= ctxPath%>/chap05_css_js_images/js/personupdate.js"type="text/javascript"></script> --%>
 <!-- personUpda_08에 JS를 분리하지 않는 이유 설명 -->
<script type="text/javascript">
	$(function(){
		// 1. 성명 입력해주기 
		$('input:text[name="name"]').val('${psdto.name}');
		// 2. 학력 입력해주기
		$('select[name="school"]').val('${psdto.school}');
		// 3. 색상 입력해주기 
		$('input:radio[value="${psdto.color}"]').prop("checked",true);
		// 4. 음식 입력해주기
		console.log("확인용 음식 :",'${psdto.strFood}');
		// 없을때 => ' ', 있으면=> 확인용 음식 : 짜장면, 짬뽕, 탕수육, 양장피, 팔보채
		const foodes = '${psdto.strFood}'
		if(foodes != ' '){
			const arrFood = foodes.split(",").map(item => item.trim()); //좌우 공백 제거해줌.
			/* 
			아래 넷은 같음. 
			arrFood.forEach(function(item, index, array){});
			arrFood.forEach((item, index, array)=>{});
			arrFood.forEach((item)=>{});
			 */
			arrFood.forEach(item=>{$("input:checkbox[value='"+item+"']").prop("checked",true)});
		}// EoP if(foodes != ' ') 
		
			
		// ====== submit 하기전 데이터 유효성 검사 ====== //
		$('form[name="updateFrm"]').submit(()=>{
			// === 유효성 검사 === // 
			
			// 1. 성명
			const nameLength = $('input:text[name="name"]').val().trim().length;
									// JavaScript는 .value();
			if(nameLength == 0){
				alert("성명을입력하세요")
				$('input:text[name="name"]').val("").focus(); 
				return false; //중요 submit을 하지않는다.
			}
	
			// 2. 학력 필수입력 검사. 
			const schoolVal = $('select[name="school"]').val().trim();
									// JavaScript는 .value();
			if(schoolVal ==  ""){
				alert("학력을입력하세요")			
				return false; //중요 submit을 하지않는다.
			}
			
			// 3. 색상 필수입력 검사. 
			const colorCheckedLength = $('input:radio[name="color"]:checked').length;
			if(colorCheckedLength == 0){
				alert("색상을 선택하세요");
				return false;
			}
		});
	});


</script>	

		
</head>
<body>
	<div class="container border border-info mt-5 p-4 mb-4">
		<p class="h3 md-5">${psdto.name}님 성향 정보 수정하기.</p>
		<%-- 
          	먼저 div 엘리먼트에 .form-group 으로 <input>, <textarea> 및 <select> 태그를 감싼다.
        	.form-control 클래스가 있는 모든 <input>, <textarea> 및 <select> 요소의 너비는 100% 입니다. 
   		 --%>
		
		
		
		<%-- <form name="registerFrm" action="<%= ctxPath%>/personRegister.do" method="post"> --%>
		<form name="updateFrm" action="<%=ctxPath%>/personUpdateEnd.do" method="post" > <%-- <%= ctxPath%>/personUpdateEnd.do 여기로 이동한다. --%>
			<div class="row">
			
				<input type="hidden" name="seq" value="${psdto.seq}" /> <!-- PersonUpdateEnd_09.java에서 where절을 사용하기 위해서 seq가 필요한데. 여기 없어서 hidden으로 만들어주고 안보이게 처리.  -->
			
				<label class="col-md-4" for="name">성명</label>
				<div class="col-md-8 form-group">
					<input type="text" class="form-control" name="name" id="name" maxlength="20" autofocus autocomplete="off"/>
				</div>
			
				<label class="col-md-4">학력</label>
				<div class="col-md-8 form-group">
					<select class="form-control" name="school">
						<option value="">선택하세요</option>
						<option>고졸</option>
						<option>초대졸</option>
						<option>대졸</option>
						<option>대학원졸</option>
					</select>
				</div>
				
				<label class="col-md-4">좋아하는색상</label>
				<div class="col-md-8">
					<div class="row form-group">
						<div class="col-md-2">
							<label for="red">빨강</label>
							<input type="radio" name="color" id="red" value="red" />
						</div>
						
						<div class="col-md-2 offset-md-1">
							<label for="blue">파랑</label>
							<input type="radio" name="color" id="blue" value="blue" />
						</div>						
						
						<div class="col-md-2 offset-md-1">
							<label for="green">초록</label>
							<input type="radio" name="color" id="green" value="green" />
						</div>						
						
						<div class="col-md-2 offset-md-1">
							<label for="yellow">노랑</label>
							<input type="radio" name="color" id="yellow" value="yellow" />
						</div>
					</div>					
				</div>
				
				<label class="col-md-4">좋아하는 음식(다중선택)</label>
				<div class="col-md-8 mb-4">
					<div class="row form-group">
						<div class="col-md-2">
							<label for="food_1">짜장면</label>
							<input type="checkbox" name="food" id="food_1" value="짜장면" />
						</div>
						
						<div class="col-md-2">
							<label for="food_2">짬뽕</label>
							<input type="checkbox" name="food" id="food_2" value="짬뽕" />
						</div>						
						
						<div class="col-md-2">
							<label for="food_3">탕수육</label>
							<input type="checkbox" name="food" id="food_3" value="탕수육" />
						</div>						
						
						<div class="col-md-2">
							<label for="food_4">양장피</label>
							<input type="checkbox" name="food" id="food_4" value="양장피" />
						</div>
						
						<div class="col-md-2">
							<label for="food_5">팔보채</label>
							<input type="checkbox" name="food" id="food_5" value="팔보채" />
						</div>
					</div>					
				</div>
				
				<div class="col-md-3 offset-md-1 form-group">
					<input type="submit" class="btn btn-success form-control" value="수정완료">
				</div>
				
				<div class="col-md-3 offset-md-1 form-group">
					<input type="reset" class="btn btn-danger form-control" value="수정취소">
				</div>
				
				<div class="col-md-3 offset-md-1 form-group">
					<a href="personSelect.do" class="btn btn-info form-control">개인성향 모든 정보 보기</a>
				</div>
				
			</div>
		</form>
	</div>
</body>


</html>


