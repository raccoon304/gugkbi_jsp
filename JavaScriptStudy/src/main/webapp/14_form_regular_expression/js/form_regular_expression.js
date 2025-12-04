
window.onload = function(){

    const now = new Date();
    // 자바스크립트에서 현재날짜시각을 알려주는 것이다.

    const currentYear = now.getFullYear();
    // 현재년도  2025

    let option_birthYear = `<option>출생년도</option>`;
    for(let i=0; i<=currentYear-1950; i++){
        option_birthYear += `<option>${1950+i}</option>`;
    }// end of for------------------------
    document.querySelector('select[id="birthYear"]').innerHTML = option_birthYear;


    let option_birthMonth = `<option>출생월</option>`;
    for(let i=1; i<=12; i++){
        const month = (i<10)?`0${i}`:`${i}`;
        option_birthMonth += `<option>${month}</option>`;
    }// end of for------------------------
    document.querySelector('select[id="birthMonth"]').innerHTML = option_birthMonth;


    let option_birthDate = `<option>출생일</option>`;
    for(let i=1; i<=31; i++){
        const date = (i<10)?`0${i}`:`${i}`;
        option_birthDate += `<option>${date}</option>`;
    }// end of for------------------------
    document.querySelector('select[id="birthDate"]').innerHTML = option_birthDate;


    // ===== 만나이를 구하기 시작 ====== //
    const birthSelect_list = document.querySelectorAll('select.birthSelect');

    for(let birthSelect of birthSelect_list) {

        birthSelect.onchange = function() { // onchange 로 해야지 onChange 로 하면 작동을 하지 않는다.!!!
            
            if(isNaN(birthSelect.value)) { // "출생년도" 또는 "출생월" 을 선택한 경우 
            //  alert(birthSelect.id);
            //  또는 
            //  alert(this.id);
            
            //  if(birthSelect.id == "birthYear") { 
            //  또는 
                if(this.id == "birthYear") {       
                   alert("태어나신 년도를 선택하세요!!");
                }
                else {
                   alert("태어나신 월을 선택하세요!!");
                }

                document.querySelector('span#age').innerHTML = "";
            }
            else { // 숫자년도 및 숫자월을 선택한 경우 
                // 숫자로 된 날짜가 달력에 존재하는 날짜인지 검사하도록 하는 함수를 호출 
                /*   
                   console.log('확인용 checkValidDate("2025-04-31") : ', checkValidDate("2025-04-31"));  // false 
                   console.log('확인용 checkValidDate("2025-08-31") : ', checkValidDate("2025-08-31"));  // true
                   console.log('확인용 checkValidDate("2024-02-29") : ', checkValidDate("2024-02-29"));  // true 
                   console.log('확인용 checkValidDate("2025-02-29") : ', checkValidDate("2025-02-29"));  // false 
                */

                const birthday = document.querySelector('select#birthYear').value + "-" + 
                                 document.querySelector('select#birthMonth').value + "-" + 
                                 document.querySelector('select#birthDate').value;

                if( !isNaN(document.querySelector('select#birthYear').value) && 
                    !isNaN(document.querySelector('select#birthMonth').value) && 
                    !isNaN(document.querySelector('select#birthDate').value) && 
                    !checkValidDate(birthday) ) {
                        alert("달력상에 존재하지 않는 생년월일 입니다.");
                        document.querySelector('span#age').innerHTML = "";
                }
                
                if( !isNaN(document.querySelector('select#birthYear').value) && 
                    !isNaN(document.querySelector('select#birthMonth').value) && 
                    !isNaN(document.querySelector('select#birthDate').value) && 
                    checkValidDate(birthday) ) { // 생년월일이 달력에 존재하는 날짜이라면 
                       // alert("만나이를 구하러 간다.");

                       const manAge = func_manAge(birthday);
                       if(manAge >= 0) {
                          document.querySelector('span#age').innerHTML = manAge;
                       }
                       else {
                          alert("생년월일이 현재일 이후라서 안돼요~~!!");
                          document.querySelector('span#age').innerHTML = "";
                       }
                }

            }

        }

    }// end of for-----------------------

    // ===== 만나이를 구하기 끝 ====== //


    // ========= 전송(button) 클릭시 시작 ========== //
  /* !!!!!! 아래의 것을 꼭 반드시 기억해야 합니다. !!!!!!    
    document.querySelector('input[type="button"]').onclick = function(){}         // 정상
    document.querySelector('button[id="btn_submit_ok"]').onclick = function(){}   // 정상
    document.querySelector('button[id="btn_submit_fail"]').onclick = function(){} // 꽝!!!
    // 버튼태그에 type 을 설정하지 않으면 form 태그안에 button 태그가 위치할때 기본값이 type="submit" 이 되어지므로 submit 이벤트가 실행된다.
  */
    document.querySelector('button[type="submit"]').onclick = function(){};

    document.querySelector('input[type="button"]').onclick = function(){
        
        const frm = document.register_form; 
        // 문서에서 name 의 값이 register_form 인 태그(오브젝트)를 잡는 것이다.
        
        // 1. 사용자 ID는 5글자 이상 20글자 이하 이어야 하고, 첫글자는 영문자 이어야 하고 그 나머지는 영문자 또는 숫자로 이루어져야 한다. 
		//    올바른예 : superman , Batman007 , s9man
		//    틀린예  :  007superman, Lees, Batman007$

        // ==== 정규표현식 객체 만들기 ==== //
        // 정규표현식 객체는 항상 / 로 시작해서 / 로 끝나고 ; 을 붙여주면 된다.
        const regExp_userid = /^[A-Za-z][A-Za-z0-9]{4,19}$/;

        // 위에서 생성한 정규표현식 객체에 데이터값을 넣어서 검사한다.
        const bool_userid = regExp_userid.test(frm.userid.value);
        // frm.userid.value 값이 regExp_userid 패턴에 맞으면 true 
        // frm.userid.value 값이 regExp_userid 패턴에 틀리면 false  

        if(!bool_userid) {
            document.querySelector('span#err_userid').innerHTML = "아이디는 5글자 이상 20글자 이하 이어야 하고, 첫글자는 영문자 나머지는 소문자 또는 숫자 이어야 합니다."; 

            frm.userid.value = "";
            frm.userid.focus();
            return; // 종료
        }
        else {
            document.querySelector('span#err_userid').innerHTML = "";
        }


        // 2. 암호는 8글자 이상 15글자 이하이어야 하고, 영문자, 숫자, 특수문자가 혼합되어야만 한다.
		//    올바른예 : qwer1234$ , Abcd007!
		//    틀린예  : qw12$ , qwer12345, adfsdf24243@%@#$sdfsdf

        // ==== 정규표현식 객체 만들기 ==== //
        // 정규표현식 객체는 항상 / 로 시작해서 / 로 끝나고 ; 을 붙여주면 된다.
        const regExp_passwd = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).*$/g; 

        // 위에서 생성한 정규표현식 객체에 데이터값을 넣어서 검사한다.
        const bool_passwd = regExp_passwd.test(frm.passwd.value);
        // frm.passwd.value 값이 regExp_passwd 패턴에 맞으면 true 
        // frm.passwd.value 값이 regExp_passwd 패턴에 틀리면 false  

        if(!bool_passwd) {
            document.querySelector('span#err_passwd').innerHTML = "암호는 8글자~15글자 이어야 하고 영문자,숫자,특수문자가 혼합되어야 합니다."; 

            frm.passwd.value = "";
            frm.passwd.focus();
            return; // 종료
        }
        else {
            document.querySelector('span#err_passwd').innerHTML = "";
        }


        // 3. 암호 입력란과 암호확인 입력란의 데이터가 동일한지 아닌지 검사하기
        if(frm.passwd.value != document.querySelector('input#passwd2').value) {
        //  암호 입력란의 값 != 암호확인 입력란의 값
            document.querySelector("span#err_passwd2").innerHTML = "암호와 암호확인 값이 서로 다릅니다.!!"; 

            frm.passwd.value = "";
            document.querySelector('input#passwd2').value = "";

            frm.passwd.focus();
            return; // 종료
        }
        else {
            document.querySelector("span#err_passwd2").innerHTML = "";
        }


        // 4. 성명은 필수 입력사항이므로 반드시 값을 입력해야 한다.
		//    단, 공백없이 한글만 2글자 이상 6글자 이하로만 한다.

        // ==== 정규표현식 객체 만들기 ==== //
        // 정규표현식 객체는 항상 / 로 시작해서 / 로 끝나고 ; 을 붙여주면 된다.
        const regExp_name = /^[가-힣]{2,6}$/; 

        // 위에서 생성한 정규표현식 객체에 데이터값을 넣어서 검사한다.
        const bool_name = regExp_name.test(frm.name.value);
        // frm.name.value 값이 regExp_name 패턴에 맞으면 true 
        // frm.name.value 값이 regExp_name 패턴에 틀리면 false  

        if(!bool_name) {
            document.querySelector('span#err_name').innerHTML = "성명은 공백없이 한글로만 2글자 이상 6글자 이하 까지만 됩니다."; 

            frm.name.value = "";
            frm.name.focus();
            return; // 종료
        }
        else {
            document.querySelector('span#err_name').innerHTML = "";
        }


        // 5. 이메일은 필수 입력사항이므로 반드시 값을 입력해야 한다.
		//    올바른예 : leess@naver.com
		//    틀린예  : leessnaver.com , leess@naver.@com

        // ==== 정규표현식 객체 만들기 ==== //
        // 정규표현식 객체는 항상 / 로 시작해서 / 로 끝나고 ; 을 붙여주면 된다.
        const regExp_email = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i; 

        // 위에서 생성한 정규표현식 객체에 데이터값을 넣어서 검사한다.
        const bool_email = regExp_email.test(frm.email.value);
        // frm.email.value 값이 regExp_email 패턴에 맞으면 true 
        // frm.email.value 값이 regExp_email 패턴에 틀리면 false  

        if(!bool_email) {
            document.querySelector('span#err_email').innerHTML = "email 형식에 맞지 않습니다. 올바른 email 을 입력하세요!!"; 

            frm.email.value = "";
            frm.email.focus();
            return; // 종료
        }
        else {
            document.querySelector('span#err_email').innerHTML = "";
        }


        // 6. 성별을 선택했는지 검사하기(라디오에서 선택했는지 안했는지 검사하는 것임) 
        const gender_radio_list = frm.gender;
        let bool_gender = false;
        for(let gender_radio of gender_radio_list) {
            if(gender_radio.checked) { // 라디오를 선택한 경우 
               bool_gender = true; 
               break;
            }
        }// end of for---------------------

        if(!bool_gender) {
            document.querySelector('span#err_gender').innerHTML = "성별을 선택하세요!!";
            return; // 종료
        }
        else {
            document.querySelector('span#err_gender').innerHTML = "";
        }


        // 7. 취미를 2개 이상 선택했는지 검사하기(체크박스에 선택했는지 안했는지 검사하는 것임) 
        const hobby_checkbox_list = frm.hobby;

        let checked_cnt = 0;
        for(let hobby_checkbox of hobby_checkbox_list) {
            if(hobby_checkbox.checked) { // 체크박스를 선택한 경우
                checked_cnt++;
            }
        }// end of for-------------------------

        if(checked_cnt < 2) {
           document.querySelector('span#err_hobby').innerHTML = "취미는 최소한 2개 이상 선택하셔야 합니다.";  
           return; // 종료
        }
        else {
           document.querySelector('span#err_hobby').innerHTML = "";
        }


        // 8. 생년월일을 올바르게 선택했는지 검사하기
        let is_birthday_ok = true;

        if( isNaN(frm.birthYear.value) ||
            isNaN(frm.birthMonth.value) ||
            isNaN(frm.birthDate.value) ||
            !checkValidDate(frm.birthYear.value + "-" + frm.birthMonth.value + "-" + frm.birthDate.value)
          ) { 
              document.querySelector('span#err_birthday').innerHTML = `"생년월일" 을 올바르게 선택하세요`; 
              is_birthday_ok = false;
              return; // 종료
        }

        else {
            const birthday = frm.birthYear.value + "-" + frm.birthMonth.value + "-" + frm.birthDate.value;  
            if(func_manAge(birthday) < 0) {
                document.querySelector('span#err_birthday').innerHTML = `"생년월일" 을 올바르게 선택하세요`; 
                is_birthday_ok = false;
                return; // 종료
            }
        }

        if(is_birthday_ok) {
            document.querySelector('span#err_birthday').innerHTML = "";
        }

                    
        // 9. 최종학력을 선택했는지 검사하기
        if(frm.school.value == "선택하세요") {
            document.querySelector('span#err_school').innerHTML = "최종학력을 올바르게 선택하세요!!"; 
            return; // 종료
         }
        else {
            document.querySelector('span#err_school').innerHTML = ""; 
        }


        // 10. 가입인사말을 입력했는지 검사하기
        if(frm.registerComment.value.trim() == "") {
            document.querySelector('span#err_registerComment').innerHTML = "가입인사말을 입력하세요!!"; 
            frm.registerComment.value = "";
            frm.registerComment.focus();
            return; // 종료
         }
        else {
            document.querySelector('span#err_registerComment').innerHTML = ""; 
        }

        frm.submit(); // 전송하기

    }// end of document.querySelector('input[type="button"]').onclick = function(){}-----------



    // ========= 전송(button) 클릭시 끝 ========== //

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

    // ========= 전송(submit) 클릭시 시작 ========== //
    const frm = this.document.register_form;
    
    frm.onsubmit = function(){
      // 1. 사용자 ID는 5글자 이상 20글자 이하 이어야 하고, 첫글자는 영문자 이어야 하고 그 나머지는 영문자 또는 숫자로 이루어져야 한다. 
		//    올바른예 : superman , Batman007 , s9man
		//    틀린예  :  007superman, Lees, Batman007$

        // ==== 정규표현식 객체 만들기 ==== //
        // 정규표현식 객체는 항상 / 로 시작해서 / 로 끝나고 ; 을 붙여주면 된다.
        const regExp_userid = /^[A-Za-z][A-Za-z0-9]{4,19}$/;

        // 위에서 생성한 정규표현식 객체에 데이터값을 넣어서 검사한다.
        const bool_userid = regExp_userid.test(frm.userid.value);
        // frm.userid.value 값이 regExp_userid 패턴에 맞으면 true 
        // frm.userid.value 값이 regExp_userid 패턴에 틀리면 false  

        if(!bool_userid) {
            document.querySelector('span#err_userid').innerHTML = "아이디는 5글자 이상 20글자 이하 이어야 하고, 첫글자는 영문자 나머지는 소문자 또는 숫자 이어야 합니다."; 

            frm.userid.value = "";
            frm.userid.focus();
            return false; // submit을 하지않는다.
        }
        else {
            document.querySelector('span#err_userid').innerHTML = "";
        }

        // 2. 암호는 8글자 이상 15글자 이하이어야 하고, 영문자, 숫자, 특수문자가 혼합되어야만 한다.
		//    올바른예 : qwer1234$ , Abcd007!
		//    틀린예  : qw12$ , qwer12345, adfsdf24243@%@#$sdfsdf

        // ==== 정규표현식 객체 만들기 ==== //
        // 정규표현식 객체는 항상 / 로 시작해서 / 로 끝나고 ; 을 붙여주면 된다.
        const regExp_passwd = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).*$/g; 

        // 위에서 생성한 정규표현식 객체에 데이터값을 넣어서 검사한다.
        const bool_passwd = regExp_passwd.test(frm.passwd.value);
        // frm.passwd.value 값이 regExp_passwd 패턴에 맞으면 true 
        // frm.passwd.value 값이 regExp_passwd 패턴에 틀리면 false  

        if(!bool_passwd) {
            document.querySelector('span#err_passwd').innerHTML = "암호는 8글자~15글자 이어야 하고 영문자,숫자,특수문자가 혼합되어야 합니다."; 

            frm.passwd.value = "";
            frm.passwd.focus();
            return false; // submit을 하지않는다.
        }
        else {
            document.querySelector('span#err_passwd').innerHTML = "";
        }


        // 3. 암호 입력란과 암호확인 입력란의 데이터가 동일한지 아닌지 검사하기
        if(frm.passwd.value != document.querySelector('input#passwd2').value) {
        //  암호 입력란의 값 != 암호확인 입력란의 값
            document.querySelector("span#err_passwd2").innerHTML = "암호와 암호확인 값이 서로 다릅니다.!!"; 

            frm.passwd.value = "";
            document.querySelector('input#passwd2').value = "";

            frm.passwd.focus();
            return false; // submit을 하지않는다.
        }
        else {
            document.querySelector("span#err_passwd2").innerHTML = "";
        }


        // 4. 성명은 필수 입력사항이므로 반드시 값을 입력해야 한다.
		//    단, 공백없이 한글만 2글자 이상 6글자 이하로만 한다.

        // ==== 정규표현식 객체 만들기 ==== //
        // 정규표현식 객체는 항상 / 로 시작해서 / 로 끝나고 ; 을 붙여주면 된다.
        const regExp_name = /^[가-힣]{2,6}$/; 

        // 위에서 생성한 정규표현식 객체에 데이터값을 넣어서 검사한다.
        const bool_name = regExp_name.test(frm.name.value);
        // frm.name.value 값이 regExp_name 패턴에 맞으면 true 
        // frm.name.value 값이 regExp_name 패턴에 틀리면 false  

        if(!bool_name) {
            document.querySelector('span#err_name').innerHTML = "성명은 공백없이 한글로만 2글자 이상 6글자 이하 까지만 됩니다."; 

            frm.name.value = "";
            frm.name.focus();
            return false; // submit을 하지않는다.
        }
        else {
            document.querySelector('span#err_name').innerHTML = "";
        }


        // 5. 이메일은 필수 입력사항이므로 반드시 값을 입력해야 한다.
		//    올바른예 : leess@naver.com
		//    틀린예  : leessnaver.com , leess@naver.@com

        // ==== 정규표현식 객체 만들기 ==== //
        // 정규표현식 객체는 항상 / 로 시작해서 / 로 끝나고 ; 을 붙여주면 된다.
        const regExp_email = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i; 

        // 위에서 생성한 정규표현식 객체에 데이터값을 넣어서 검사한다.
        const bool_email = regExp_email.test(frm.email.value);
        // frm.email.value 값이 regExp_email 패턴에 맞으면 true 
        // frm.email.value 값이 regExp_email 패턴에 틀리면 false  

        if(!bool_email) {
            document.querySelector('span#err_email').innerHTML = "email 형식에 맞지 않습니다. 올바른 email 을 입력하세요!!"; 

            frm.email.value = "";
            frm.email.focus();
            return false; // submit을 하지않는다.
        }
        else {
            document.querySelector('span#err_email').innerHTML = "";
        }


        // 6. 성별을 선택했는지 검사하기(라디오에서 선택했는지 안했는지 검사하는 것임) 
        const gender_radio_list = frm.gender;
        let bool_gender = false;
        for(let gender_radio of gender_radio_list) {
            if(gender_radio.checked) { // 라디오를 선택한 경우 
                bool_gender = true; 
                break;
            }
        }// end of for---------------------

        if(!bool_gender) {
            document.querySelector('span#err_gender').innerHTML = "성별을 선택하세요!!";
            return false; // submit을 하지않는다.
        }
        else {
            document.querySelector('span#err_gender').innerHTML = "";
        }


        // 7. 취미를 2개 이상 선택했는지 검사하기(체크박스에 선택했는지 안했는지 검사하는 것임) 
        const hobby_checkbox_list = frm.hobby;

        let checked_cnt = 0;
        for(let hobby_checkbox of hobby_checkbox_list) {
            if(hobby_checkbox.checked) { // 체크박스를 선택한 경우
                checked_cnt++;
            }
        }// end of for-------------------------

        if(checked_cnt < 2) {
            document.querySelector('span#err_hobby').innerHTML = "취미는 최소한 2개 이상 선택하셔야 합니다.";  
            return false; // submit을 하지않는다.
        }
        else {
            document.querySelector('span#err_hobby').innerHTML = "";
        }


        // 8. 생년월일을 올바르게 선택했는지 검사하기
        let is_birthday_ok = true;

        if( isNaN(frm.birthYear.value) ||
            isNaN(frm.birthMonth.value) ||
            isNaN(frm.birthDate.value) ||
            !checkValidDate(frm.birthYear.value + "-" + frm.birthMonth.value + "-" + frm.birthDate.value)
          ) { 
                document.querySelector('span#err_birthday').innerHTML = `"생년월일" 을 올바르게 선택하세요`; 
                is_birthday_ok = false;
                return false; // submit을 하지않는다.
        }

        else {
            const birthday = frm.birthYear.value + "-" + frm.birthMonth.value + "-" + frm.birthDate.value;  
            if(func_manAge(birthday) < 0) {
                document.querySelector('span#err_birthday').innerHTML = `"생년월일" 을 올바르게 선택하세요`; 
                is_birthday_ok = false;
                return false; // submit을 하지않는다.
            }
        }

        if(is_birthday_ok) {
            document.querySelector('span#err_birthday').innerHTML = "";
        }

                    
        // 9. 최종학력을 선택했는지 검사하기
        if(frm.school.value == "선택하세요") {
            document.querySelector('span#err_school').innerHTML = "최종학력을 올바르게 선택하세요!!"; 
            return false; // submit을 하지않는다.
         }
        else {
            document.querySelector('span#err_school').innerHTML = ""; 
        }


        // 10. 가입인사말을 입력했는지 검사하기
        if(frm.registerComment.value.trim() == "") {
            document.querySelector('span#err_registerComment').innerHTML = "가입인사말을 입력하세요!!"; 
            frm.registerComment.value = "";
            frm.registerComment.focus();
            return false; // submit을 하지않는다.
         }
        else {
            document.querySelector('span#err_registerComment').innerHTML = ""; 
        }

        frm.submit(); // 전송하기
    };
    // ========= 전송(submit) 클릭시 끝 ========== //

    // ========= 취소(reset) 클릭시 시작 ========== //
    frm.onreset = function(){
        // 모든 에러 메시지 지우기 
        document.querySelectorAll('span.errmsg').forEach((elmt, index, array) => {
            elmt.innerHTML = "";
        });
        // 나이 지우기 
        document.querySelector('span#age').innerHTML ="";

    };
    // ========= 취소(reset) 클릭시 끝 ========== //


}// end of window.onload = function(){}----------------------------------


// Function Declaration

// 생년월일에서 '출생일'에 해당하는 select 태그의 값을 변경했을 때 호출되는 함수
function go_birthDate(select) {

    if(isNaN(select.value)) { // "출생일" 을 선택한 경우 
         alert("태어나신 일을 선택하세요!!");
         document.querySelector('span#age').innerHTML = "";
    }
    else { // "출생일" 을 제외한 숫자를 선택한 경우 
                
        const birthday = document.querySelector('select#birthYear').value + "-" + 
                         document.querySelector('select#birthMonth').value + "-" + 
                         document.querySelector('select#birthDate').value;

        if( !isNaN(document.querySelector('select#birthYear').value) && 
            !isNaN(document.querySelector('select#birthMonth').value) && 
            !isNaN(document.querySelector('select#birthDate').value) && 
            !checkValidDate(birthday) ) {
                alert("달력상에 존재하지 않는 생년월일 입니다.");
                document.querySelector('span#age').innerHTML = "";
        }
                
        if( checkValidDate(birthday) ) { // 생년월일이 달력에 존재하는 날짜이라면 
             // alert("만나이를 구하러 간다.");

             const manAge = func_manAge(birthday);
             if(manAge >= 0) {
                 document.querySelector('span#age').innerHTML = manAge;
             }
             else {
                 alert("생년월일이 현재일 이후라서 안돼요~~!!");
                 document.querySelector('span#age').innerHTML = "";
             }
        }
    }    
}// end of function go_birthDate(select)----------------------------



// 생년월일을 입력받아서 '만나이'를 구해주는 함수 만들기
function func_manAge(birthday) {

   const d_birthday = new Date(birthday);  // 문자열(날짜형식의 문자열이어야 함)인 birthday 를 날짜로 변경하기 
                                           // 날짜형식의 문자열은 2001-11-15 또는 2001/11/15 또는 2001.11.15 이다. 
   const birthYear = d_birthday.getFullYear();  // 생일년도(number 타입이다) 

   const now = new Date(); // 자바스크립트에서 현재날짜시각을 알려주는 것이다.
   const currentYear = now.getFullYear(); // 현재년도 

   // 올해 생일이 현재일자 또는 올해 생일이 현재일자 보다 작은 경우 
   // 즉, 오늘이 생일 이거나, 생일이 지난 경우 
   if(d_birthday.getMonth() < now.getMonth() || 
      (d_birthday.getMonth() == now.getMonth() && d_birthday.getDate() <= now.getDate() )
   ) { return currentYear - birthYear; }
   else { // 올해 생일이 현재일 보다 뒤에 있는 경우 
       return currentYear - birthYear - 1;
   }

}// end of function func_manAge(birthday)---------------------------------
