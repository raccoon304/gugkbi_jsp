window.onload = () => {
    const timerDiv = document.querySelector('div[id="timer"]'); // 타이머를 보여줄 장소 
    const btnSubmit = document.querySelector('button[id="btnSubmit"]');



    let time = 5; //  타이머 시간을 10분으로 지정 
    let minute;
    let second;

    // ===== 타이머 함수 만들기 시작 ===== //
    const timer = () => { 
        if(time < 0){
            alert("시험시간 종료 \n 자동으로 제출.")
            clearInterval(intervalTimer); // 타이머삭제하기.
                                          // intervalTimer는 중단해야할 setInterval 함수를 가리키는 것. 

            check(); // 채점하는 함수 호출 ( 시간이 끝나면 자동으로 제출되고 채점 실행.)
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


    //==============================================================
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
                            question : "문제4. 사진속의 인물의 이름은?<div><img src='images/iyou.jpg'/></div>",
                            answers  : { 
                                1 : "엄정화",
                                2 : "아이유",
                                3 : "김태희",
                                4 : "박보영"
                            },
                            correct : 2
                        }];

    const quizDiv =  document.querySelector('div[id="quiz_display"]');//퀴즈문항을 보여줄 장소 
    






    // ====== 퀴즈 문항을 html로 만들기 시작 ====== //
    let html = ``

    arr_quizData.forEach((item,index,array) => {
        html += `<p id="q${index}">${item.question}</p>`
        html += `<ol>`

        for(let propertyName in item.answers){
            // 어떤 객체의 속성(키)들을 모두 불러올때는 for문에서 of 가 아니라 in 을 사용한다. 
            html += `<li>
                        <label for="${index}${propertyName}" style="cursor: pointer;">${item.answers[propertyName]}</label>&nbsp
                        <input id="${index}${propertyName}"type="radio" name="question${index}" value="${propertyName}"/>  
                    </li>` 
                            // 라디오는 반드시 name 값이 동일해야 한다.
                            // value 값은 item.answers 의 속성명인 1 2 3 4 로 되어진다.
                // 객체명.속성명 은 속성명에는 변수가 사용될 수 없다.
                // 객체명[속성명] 은 속성명에 변수가 사용될 수 있다.
                // ${item.answers[property_name]} 는 "부산" 과 같은 것을 말하는 것이다.
        }// == EoP for ==

        html += `</ol>`;      
        html += `<div class ="ox" id="ox${index}"></div>`; //퀴즈 문항에 대해 정답인지 오답인지를 보여줄 장소
    });
    quizDiv.innerHTML = html;
    // ====== 퀴즈 문항을 html로 만들기 끝 ====== //






    // ====== 제출하기 버튼 클릭시 이벤트 처리 시작 ====== //
    const handlerSubmit = ()=>{
        if(check()){ // 채점하는 함수 호출
            alert("제출이 완료되었습니다.");
            clearInterval(intervalTimer); // 타이머 삭제하기 
            // intervalTimer는 중단해야할 setInterval 함수를 가리키는 것이다.

            timerDiv.innerHTML = `00:00`;

            // "제출하기" 버튼을 비활성화 시켜줘야함. 
            // 아래의 btnSubmit은 제출하기 버튼, 맨위에서 생성되었다. 
            //btnSubmit.disabled = true; // 제출하기 버튼 비활성화
            //또는
            btnSubmit.setAttribute('disabled',true); //제출하기 버튼 비활성화


            // [참고]  btnSubmit.disabled = false; // 제출하기 버튼 활성화
            // [참고]  btnSubmit.removeAttribute('disabled'); //제출하기 버튼 활성화
        }
    };

    btnSubmit.addEventListener('click', handlerSubmit);
    // ====== 제출하기 버튼 클릭시 이벤트 처리 끝 ====== //








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
        let answerCount = 0; // 정답 갯수 누적용 

        arr_quizData.forEach((item, index, array) => {
            console.log(`${index+1}번 문제의 정답 : ${item.correct}`)
            //1번 문제의 정답 : 3
            //2번 문제의 정답 : 2
            //3번 문제의 정답 : 4
            //4번 문제의 정답 : 2

            //퀴즈문항 뒤에 정답번호 공개하기.
            const question = document.querySelector(`p[id="q${index}"]`).innerHTML; // 정답을 보여주기 전 
            // console.log(question);

            document.querySelector(`p[id="q${index}"]`).innerHTML = question + `&nbsp; <span style=color:red; font-weight: bold;>${item.correct}</span>`;
            // 문제에 정답을 붙여서 보여줌 

            // !!! ===== 중요 ===== !!! //
            // --아래는 잘못되어진 예시, 시간 초과로 제출시 체크가 안된부분은 null이 되는데 그때 null.value로 오류가 발생하게됨.
            //const user_answer = document.querySelector(`input[name="question${index}"]:checked`).value;
                                                                                      // :checked는 input[name="question${index}"] 중 선택한 체크박스(내가 선택한 radio)
            // 즉 radio는 하나만 선택되니, querySelectorAll 이 아닌 하나인 querySelector사용.

            const checked_radio_elmt = document.querySelector(`input[name="question${index}"]:checked`);

            let user_answer;
            if(checked_radio_elmt == null){
                user_answer = "-1"; //정답은 1,2,3,4,(5) 까지만 있는데, -1로 넣어줘서 무조건 오답처리로 만듦. 
            }
            else{
                user_answer = checked_radio_elmt.value;
            }

            // console.log(`사용자가 선택한 ${index+1}번 문제의 답 :  ${user_answer}`)
            if(user_answer == item.correct){
                answerCount++; // 정답개수 누적용
                document.querySelector(`div[id="ox${index}"]`).innerHTML = `<span style="color:blue;">정답</span>`;
            }
            else{
                document.querySelector(`div[id="ox${index}"]`).innerHTML = `<span style="color:red;">오답</span>`;
            }
        });// ==== EoP forEach ==== 

        document.querySelector('div[id="score"]').innerHTML = `<span style="font-weight: bold;">정답개수 : ${answerCount}</span>`

        return true; //true를 return시켜주면서 함수를 종료시킴. 
        // ====== 진짜로 채점하러 가기 끝 ======
    };

    // ====== 채점하는 함수 만들기 끝 ====== //

//==============================================================================================================================================================
}