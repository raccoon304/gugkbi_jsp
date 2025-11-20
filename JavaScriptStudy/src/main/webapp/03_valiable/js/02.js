window.onload = function(){

    document.getElementById("num1").focus();
} 

function func_sum(){
/*
     1995년 부터 2015년 까지는 모든 JavaScript 코드에서 변수 선언시 var 를 사용하였음.
     2015년 이후 부터 JavaScript 코드에서 변수 선언시 사용되는 const 와 let 가 추가 되었음. 
   
   ※ ES6(ECMAScript 6) 
   ==> ES6이란? ECMA라는 정보와 통신 시스템을 위한 국제적 표준화 기구에서 만든 ECMAScript 표준문서의 6번째 개정판 문서에 있는 표준 스펙이다.  
       ES5는 2011년에 나왔고, ES6은 2015년에 나왔는데 내용이 2배 이상 많아졌음. 
       ES7은 2016년에 나왔지만 ES6과 ES7은 바뀐것이 거의 없음. 
       그래서 일반적으로 ES7이라고 부르지 않고 ES6이라고 부름.
   */
   
   // 키보드 숫자 1 왼쪽에 있는 ` 을 백틱이라고 부른다.

    // const num1 = document.getElementById("num1").value;  
    // var num1 = document.getElementById("num1").value;  
    const num1 = document.getElementById("num1").value;  // input 태그의 입력한 값을 받아올때 .value를 사용한다. 
    // const로 선언된 경우, 중복이 불가능하다.

    // num1 = document.getElementById("num1").value;
    //Uncaught TypeError: Assignment to constant variable. 오류발생
    // --- num1 은 const 타입이므로 num1 에 이미 값이 할당된 이후에 또 
    // 값을 할당하는 것은 오류이다. 
   // --- 그러므로 const 는 자바의 final 변수와 비슷한 상수변수 형태로 사용된다. 



    const num2 = document.getElementById("num2").value;  // input 태그의 입력한 값을 받아올때 .value를 사용한다. 
 
    if( isNaN(num1) || isNaN(num2)){
        alert("입력하시는 값은 두개 모두 숫자로만 입력하셔야 합니다.");
        func_clear();
        return; 
    }

    document.getElementById("sum").innerHTML = `
    <span style="color: blue: font-weight: bold;">
        ${ Number(num1) + Number(num2) }
    </span>
    `;

}// ===== EoP func_sum() =====

function func_clear() { 
    document.getElementById("num1").value = "";
    document.getElementById("num2").value = "";
    document.getElementById("sum").innerHTML ="";

    document.getElementById("num1").focus;

}// ===== Eop func_clear() =====


function func_minus(){
    let num3 = document.getElementById("num3").value;  
     // let로 선언된 경우, 중복이 불가능하다.
    num3 = document.getElementById("num3").value;  
    // num3은 let 타입이므로 num3에 이미 값이 할당된 이후에 또 값을 할당해도 괜찮음. 
    // const => final 같은 느낌, let => 일반적인 변수느낌.

    // const num4; <- 오류. const는 선언시 변수의 선언과 함께 값이들어가야함. 
    let num4;
    num4 = document.getElementById("num4").value; 
    // 선언 이후 값을 줘도댐. 
    //  let 으로 선언된 변수는 다른 값을 받아서 쓸 수 있는 재사용이 가능하다. 

    if( isNaN(num3) || isNaN(num4)){
        alert("입력하시는 값은 두개 모두 숫자로만 입력하셔야 합니다.");
        func_clear2();
        return; 
    }

    var minus = Number(num3) - Number(num4);
    document.getElementById("minus").innerHTML = `
         <span style="color: blue: font-weight: bold;">
         ${minus}
         </span>
    `;




}// ===== EoP func_minus() =====

function func_clear2() { 
    document.getElementById("num3").value = "";
    document.getElementById("num4").value = "";
    document.getElementById("minus").innerHTML ="";

}// ===== Eop func_clear2() =====