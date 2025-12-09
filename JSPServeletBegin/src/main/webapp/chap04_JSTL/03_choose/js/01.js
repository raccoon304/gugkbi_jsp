$(function(){
	$('form').submit(()=>{
		// 정규표현식으로 유효성 검사
		const regExp = /^(?:[0-9]{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[1,2][0-9]|3[0,1]))-?[1-4][0-9]{6}$/g; 	
		
		const jubunVal = $('input:text[name="jubun"]').val();
		
		if(!regExp.test(jubunVal)){
			alert("올바른 주민등록번호가 아닙니다.");
			// submit을 하지않고 종료한다. 
			return false;
		}
	});
});