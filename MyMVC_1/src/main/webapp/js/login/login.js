$(()=>{
	$('button#btnSubmit').click(e=>{
		goLogin_Cookies(); // 로그인 처리(아이디 저장은 Cookie 사용)
		/*goLogin_LocalStorage(); // 로그인 처리(아이디 저장은 LocalStorage 사용)*/
	});
	
	/*
	$('input#loginPwd').keydown(e=>{});
	또는
	$('input#loginPwd').bind('keydown',e=>{});
	*/
	$('input#loginPwd').keydown(e=>{
		if(e.keyCode == 13){ // keyCode 13은 '엔터'. 암호입력란에 엔터 친경우.
			goLogin_Cookies(); // 로그인 처리(아이디 저장은 Cookie 사용)
			/*goLogin_LocalStorage(); // 로그인 처리(아이디 저장은 LocalStorage 사용)*/
		}
	});
}); // EoP $(()=>{}

// Function Declearation 

// ===== 로그인 처리 함수 (아이디 저장은 Cookie 사용)===== // 
function goLogin_Cookies(){
	if($('input#loginUserid').val().trim() == ""){ //아이디 공란 검사 
		alert("아이디를 입력하세요.");
		$('input#loginUserid').val("").focus();
		
		return; //goLogin_Cookies() 함수 종료
	}
	
	if($('input#loginPwd').val().trim() == ""){ //비밀번호 공란 검사 
		alert("비밀번호를 입력하세요.");
		$('input#loginPwd').val("").focus();
		
		return; //goLogin_Cookies() 함수 종료
	}
	
	const frm = document.loginFrm;
	frm.submit();
		
}// EoP function goLogin_Cookies(){}


// ===== 로그인 처리 함수 (아이디 저장은 LocalStorage 사용)===== // 
function goLogin_LocalStorage(){
	
}// EoP function goLogin_LocalStorage(){}