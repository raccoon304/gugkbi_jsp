window.onload = function() {
   const btn_previous = document.querySelector('button[id="previous"]');
   const btn_next = document.querySelector('button[id="next"]');
   const btnSubmit = document.querySelector('button[id="btnSubmit"]');
   const footer = document.querySelector('div[id="footer"]');
   const quizDiv =  document.querySelector('div[id="box"]');//퀴즈문항을 보여줄 장소 
   const redbox = document.querySelector('div[id="redbox"]');

   let current_indexno = 0; 
   let correctArr = [];           
   let userAnswerArr = [];        
   let oxArr = [];                
   let answerCount = 0; 
   let max_indexno;          
   let quizList;         

   const arr_quizData = [{
                           question : "문제1. 대한민국의 수도는?",
                           answers : {
                                          1 : "부산",
                                          2 : "수원",
                                          3 : "서울",
                                          4 : "인천"
                                       },
                           correct : 3
                        }
                        , {
                           question : "문제2. 1+1=",
                           answers : {
                                          1 : "1",
                                          2 : "2",
                                          3 : "3",
                                          4 : "4"
                                       },
                           correct : 2
                        }
                        , {
                           question : "문제3. 미국의 수도는?",
                           answers  : { 
                              1 : "뉴욕",
                              2 : "파리",
                              3 : "로스엔젤러스",
                              4 : "워싱턴",
                              5 : "런던"
                           },
                           correct : 4
                        }
                        , {
                           question : "문제4. 사진속의 인물의 이름은?<div><img src='images/parkby.jpg'/></div>",
                           answers  : { 
                              1 : "엄정화",
                              2 : "아이유",
                              3 : "김태희",
                              4 : "박보영"
                           },
                           correct : 4
                        }
                        , {
                           question : "문제5. 다음중 사람이 아닌것을 고르시오.",
                           answers  : { 
                              1 : "<div><img src='images/iyou.jpg'/></div>",
                              2 : "<div><img src='images/parkby.jpg'/></div>",
                              3 : "<div><img src='images/koala.jpg'/></div>",
                              4 : "<div><img src='images/kimth.jpg'/></div>"
                           },
                           correct : 3
                        }];



// ====== 퀴즈 문항을 html로 만들기 시작 ====== //
   let html = ``

   arr_quizData.forEach((item,index,array) => {
      html += `<div class="quiz_item" id="quiz${index}" style="display:none;">`;
      html += `<p id="q${index}">${item.question}</p>`
      html += `<ol>`

      for(let propertyName in item.answers){
         html += `<li>
                  <label for="${index}${propertyName}" style="cursor: pointer;">${item.answers[propertyName]}</label>&nbsp
                  <input id="${index}${propertyName}"type="radio" name="question${index}" value="${propertyName}"/>  
                  </li>` 
         }// == EoP for ==

      html += `</ol>`;      
      html += `<div class ="ox" id="ox${index}"></div>`; //퀴즈 문항에 대해 정답인지 오답인지를 보여줄 장소
      html += `</div>`
   });
   quizDiv.innerHTML = html;
   // ====== 퀴즈 문항을 html로 만들기 끝 ====== //



   quizList = document.querySelectorAll('.quiz_item');
   max_indexno = quizList.length - 1;

   if (quizList.length > 0) {
      quizList.forEach(elmt => elmt.style.display = "none");
      quizList[0].style.display = "";
   }
   // ==== 다음으로 이동하는 함수 ==== //
   const func_next = function(){
      if(current_indexno < max_indexno) { 

         btn_previous.removeAttribute('disabled');  // 이전버튼은 활성화 상태로 만든다. 

         quizList.forEach( elmt => {elmt.style.display = "none";} );

         const quiz = quizList[++current_indexno]; 
         quiz.style.display = ""; 
         // 문제의 현재 인덱스 번호를 1증가 시킨 후, 인덱스번호에 해당하는 이미지만 보이게 만든다.

         document.querySelector('h2[id="msg"]').innerHTML = "";
      }    
      else { // 문제의 현재 인덱스 번호가 마지막인 경우
         btn_next.setAttribute('disabled', true);  // 마지막 사진일 때 다음버튼을 비활성화 상태로 만든다. 
         document.querySelector('h2[id="msg"]').innerHTML = "마지막 문제 입니다.";
      }    
   };



    // ==== 이전으로 이동하는 함수 ==== //
   const func_previous = function(){
      if(current_indexno > 0) { // 문제의 현재 인덱스 번호가 처음이 아닌 두번째 이상인 경우
         btn_next.removeAttribute('disabled');  // 다음버튼은 활성화 상태로 만든다. 

         quizList.forEach( elmt => {elmt.style.display = "none";} );

         const quiz = quizList[--current_indexno]; 
         quiz.style.display = "";
         // 문제의 현재 인덱스 번호를 1감소 시킨 후, 인덱스번호에 해당하는 문제만 보이게 만든다.

         document.querySelector('h2[id="msg"]').innerHTML = "";
      }    
      else { // 문제의 현재 인덱스 번호가 처음인 경우
         btn_previous.setAttribute('disabled', true);  // 처음 문제일 때 이전버튼을 비활성화 상태로 만든다. 
         document.querySelector('h2[id="msg"]').innerHTML = "처음 문제 입니다.";
      }
   };

   btn_previous.setAttribute('disabled', true);  // 이전버튼은 초기화로 사용하지 못하도록 비활성화 상태로 만든다. 

   btn_previous.addEventListener('click', func_previous); // 이전버튼 클릭시 이전으로 이동하는 함수를 호출한다. 

   btn_next.addEventListener('click', func_next);         // 다음버튼 클릭시 다음으로 이동하는 함수를 호출한다.


   // ===== 타이머 ===== // 
   const timerDiv = document.querySelector('div[id="timer"]'); // 타이머를 보여줄 장소 

   let time = 600; //  타이머 시간을 10분으로 지정 
   let minute;
   let second;

   // ===== 타이머 함수 만들기 시작 ===== //
   const timer = () => { 
   if(time < 0){
      alert("시험시간 종료 \n 자동으로 제출.")
      clearInterval(intervalTimer); // 타이머삭제하기.
                                    // intervalTimer는 중단해야할 setInterval 함수를 가리키는 것. 

      check(); // 채점하는 함수 호출 ( 시간이 끝나면 자동으로 제출되고 채점 실행.)
      btnSubmit.setAttribute('disabled',true); //제출하기 버튼 비활성화

         footer.style.display = 'none';
         
         // ===== 정답지 테이블 만들기 ====== //
         const resultDiv = document.querySelector('div[id="result_tbl"]');
         redbox.style.display = 'flex';
         const total = arr_quizData.length;

         let quizNo = `<tr><th>문제번호</th>`;
         for(let i=0; i<total; i++){
            quizNo += `<th>${i+1}번문제</th>`;
         }
         quizNo += `<th >점수</th></tr>`;

         // 정답 가져와서 테이블로 만들기
         let ansNo = `<tr><th>정답</th>`
         for(let i=0; i<correctArr.length; i++ ){
            ansNo += `<th>${correctArr[i]}</th>`
         }
         ansNo += `<td rowspan="3">${answerCount*20}</td></tr>`;
         ansNo += `</tr>`

         
         // 제출한답 가져와서 테이블로 만들기
         let userAns = `<tr><th>제출한답</th>`
         let ansChk = "";
         for(let i=0; i<correctArr.length; i++ ){
            if (userAnswerArr[i] == -1){  // 시간 종료 제출의 경우 풀지못한 문제는 제출X로 표시해둠.
               ansChk = "제출X"
            }
            else{
               ansChk = userAnswerArr[i]
            }
            userAns += `<th>${ansChk}</th>`
         } 
         userAns += `</tr>`


         // 채점결과 가져와서 테이블로 만들기
         let currect = `<tr><th>채점결과</th>`
         for(let i=0; i<correctArr.length; i++ ){
            currect += `<th>${oxArr[i]}</th>`
         } 
         currect += `</tr>`

         // 위에서 구한 값들 테이블로 표시
         html = `
            <table>
                ${quizNo}
                ${ansNo}
                ${userAns}
                ${currect}
            </table>
        `;
         resultDiv.innerHTML = html;
         // ===== 정답지 테이블 만들기 끝 ====== //
   }
   else{

      minute = Number(parseInt(time/60)); // 소수부는 없애고 정수부만 가져오는것이다.
      if(minute<10){
            minute = "0" + minute;
      }

      second = time % 60;
      if(second < 10 ){
            second = "0" + second;
      }
   };
   timerDiv.innerHTML = `${minute}:${second}`;
   time--;
   };
   // ===== 타이머 함수 만들기 끝 ===== //

   // 1초마다 타이머 함수 호출 
   const intervalTimer = setInterval(timer, 1000);




   const handlerSubmit = ()=>{
      if(check()){ // 채점하는 함수 호출
         alert("제출이 완료되었습니다.");
         clearInterval(intervalTimer); // 타이머 삭제하기 
         // intervalTimer는 중단해야할 setInterval 함수를 가리키는 것이다.

         timerDiv.innerHTML = `00:00`;

         btnSubmit.setAttribute('disabled',true); //제출하기 버튼 비활성화

         footer.style.display = 'none';   // 기존에있던 제출하기 버튼 싹다 없애기.

         // ===== 정답지 테이블 만들기 ====== //
         const resultDiv = document.querySelector('div[id="result_tbl"]');
         redbox.style.display = 'flex';
         const total = arr_quizData.length;

         let quizNo = `<tr><th>문제번호</th>`;
         for(let i=0; i<total; i++){
            quizNo += `<th>${i+1}번문제</th>`;
         }
         quizNo += `<th >점수</th></tr>`;


         let ansNo = `<tr><th>정답</th>`
         for(let i=0; i<correctArr.length; i++ ){
            ansNo += `<th>${correctArr[i]}</th>`
         }
         ansNo += `<td rowspan="3">${answerCount*20}</td></tr>`;
         ansNo += `</tr>`

         let userAns = `<tr><th>제출한답</th>`
         for(let i=0; i<correctArr.length; i++ ){
            userAns += `<th>${userAnswerArr[i]}</th>`
         } 
         userAns += `</tr>`

         let currect = `<tr><th>채점결과</th>`
         for(let i=0; i<correctArr.length; i++ ){
            currect += `<th>${oxArr[i]}</th>`
         } 
         currect += `</tr>`

         html = `
            <table>
                ${quizNo}
                ${ansNo}
                ${userAns}
                ${currect}
            </table>
        `;
         resultDiv.innerHTML = html;
         // ===== 정답지 테이블 끝 ====== //
      }
    };

   btnSubmit.addEventListener('click', handlerSubmit);



   // ====== 채점하는 함수 만들기 시작 ====== //
   const check = () => { 
        if(time >= 0){// 시험시간이 남았지만, 사용자가 제출하기 버튼을 누른경우. 
            let choiceCnt = 0; // 답안선택 누적용 

            arr_quizData.forEach((item, index, array) => {
                // === 해당문제의 라디오 개수가 몇개인지 알아오기 === //
                const radioLength = document.querySelectorAll(`input[name="question${index}"]`).length;
                console.log(radioLength);

                for(let i=0; i<radioLength; i++){
                    
                    // !! === 중요 === !! //
                    if(document.querySelectorAll(`input[name="question${index}"]`)[i].checked){
                        choiceCnt++;
                        break;
                    };
                }
            });//EoP forEach()
            if(choiceCnt != arr_quizData.length){
                alert("답안을 선택하지 않은 문제가 있습니다.");
                return false; //false를 return시켜주면서 함수를 종료시킴. 
            }
         }// ===== EoP if(time >= 0) =====

         // ====== 진짜로 채점하러 가기 시작 ======
        

         arr_quizData.forEach((item, index, array) => {

            //퀴즈문항 뒤에 정답번호 공개하기.
            const question = document.querySelector(`p[id="q${index}"]`).innerHTML; // 정답을 보여주기 전 

            document.querySelector(`p[id="q${index}"]`).innerHTML = question + `&nbsp; <span style="color:red; font-weight: bold";>${item.correct}</span>`;
            // 문제에 정답을 붙여서 보여줌 

            const checked_radio_elmt = document.querySelector(`input[name="question${index}"]:checked`);

            let user_answer;
            if(checked_radio_elmt == null){
                user_answer = "-1"; //정답은 1,2,3,4,(5) 까지만 있는데, -1로 넣어줘서 무조건 오답처리로 만듦. 
            }
            else{
                user_answer = checked_radio_elmt.value;
            }

            // 테이블 만들어줄때 필요한 값들을 배열에 차례로 보관. 
            correctArr.push(item.correct);
            userAnswerArr.push(user_answer);

            // console.log(`사용자가 선택한 ${index+1}번 문제의 답 :  ${user_answer}`)
            if(user_answer == item.correct){
                answerCount++; // 정답개수 누적용
                oxArr.push("O"); // 테이블 만들어줄때 필요한 값들을 배열에 차례로 보관. 
                document.querySelector(`div[id="ox${index}"]`).innerHTML = `<span style="color:blue;">정답</span>`;
            }
            else{
               oxArr.push("X"); // 테이블 만들어줄때 필요한 값들을 배열에 차례로 보관. 
               document.querySelector(`div[id="ox${index}"]`).innerHTML = `<span style="color:red;">오답</span>`;
            }
                
        });// ==== EoP forEach ==== 

        return true; //true를 return시켜주면서 함수를 종료시킴. 
        // ====== 진짜로 채점하러 가기 끝 ======
    };

    // ====== 채점하는 함수 만들기 끝 ====== //

}// end of window.onload = function() {}--------------------
