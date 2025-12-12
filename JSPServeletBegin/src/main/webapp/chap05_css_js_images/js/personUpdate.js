$(function(){
	/*
	$('form[name="registerFrm"]').bind("submit",function(){});
	또는
	$('form[name="registerFrm"]').bind("submit",()=>{});
	또는
	$('form[name="registerFrm"]').submit(function(){});
	또는
	*/
	$('form[name="registerFrm"]').submit(()=>{
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
		/*
		// 4. 음식 필수입력 검사. 
		const foodCheckedLength = $('input:checkbox[name="food"]:checked').length;
	
		if(foodCheckedLength == 0){
			alert("선호하는 음식을 최소 하나이상 선택하세요");
			return false;
		}
		*/
	});
});