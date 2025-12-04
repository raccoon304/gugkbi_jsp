window.onload = () => {
    const timerDiv = document.querySelector('div[id="timer"]'); //타이머를 보여줄 장소

    const time_set = 600;

    let time = time_set;// 타이머 시간을 600초(==10분)
    let isClick_btnTimerClear = false;//타이머 중지 

    // ===== 타이머 함수 만들기 시작 ===== //
    const timer = function(){

        if(time < 0 ){
            clearInterval(intervalTimer);   // 매 1초마다 호출하는 타이머 삭제하기
                                            // intervalTimer는 중단해야할 setInterval함수를 가리킴
        }
        else{
            let minute;
            let second;

            minute = parseInt(time/60); //소수부는 없애버리고 정수부만 가져오는것.
            if(Number(minute) < 10){
                minute = "0" + minute;
            }
            second = time%60; // time을 60으로 나누었을때의 나머지 
            if(second < 10){
                second = "0" + second;
            }

            const html = `${minute}:${second}`

            timerDiv.innerHTML = html;

            time --;
        };
    };
        // ===== 타이머 함수 만들기 끝 ===== //


    // setInterval(() => {
    //     timer();    
    // }, 1000);
    //또는
    // setInterval(timer,1000);

    let intervalTimer = setInterval(timer,1000); //1초마다 주기적으로 호출

    // ===== 타이머 중지 버튼  시작===== //
    const btnTimerClear = document.querySelector('button[id="btnTimerClear"]');

    btnTimerClear.addEventListener('click', () => {
        clearInterval(intervalTimer);   // 매 1초마다 호출하는 타이머 삭제하기
                                        // intervalTimer는 중단해야할 setInterval함수를 가리킴
        isClick_btnTimerClear = true;
    }); 
    // ===== 타이머 중지 버튼  끝 ===== //



    // ===== 타이머 중지이후부터 시작 버튼 시작===== //
    const btnTimerContinue = document.querySelector('button[id="btnTimerContinue"]');
    
    btnTimerContinue.addEventListener('click',() => {

        if(isClick_btnTimerClear){
            /* 타이머를 다시 생성하려면 먼저 타이머를 없애고 만드는것이 가장 좋다.(오차발생 위험)*/ 
            clearInterval(intervalTimer);

            intervalTimer = setInterval(() => {timer();}, 1000);
            isClick_btnTimerClear = false;
        }
        else{
            alert("타이머 중지부터")
        }
    });
    // ===== 타이머 중지이후부터 시작 버튼  끝 ===== //


    // ===== 타이머 처음부터 시작 버튼 시작 ===== //
    const btnTimerRestart = document.querySelector('button[id="btnTimerRestart"]');

    btnTimerRestart.addEventListener('click', () => {
        clearInterval(intervalTimer);

        time = time_set;// 타이머 시간을 600초(==10분)
        let isClick_btnTimerClear = false;//타이머 중지 

        intervalTimer = setInterval(timer, 1000);
    });
    // ===== 타이머 처음부터 시작 버튼 끝 ===== //

}// ===== EoP window.onload =====