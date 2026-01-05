/*
 ---- Java Script ----
 window.onload = fuction(){};
 
 ---- jQuery ----
 $(document).ready(function(){});
*/


let b_zipcodeSearch_click = false;  // 우편번호찾기를 클릭했는지 확인하기 위한 용도 

let b_email_click = false;  // 이메일 중복확인을 클릭했는지 클릭하지 않았는지 여부를 알아오기 위한 용도 



$(()=>{
	$('span.error').hide();
	
	/*$('input:text[id="name"]').focus();*/		/*또는*/
	$('input#name').focus();
	
	/*$('input:text[id="name"]').bind('blur',function(e){'name에 있던 포커스를 잃어버렸습니다.'});*/	/*또는*/
	/*$('input:text[id="name"]').blur(function(e){'name에 있던 포커스를 잃어버렸습니다.'});*/			/*또는*/
	/*$('input:text[id="name"]').blur((e)=>{alert('name에 있던 포커스를 잃어버렸습니다.')});*/
	
	$('input:text[id="name"]').blur((e)=>{// 이름은 입력하지 않거나 공백만 입력했을 경우
		const name = $(e.target).val().trim();
		if(name == ""){
			$('table#tblMemberRegister :input').prop("disabled", true);
			// 해당 테이블 태그 안에 있는 모든 input태그를 지정해서 사용 못하게 함.
			
			//-- name은 다시 보이게 하고, data를 지운뒤 포커스를 줌. 또한, 위에 숨겨놓은 error 메시지를 보이게함. 
			$(e.target).prop("disabled", false).val('').focus();
			// $(e.target).next().show();
			// 또는
			$(e.target).parent().find('span.error').show();
			// td태그를 지칭(현재 태그 input id name 에서 부모) 그리고 거기서 id가 error를 찾음. 
		}
		else{
			$('table#tblMemberRegister :input').prop("disabled", false);
			$(e.target).parent().find('span.error').hide();
		}
	}); // id가 name 인 것에 focus를 잃어버렸을 경우.(blur) 이벤트처리를 해준것
	
	
// -----------------------------------------------------------------------------------------

	$('input#pwd').blur((e)=>{// 비밀번호를 입력하지 않거나 공백만 입력했을 경우
		const regExp_pwd = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).*$/g;
		// 숫자/문자/특수문자 포함 형태의 8~15자리 이내의 암호 정규표현식 객체 생성
		
		const bool = regExp_pwd.test($(e.target).val());
		
		if(!bool){
			$('table#tblMemberRegister :input').prop("disabled", true);
			$(e.target).prop("disabled", false).val('').focus();
			$(e.target).parent().find('span.error').show();
		}
		else{
			$('table#tblMemberRegister :input').prop("disabled", false);
			$(e.target).parent().find('span.error').hide();
		}
	}); // id가 userid 인 것에 focus를 잃어버렸을 경우.(blur) 이벤트처리를 해준것	
	
// -----------------------------------------------------------------------------------------

	$('input#pwdcheck').blur((e)=>{
		if($('input#pwd').val() != $(e.target).val()){ // 암호와 암호확인 값이 다른경우.
			$('table#tblMemberRegister :input').prop("disabled", true);
			$(e.target).prop("disabled", false).val('').focus();
			
			$('input#pwd').prop("disabled", false).val("");
			
			$(e.target).parent().find('span.error').show();
		}
		else{// 암호와 암호확인 값이 같은경우
			$('table#tblMemberRegister :input').prop("disabled", false);
			$(e.target).parent().find('span.error').hide();
		}
	}); //  아이디가 pwdcheck인것에 focus를 잃어버렸을 경우.(blur) 이벤트처리를 해준것	
	
// -----------------------------------------------------------------------------------------

	$('input#email').blur((e)=>{// 이메일이 정규표현식 검사 
		const regExp_email = /[a-z0-9]{2,}@[a-z0-9]{2,}.[a-z0-9]{2,}/i; 
		
		
		const bool = regExp_email.test($(e.target).val());
		
		if(!bool){ // 이메일 양식이 정규표현식에 위배된 경우 
			$('table#tblMemberRegister :input').prop("disabled", true);
			$(e.target).prop("disabled", false).val('').focus();
			$(e.target).parent().find('span.error').show();
		}
		else{
			$('table#tblMemberRegister :input').prop("disabled", false);
			$(e.target).parent().find('span.error').hide();
		}
	}); // id가 email 인 것에 focus를 잃어버렸을 경우.(blur) 이벤트처리를 해준것	
	
// -----------------------------------------------------------------------------------------

	$('input#hp2').blur((e)=>{// 이메일이 정규표현식 검사 
		const regExp_hp2 = /^[0-9]{4}$/; 
		//연락처 국번( 숫자 4자리인데 첫번째 숫자는 1-9 이고 나머지는 0-9) 정규표현식 객체 생성
		
		const bool = regExp_hp2.test($(e.target).val());
		
		if(!bool){ // 연락처 국번이 양식이 정규표현식에 위배된 경우 
			$('table#tblMemberRegister :input').prop("disabled", true);
			$(e.target).prop("disabled", false).val('').focus();
			$(e.target).parent().find('span.error').show();
		}
		else{
			$('table#tblMemberRegister :input').prop("disabled", false);
			$(e.target).parent().find('span.error').hide();
		}
	}); // id가 hp2 인 것에 focus를 잃어버렸을 경우.(blur) 이벤트처리를 해준것	
	
// -----------------------------------------------------------------------------------------

	$('input#hp3').blur((e)=>{// 이메일이 정규표현식 검사 
		const regExp_hp3 = /^[0-9]{4}$/; 
		//연락처 국번( 숫자 4자리인데 첫번째 숫자는 1-9 이고 나머지는 0-9) 정규표현식 객체 생성
		
		const bool = regExp_hp3.test($(e.target).val());
		
		if(!bool){ // 연락처 국번이 양식이 정규표현식에 위배된 경우 
			$('table#tblMemberRegister :input').prop("disabled", true);
			$(e.target).prop("disabled", false).val('').focus();
			$(e.target).parent().find('span.error').show();
		}
		else{
			$('table#tblMemberRegister :input').prop("disabled", false);
			$(e.target).parent().find('span.error').hide();
		}
	}); // id가 hp3 인 것에 focus를 잃어버렸을 경우.(blur) 이벤트처리를 해준것	
	

// -----------------------------------------------------------------------------------------

	/*   
	>>>> .prop() 와 .attr() 의 차이 <<<<            
	     .prop() ==> form 태그내에 사용되어지는 엘리먼트의 disabled, selected, checked 의 속성값 확인 또는 변경하는 경우에 사용함. 
	     .attr() ==> 그 나머지 엘리먼트의 속성값 확인 또는 변경하는 경우에 사용함.
	*/
	// 우편번호를 읽기전용(readonly)로 만들기
	$('input#postcode').attr('readonly', true);
	
	// 우편번호를 읽기전용(readonly)로 만들기
	$('input#address').attr('readonly', true);
	
	// 우편번호를 읽기전용(readonly)로 만들기
	$('input#extraAddress').attr('readonly', true);
		
	

// -----------------------------------------------------------------------------------------

// ===== 우편번호찾기를 클릭했을 때 이벤트 처리하기 시작 =====
	/*
	$('img#zipcodeSearch').bind('click', function(){});
	또는
	$('img#zipcodeSearch').click(function(){});
	또는
	$('img#zipcodeSearch').click(()=>{});
	*/
	
	
	$('img#zipcodeSearch').click(()=>{
		b_zipcodeSearch_click = true; // 우편번호 찾기를 클릭한 경우. 해당 변수의 값이 true로 변경.
		new daum.Postcode({
            oncomplete: function(data) {
            	// 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
    
                // 각 주소의 노출 규칙에 따라 주소를 조합한다.
                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                let addr = ''; // 주소 변수
                let extraAddr = ''; // 참고항목 변수
    
                //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
            		addr = data.roadAddress;
                } else { // 사용자가 지번 주소를 선택했을 경우(J)
                    addr = data.jibunAddress;
                }
    
                // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
                if(data.userSelectedType === 'R'){
                    // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                    // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                    if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                        extraAddr += data.bname;
                    }
                    // 건물명이 있고, 공동주택일 경우 추가한다.
                    if(data.buildingName !== '' && data.apartment === 'Y'){
                        extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                    }
                    // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                    if(extraAddr !== ''){
                        extraAddr = ' (' + extraAddr + ')';
                    }
                    // 조합된 참고항목을 해당 필드에 넣는다.
                    document.getElementById("extraAddress").value = extraAddr;
                
                } else {
                    document.getElementById("extraAddress").value = '';
                }
    
                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                document.getElementById('postcode').value = data.zonecode;
                document.getElementById("address").value = addr;
                // 커서를 상세주소 필드로 이동한다.
                document.getElementById("detailAddress").focus();
            }
        }).open();

	});
// ===== 우편번호찾기를 클릭했을 때 이벤트 처리하기 끝 =====

// =======================================================================================================================

	
	// --- 이메일값이 변경되면 가입하기 버튼 클릭시 아이디 중복확인을 클릭했는지 알아보기 위한 용도 초기화 시키기---
	$('input#email').bind("change", function(){
		b_email_click = false;
	})		
	
r
	
	// ==== jQuery Ajax를 사용한 두번째 방법 ==== // 
	// --- 이메일중복확인을 클릭했을 때 이벤트 처리하기 시작 ---
	$('span#emailcheck').click(function(){
		b_email_click = true;
		if( $('input#email').val().trim() != ""){
			$.ajax({
				url: "emailDuplicateCheck2.up" ,
				data: {"email" : $('input#email').val()  //http://localhost:9090/MyMVC/member/emailDuplicateCheck.up 로 전송해야할 데이터를 말한다.
						,"userid": $('input[name="userid"]').val()} ,	
				type: "post" ,
				dataType: "json", 	// json 형식으로 데이터를 요청 ==> 첫번째 방법처럼 형식변환을 거치지 않아도 바로 json 형태로 줌.
									// Javascript Standard Object Notation.  dataType은 /MyMVC/member/emailDuplicateCheck.up 로 부터 실행되어진 결과물을 받아오는 데이터타입을 말한다. 
						          	// 만약에 dataType:"xml" 으로 해주면 /MyMVC/member/emailDuplicateCheck.up 로 부터 받아오는 결과물은 xml 형식이어야 한다. 
						          	// 만약에 dataType:"json" 으로 해주면 /MyMVC/member/emailDuplicateCheck.up 로 부터 받아오는 결과물은 json 형식이어야 한다.
									
				success:function(json){	
					console.log("확인용 => " , json );
					console.log("데이터타입 확인용 => " , typeof json );
					// 확인용 => {isExists: true}
					// 데이터타입 확인용 => object
			
					if(json.isExists){
						//입력한 userid가 이미 사용중인 경우.
						$('span#emailCheckResult').html($('input#email').val() + "은 이미 다른 사용자가 사용중이므로 다른 이메일을 입력하세요.").css({"color":"red"});
						$('input#email').val("")
					}
					else{
						//입력한 userid가 아직 사용되지 않은 경우.
						$('span#emailCheckResult').html($('input#email').val() + "은 사용가능합니다.").css({"color":"green"});
					}
				},
				error:function(request, status, error){
					alert("code: "+request.status+"\n"+"message: "+request.responseText+"\n"+"error: "+error);
		        }
			});
			// --- 이메일 중복확인을 클릭했을 때 이벤트 처리하기 끝 ---
		}
	});
	
// =======================================================================================================================
});// EoP $(()=>{}



//Function Declaration 
// '수정하기' 버튼 클릭시 호출되는 함수 
function goEdit(){
	// *** 필수입력 사항에 모두 입력이 되었는지 검사하기 시작 *** //

	let b_requiredInfo = true;
/* 
	// 첫번째 방법 : JavaScript
	const requiredInfo_list = document.querySelectorAll("input.requiredInfo");
	for(let i=0; i<requiredInfo_list.length; i++){
		const val = requiredInfo_list[i].value.trim();
		if(val == ""){
			alert("별 표시된 필수입력사항은 모두 입력해야 합니다.")
			b_requiredInfo = false;
			break;
		}
	}
	if(!b_requiredInfo){
		return;	//goEdit() 함수를 종료한다. 
	}
*/
	// 두번째 방법 : jQuery
	$('input.requiredInfo').each(function(index, elmt){// 자바스크립트의 forEach와파라미터가 다르니 유의. 
		const val = $(elmt).val().trim();
								//여기서 elmt = input태그
		if(val == ""){
			alert("별 표시된 필수입력사항은 모두 입력해야 합니다.");
			b_requiredInfo = false;
			return false; //each의 경우 break가 아닌 return false;를 사용한다. 
		}
		
	});
	
	if(!b_requiredInfo){
		return;	//goEdit() 함수를 종료한다. 
	}	
	// *** 필수입력 사항에 모두 입력이 되었는지 검사하기 끝 *** // 
	
	// *** 이메일중복확인을 클릭했는지 알아보기 시작 *** //
	if(!b_email_click){// id중복확인을 클릭 안했을경우
		alert("이메일 중복확인을 해야합니다.");
		return;	//goEdit() 함수를 종료한다. 
	}
	// *** 이메일 중복확인을 클릭했는지 알아보기 끝 *** //
	
	
	// *** 우편변호찾기를 클릭했는지 알아보기 시작*** //
	if(!b_zipcodeSearch_click){//우편번호찾기를 클릭하지 않은경우.
		alert("우편번호 찾기를 클릭해야합니다.");
		return;	//goEdit() 함수를 종료한다. 
	}
	else{
		if($('input#postcode').val().trim() == "" ||
		   $('input#address').val().trim() == ""  ||
		   $('input#detailAddress').val().trim() == ""){
			alert("우편번호 및 주소를 입력해야 함.");
			return;	//goEdit() 함수를 종료한다. 
		}
	} 
	
	//---------------------------------------------------------------------------
	// 변경된 암호가 현재 사용중인 암호이라면 현재 사용중인 암호가 아닌 새로운 암호로 입력해야 한다.!!! 
	let isNewPwd = true;
	$.ajax({
		url: "pwdDuplicateCheck.up" ,
		data: {"new_pwd" : $('input:password[name="pwd"]').val()  //http://localhost:9090/MyMVC/member/pwdDuplicateCheck.up 로 전송해야할 데이터를 말한다.
				,"userid" : $('input:hidden[name="userid"]').val()} ,	
		type: "post" ,
		dataType: "json", 	// json 형식으로 데이터를 요청 ==> 첫번째 방법처럼 형식변환을 거치지 않아도 바로 json 형태로 줌.
							// Javascript Standard Object Notation.  dataType은 /MyMVC/member/emailDuplicateCheck.up 로 부터 실행되어진 결과물을 받아오는 데이터타입을 말한다. 
				          	// 만약에 dataType:"xml" 으로 해주면 /MyMVC/member/emailDuplicateCheck.up 로 부터 받아오는 결과물은 xml 형식이어야 한다. 
				          	// 만약에 dataType:"json" 으로 해주면 /MyMVC/member/emailDuplicateCheck.up 로 부터 받아오는 결과물은 json 형식이어야 한다.
		async:false,	//*******!!!! 반드시 동기방식 이어야 함. !!!!*******					
		success:function(json){	
			// json ==> {"isExists" : true}       또는    {"isExists" : false} 
            //          새암호가 기존암호와 동일한 경우          새암호가 기존암호와 다른 경우
	
			if(json.isExists){
				//새 암호가 기존암호와 동일한 경우.
				$('span#duplicate_pwd').html("현재 사용중인 비밀번호로 비밀번호 변경은 불가합니다.").css({"color":"red"});
				isNewPwd = false;
			}
			else{
				//입력한 userid가 아직 사용되지 않은 경우.
				$('span#emailCheckResult').html($('input#email').val() + "은 사용가능합니다.").css({"color":"green"});
			}
		},
		error:function(request, status, error){
			alert("code: "+request.status+"\n"+"message: "+request.responseText+"\n"+"error: "+error);
        }
	});
	
	// *** 우편변호찾기를 클릭했는지 알아보기 끝 *** //
	
	if(isNewPwd){ // 새 암호가 기존 암호와 다른경우 
		alert("DB에 사용자 정보를 수정하러간다ㅓ.")
		const frm = document.editFrm;
		//frm.action = "memberEdit.up"; 따로 작성해놓지 않으면 디폴트
		frm.method = "post";
		frm.submit();
			
	}
	
	
	// 동기 처리해주는거는 true / false를 결정 지은 다음 넘어가야되는데 
	// 비동기 처리하면 먼저 보내고 DB에서 확인해서 값을 false 로 변경 하는 문제가 발생함. 
	

	
	

}// EoP function goEdit()



// 취소하기 버튼 클릭시 호출되는 함수 
function goReset(){
	$('span.error').hide();
	$('span#idcheckResult').empty(); 	
	// html("");과 다르게 empty는 span#idcheckResult 태그안을 비우라는 뜻임. 
	$('span#emailCheckResult').empty(); 	
}// EoP goReset()




