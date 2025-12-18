$(()=>{
	$('button#btnSubmit').click(e=>{
		goLogin_LocalStorage(); // 로그인 처리(아이디 저장은 Cookie 사용)
		/*goLogin_LocalStorage(); // 로그인 처리(아이디 저장은 LocalStorage 사용)*/
	});
	
	/*
	$('input#loginPwd').keydown(e=>{});
	또는
	$('input#loginPwd').bind('keydown',e=>{});
	*/
	$('input#loginPwd').keydown(e=>{
		if(e.keyCode == 13){ // keyCode 13은 '엔터'. 암호입력란에 엔터 친경우.
			goLogin_LocalStorage(); // 로그인 처리(아이디 저장은 Cookie 사용)
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
	frm.submit(); //action 과 method 가 없으면, 현재 자기 위치(웹)이 디폴트, method도 디폴트 get 방식 
	//여기서는 frm에 보면 action="<%= ctx_Path%>/login/login.up" method="post">이렇게 되어있음. 
		
}// EoP function goLogin_Cookies(){}


// ===== 로그인 처리 함수 (아이디 저장은 LocalStorage 사용)===== // 
function goLogin_LocalStorage(){
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
	
	if($('input:checkbox[id="saveid"]').prop("checked")){
		//아이디 저장 체크박스에 체크가 되어진 경우로 로그인 한 경우 
		localStorage.setItem('saveid',$('input#loginUserid').val());		
	}
	else{
		localStorage.removeItem('saveid');
	}


	const frm = document.loginFrm;
	frm.submit(); //action 과 method 가 없으면, 현재 자기 위치(웹)이 디폴트, method도 디폴트 get 방식 
	//여기서는 frm에 
}// EoP function goLogin_LocalStorage(){}




// ==== 로그아웃 처리 함수 ==== //
function goLogOut(ctx_Path) {
   // 로그아웃을 처리해주는 페이지로 이동
   //location.href = ctx_Path+"/login/logout.up";
   //또는
   location.href = `${ctx_Path}/login/logout.up`;
}//end of function goLogOut()-----