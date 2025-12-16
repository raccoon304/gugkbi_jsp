/*
 ---- Java Script ----
 window.onload = fuction(){};
 
 ---- jQuery ----
 $(document).ready(function(){});
*/


let b_zipcodeSearch_click = false;  // 우편번호찾기를 클릭했는지 확인하기 위한 용도 



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
	
	$('input:text[id="userid"]').blur((e)=>{// 아이디를 입력하지 않거나 공백만 입력했을 경우
		const userid = $(e.target).val().trim();
		if(userid == ""){
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
		const regExp_hp2 = /^[1-9][0-9]{3}$/; 
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
		const regExp_hp3 = /^[1-9][0-9]{3}$/; 
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
/*우편번호 정규표현식 검사 아래에서 사용자 입력을 막아서 주석처리
	$('input#postcode').blur((e)=>{// 우편번호 정규표현식 검사 
		const regExp_postcode = /^[0-9]{5}$/; 
		//우편번호 ( 숫자 5자리) 정규표현식 객체 생성
		
		const bool = regExp_postcode.test($(e.target).val());
		
		if(!bool){ // 우편번호 양식이 정규표현식에 위배된 경우 
			$('table#tblMemberRegister :input').prop("disabled", true);
			$(e.target).prop("disabled", false).val('').focus();
			$(e.target).parent().find('span.error').show();
		}
		else{
			$('table#tblMemberRegister :input').prop("disabled", false);
			$(e.target).parent().find('span.error').hide();
		}
	}); // id가 postcode 인 것에 focus를 잃어버렸을 경우.(blur) 이벤트처리를 해준것	
	
*/
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
		// -- 참고 -- 
		// 주소를 비활성화로 만들기.
		// $('input#address').prop('disabled', true);
		
		// 주소를 활성화로 만들기
		// $('input#address').removeAttr('disabled');

		// 주소를 쓰기 가능으로 만들기
		// $('input#address').removeAttr('readonly');
		
		// 우편번호를 읽기전용(readonly)로 만들기
		// $('input#address').attr('readonly', true);

	});
	
// ===== 우편번호찾기를 클릭했을 때 이벤트 처리하기 끝 =====


// === jQuery UI 의 datepicker === //
    $("input#datepicker").datepicker({
        dateFormat: 'yy-mm-dd'  //Input Display Format 변경
       ,showOtherMonths: true   //빈 공간에 현재월의 앞뒤월의 날짜를 표시
       ,showMonthAfterYear:true //년도 먼저 나오고, 뒤에 월 표시
       ,changeYear: true        //콤보박스에서 년 선택 가능
       ,changeMonth: true       //콤보박스에서 월 선택 가능                
   //  ,showOn: "both"          //button:버튼을 표시하고,버튼을 눌러야만 달력 표시됨. both:버튼을 표시하고,버튼을 누르거나 input을 클릭하면 달력 표시됨.  
   //  ,buttonImage: "http://jqueryui.com/resources/demos/datepicker/images/calendar.gif" //버튼 이미지 경로
   //  ,buttonImageOnly: true   //기본 버튼의 회색 부분을 없애고, 이미지만 보이게 함
   //  ,buttonText: "선택"       //버튼에 마우스 갖다 댔을 때 표시되는 텍스트                
       ,yearSuffix: "년"         //달력의 년도 부분 뒤에 붙는 텍스트
       ,monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'] //달력의 월 부분 텍스트
       ,monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] //달력의 월 부분 Tooltip 텍스트
       ,dayNamesMin: ['일','월','화','수','목','금','토'] //달력의 요일 부분 텍스트
       ,dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'] //달력의 요일 부분 Tooltip 텍스트
   //  ,minDate: "-1M" //최소 선택일자(-1D:하루전, -1M:한달전, -1Y:일년전)
   //  ,maxDate: "+1M" //최대 선택일자(+1D:하루후, +1M:한달후, +1Y:일년후)                
   });

   // 초기값을 오늘 날짜로 설정
   // $('input#datepicker').datepicker('setDate', 'today'); //(-1D:하루전, -1M:한달전, -1Y:일년전), (+1D:하루후, +1M:한달후, +1Y:일년후) 
   

   
// === 전체 datepicker 옵션 일괄 설정하기 ===  
//     한번의 설정으로 $("input#fromDate"), $('input#toDate')의 옵션을 모두 설정할 수 있다.
   $(function() {
       //모든 datepicker에 대한 공통 옵션 설정
       $.datepicker.setDefaults({
            dateFormat: 'yy-mm-dd' //Input Display Format 변경
           ,showOtherMonths: true //빈 공간에 현재월의 앞뒤월의 날짜를 표시
           ,showMonthAfterYear:true //년도 먼저 나오고, 뒤에 월 표시
           ,changeYear: true //콤보박스에서 년 선택 가능
           ,changeMonth: true //콤보박스에서 월 선택 가능                
        // ,showOn: "both" //button:버튼을 표시하고,버튼을 눌러야만 달력 표시됨. both:버튼을 표시하고,버튼을 누르거나 input을 클릭하면 달력 표시됨.  
        // ,buttonImage: "http://jqueryui.com/resources/demos/datepicker/images/calendar.gif" //버튼 이미지 경로
        // ,buttonImageOnly: true //기본 버튼의 회색 부분을 없애고, 이미지만 보이게 함
        // ,buttonText: "선택" //버튼에 마우스 갖다 댔을 때 표시되는 텍스트                
           ,yearSuffix: "년" //달력의 년도 부분 뒤에 붙는 텍스트
           ,monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'] //달력의 월 부분 텍스트
           ,monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] //달력의 월 부분 Tooltip 텍스트
           ,dayNamesMin: ['일','월','화','수','목','금','토'] //달력의 요일 부분 텍스트
           ,dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'] //달력의 요일 부분 Tooltip 텍스트
        // ,minDate: "-1M" //최소 선택일자(-1D:하루전, -1M:한달전, -1Y:일년전)
        // ,maxDate: "+1M" //최대 선택일자(+1D:하루후, -1M:한달후, -1Y:일년후)                    
       });

       // input을 datepicker로 선언
       $("input#fromDate").datepicker();                    
       $("input#toDate").datepicker();
       
       // From의 초기값을 오늘 날짜로 설정
       $('input#fromDate').datepicker('setDate', 'today'); //(-1D:하루전, -1M:한달전, -1Y:일년전), (+1D:하루후, +1M:한달후, +1Y:일년후)
       
       // To의 초기값을 3일후로 설정
       $('input#toDate').datepicker('setDate', '+3D'); //(-1D:하루전, -1M:한달전, -1Y:일년전), (+1D:하루후, +1M:한달후, +1Y:일년후)
    });   
});// EoP $(()=>{}



//Function Declaration 
// '가입하기' 버튼 클릭시 호출되는 함수 
function goRegister(){
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
		return;	//goRegister 함수를 종료한다. 
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
				return;	//goRegister 함수를 종료한다. 
			}
	// *** 필수입력 사항에 모두 입력이 되었는지 검사하기 끝 *** // 
	
	
	// *** 우편변호찾기를 클릭했는지 알아보기 시작*** //
	if(!b_zipcodeSearch_click){//우편번호찾기를 클릭하지 않은경우.
		alert("우편번호 찾기를 클릭해야합니다.");
		return;	//goRegister 함수를 종료한다. 
	}
	else{
		if($('input#postcode').val().trim() == "" ||
		   $('input#address').val().trim() == ""  ||
		   $('input#detailAddress').val().trim() == "" ||
		   $('input#extraAddress').val().trim() == "" ){
			alert("우편번호 및 주소를 입력해야 함.");
			return;	//goRegister 함수를 종료한다. 
		}
	} 
	// *** 우편변호찾기를 클릭했는지 알아보기 끝 *** //
	
	// *** 성별을 클릭했는지 알아보기 시작*** //
	const radio_checked_length = $('input:radio[name="gender"]:checked').length;
									// radio태그에 :checked하면 체크된 라디오 반환
	if(radio_checked_length == 0){
		alert("성별을 선택해야 합니다.");
		return;
	}
	// *** 성별을 클릭했는지 알아보기 끝*** //
	
	
	
	// *** 생년월일 값을 입력했는지 알아보기 시작*** //
	const birthday = $('input#datepicker').val().trim();
	if(birthday == ""){
		alert("생년월일을 입력해야 합니다.");
		return;
	}
	// *** 생년월일 값을 입력했는지 알아보기 끝*** //
	
	
	// *** 약관동의 체크 유무 알아보기 시작*** //
	const checkbox_checked_length = $('input:checkbox[id="agree"]:checked').length;
									// radio태그에 :checked하면 체크된 라디오 반환
	if(checkbox_checked_length == 0){
		alert("약관동의를 해야 합니다.");
		return;
	}
	// *** 약관동의 체크 유무 알아보기 끝*** //
	
	
	const frm = document.registerFrm;

	//frm.action = "memberRegister.up"; 따로 작성해놓지 않으면 디폴트
	frm.method = "post";
	frm.submit();
	
	

}// EoP function goRegister()




