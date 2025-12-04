window.onload = function(){

    /*
    자바스크립트 new Date() 란?
   ==> new Date() 는 new Date() 가 실행되는 시점에 날짜 및 시간 데이터를 갖고 오는 것이다.
        출력하게 되면 요일명 월 일 년도 시:분:초 GMT기준시간을 표시해준다.
    
     자바스크립트 get날짜함수란? 
   ==> getFullYear / getMonth / getDate 등 get날짜함수는 날짜 데이터에서 필요한 형식만 갖고 오는 함수이다.
       
      종류               리턴값
      -----------------------------------
      getFullYear()      YYYY
        getMonth()         MM     자바스크립트의 월은 0부터 시작하기 때문에 1을 더해야 정상적인 월이 된다.
        getDate()          DD
        getDay()           0 ~ 6 (일 ~ 토)
        getHours()         HH
        getMinutes()       MM
        getSeconds()       SS
        getMilliseconds()  mmm
   
    자바스크립트 set날짜함수란? 
   ==> setFullYear / setMonth / setDate 등 set날짜함수는 날짜 데이터의 원하는 형식의 값으로 대입해주는 함수이다.
       종류 : setFullYear(), setMonth(), setDate(), 
              setHours(), setMinutes(), setSeconde(), setMilliseconds()
 */
/* 
    const func_currenDate = function(){
        return "함수 표현식";
    }
    const func_timebomb_1 = function(){alert("5초 후 실행!!");}  
   
    this.setTimeout(func_timebomb_1, 5000);
    // 5000 밀리초 ==> 5초  후에 실행. 
    
    this.setTimeout(func_timebomb_2, 8000);
    // 8000 밀리초 ==> 8초  후에 실행. 
*/



    const func_clock_loop = function(){
        document.querySelector('td[id="current_date_1"]').innerHTML = func_currenDate();
        setTimeout(func_clock_loop, 1000);       
        // 함수 스스로 1초마다 자기자신을 호출해서 무한반복시킴. 
    };
    func_clock_loop(); 

//==================================================================================================
/*
    interval = 1000;
    setInterval(() => {
        console.log("?")
    },interval);
*/
    const func_clock = ()=>{
        document.querySelector('td[id="current_date_2"]').innerHTML = func_currenDate();
    };

    interval = 1000;
    setInterval(() => func_clock(), interval);

} // window.onload = function(){} --------------------------


/*
// function Expression (함수 표현식)
function func_currenDate(){return "함수 선언식";}

function func_timebomb_2(){
    alert("8초 뒤에 실행");
    document.querySelector("body").style.backgroundColor = "yellow";
}
*/

function func_currenDate(){
    const now = new Date();
    // 자바스크립트에서 현재날짜 시각을 알려주는 것이다. 

    // console.log(now);
    //Thu  Nov 27 2025 09:32:08 GMT+0900 (GMT+09:00)
    //요일명 월 일  년  시 분 초  GMT기준시

    // console.log(now.toLocaleString());
    //2025. 11. 27. 오전 9:33:38

    const year = now.getFullYear();// 현재년도
    let month = now.getMonth();// 현재월
    let date = now.getDate();// 현재일

    let hours = now.getHours();// 현재시간
    let minutes = now.getMinutes();// 현재 분
    let seconds = now.getSeconds();// 현재 초

    if(month < 10){
        month = "0"+month
    }
    if(date < 10){
        date = "0" + date
    }
    if(hours < 10){
        hours = "0" + hours
    }
    if(minutes < 10){
        minutes = "0" + minutes
    }
    if(seconds < 10){
        seconds = "0" + seconds
    }

    let dayName;// 현재요일명
    switch (now.getDay()) {
        case 0:
            dayName = "일요일";
            break;
        case 1:
            dayName = "월요일";            
            break;
        case 2:
            dayName = "화요일";
            break;
        case 3:
            dayName = "수요일";
            break;
        case 4:
            dayName = "목요일";
            break;
        case 5:
            dayName = "금요일";            
            break;
        case 6:
            dayName = "토요일";
            break;
        default:
            break;
    };


    return `${year}-${month}-${date} ${hours}:${minutes}:${seconds} ${dayName}`;
}//===== EoP func_currenDate() =====