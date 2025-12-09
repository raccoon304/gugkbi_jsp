/*$document.ready(function(){*/
$(function(){
	/*
	$('form[name="myFrm"]').bind("submit", function(){});
	//또는
	$('form[name="myFrm"]').submit(function(){});
	//또는
	$('form[name="myFrm"]').bind("submit",()=>{});
	//또는
	*/
	$('form[name="myFrm"]').submit(()=>{
		const firstVal = $('input:text[name="first"]').val().trim();
		const secondVal = $('input:text[name="second"]').val().trim();
		if(firstVal == "" || secondVal == ""){
			alert("문자를 입력하세요.")
			return false;
		}
	});	
	
});