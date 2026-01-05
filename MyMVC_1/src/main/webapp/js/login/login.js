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



// ==== 코인충전 결제금액 선택하기 ==== // 
function goCoinPurchaseTypeChoice(userid, ctx_Path){
	const url = `${ctx_Path}/member/coinPurchaseTypeChoice.up?userid=${userid}`;
	
	// 너비 650, 높이 570인 팝업창을 화면 가운데 위치 
	const width = 650; 
	const height = 570;
	
	const left =Math.ceil((window.screen.width - width)/2); //Math.ceil을 통해 정수로 만듬.
									 // 1400  -  650 = 750/2 ==> 375
									 
	const top =Math.ceil((window.screen.height - height)/2); //Math.ceil을 통해 정수로 만듬.
									 // 900  -  570 = 330/2 ==> 165
									 								 									  
	
	window.open(
	  url,
	  "coinPurchaseTypeChoice",
	  `left=${left}, top=${top}, width=${width}, height=${height}`
	);

	
} // EoP function goCoinPurchaseTypeChoice(userid){}


// == 포트원(구 아임포트 )결제를 해주는 함수(PG사 연결) ==  //
function goCoinPurchaseEnd(ctxPath, coinmoney, userid){

	//alert(`확인용 부모창의 함수 호출 \n 결제금액 : ${coinmoney}원, 사용자id : ${userid}`)	
	// >>> 포트원(구 아임포트) 결제 팝업창 띄우기 <<<
    // 너비 1000, 높이 600 인 팝업창을 화면 가운데 위치시키기
    const width = 1000;
    const height = 600;

    const left = Math.ceil( (window.screen.width - width)/2 ); // 정수로 만듬
    const top = Math.ceil( (window.screen.height - height)/2 ); // 정수로 만듬
    
    const url = `${ctxPath}/member/coinPurchaseEnd.up?coinmoney=${coinmoney}&userid=${userid}`;      

    window.open(url, "coinPurchaseEnd", 
					 `left=${left}, top=${top}, width=${width}, height=${height}`);
	
	
	
	
}// EoP goCoinPurchaseEnd(ctxPath, coinmoney, userid){}




function goCoinUpdate(ctxPath, userid, coinmoney){
	console.log(`확인용 유저아이디 : ${userid} 코인머니: ${coinmoney}`);
	
	$.ajax({
		url:`${ctxPath}/member/coinUpdateLoginUser.up`,
		data:{'userid':userid,
			  'coinmoney':coinmoney}, // data 속성은 http://localhost:9090/MyMVC/member/coinUpdateLoginUser.up 로 전송해야할 데이터를 말한다
		type:'post', // type을 생략하면 default는 'get'이다. 
		async: true, // default가 비동기. (true) 
					 // async:true 가 비동기 방식을 말한다. async 을 생략하면 기본값이 비동기 방식인 async:true 이다.
                     // async:false 가 동기 방식이다. 지도를 할때는 반드시 동기방식인 async:false 을 사용해야만 지도가 올바르게 나온다.
		dataType:'json',// Javascript Standard Object Notation.  dataType은 /MyMVC/member/idDuplicateCheck.up 로 부터 실행되어진 결과물을 받아오는 데이터타입을 말한다. 
					    // 만약에 dataType:"xml" 으로 해주면 /MyMVC/member/coinUpdateLoginUser.up 로 부터 받아오는 결과물은 xml 형식이어야 한다. 
					    // 만약에 dataType:"json" 으로 해주면 /MyMVC/member/coinUpdateLoginUser.up 로 부터 받아오는 결과물은 json 형식이어야 한다.
		success:function(json){
			console.log("확인용 json =>", json);
			alert(json.message);
			location.href = json.loc;
		},
		error: function(request, status, error){
            alert("code: "+request.status+"\n"+"message: "+request.responseText+"\n"+"error: "+error);
        }			
	});
}


// ===== 나의 정보 수정하기 ===== //
function goEditMyInfo(userid, ctx_Path){
	// >>> 나의 정보 수정하기 팝업창 띄우기 <<<
    // 너비 800, 높이 680 인 팝업창을 화면 가운데 위치시키기
    const width = 800;
    const height = 680;

    const left = Math.ceil( (window.screen.width - width)/2 ); // 정수로 만듬
    const top = Math.ceil( (window.screen.height - height)/2 ); // 정수로 만듬
    
    const url = `${ctx_Path}/member/memberEdit.up?userid=${userid}`;      

    window.open(url, "memberEdit",
	             `left=${left}, top=${top}, width=${width}, height=${height}`);
}// EoP function goEditMyInfo(user, ctx_Path){}


