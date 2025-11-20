window.onload = function(){
    // 문서가 로딩이 끝난 다음에 자동적으로 수행하야할 일들은 여기서 기술한다.

    document.getElementById("num1").focus();
    // !!! 자바스크립트에서 선언되어지는 변수의 타입은 입력되어지는 데이터값에 의해 정해진다.
    var a =10;
    console.log("변수 a의 타입 : " + typeof(a));
    // 변수 a의 타입 : number

    console.log("변수 a의 값 : ", a); 
    // 변수 a의 값 :  10

    var a = 9.1234;
    console.log("변수 a의 타입 : " + typeof(a));
    // 변수 a의 타입 : number

    console.log("변수 a의 값 : ", a); 
    // 변수 a의 값 :  9.1234

    var a = "안녕하세요?";
    console.log("변수 a의 타입 : " + typeof(a));
    // 변수 a의 타입 : string

    console.log("변수 a의 값 : ", a); 
    // 변수 a의 값 :  안녕하세요?

    var a = "즐거운 하루 되세요.";
    console.log("변수 a의 타입 : " + typeof(a));
    // 변수 a의 타입 : string

    console.log("변수 a의 값 : ", a); 
    // 변수 a의 값 :  즐거운 하루 되세요.

    var a = true;
    console.log("변수 a의 타입 : " + typeof(a));
    // 변수 a의 타입 : string

    console.log("변수 a의 값 : ", a); 
    // 변수 a의 값 :  즐거운 하루 되세요.
} 

function func_sum_error(){
    /*!!! 웹에서 입력하는 값들은 모두 string 타입이다. !!!*/
    var num1 = document.getElementById("num1").value;  // input 태그의 입력한 값을 받아올때 .value를 사용한다. 
    var num2 = document.getElementById("num2").value;  // input 태그의 입력한 값을 받아올때 .value를 사용한다. 

    console.log("확인용 num1 타입 : ", typeof(num1));

    console.log("확인용 num2 타입 : ", typeof(num2));

    var sum = num1 + num2;
    //  자바스크립트에서 +는 모두 number 타입일때만 "더하기"로 사용되어지고,
    // + 는 하나라도 string 타입이라면 "문자열 결합"으로 사용되어짐.


    console.log("확인용 sum type : ", typeof(sum));

    document.getElementById("sum").innerHTML = "<span style='color:red: font=weight:bold;'>"+sum+"</span>";



}// === EoP function func_sum_error() ===



function func_sum_correct(){
        /*!!! 웹에서 입력하는 값들은 모두 string 타입이다. !!!*/
    var num1 = document.getElementById("num1").value;  // input 태그의 입력한 값을 받아올때 .value를 사용한다. 
    var num2 = document.getElementById("num2").value;  // input 태그의 입력한 값을 받아올때 .value를 사용한다. 

    console.log("확인용 typeof(num1) 타입 : ", typeof(num1));

    console.log("확인용 typeof(Number(num1)) 타입 : ", typeof(Number(num1)));
    // Number(변수명) 은 변수명의 타입을 number 타입으로 변경

    console.log("확인용 isNaN(num1) : ", isNaN(num1));
    // isNaN(변수명) 은 Not a Number 로서 변수명에 들어온 값이 숫자로 
    // 변경이 불가한 데이터('ㄴㅇㄹㅇㄹ' 또는 'dfdsf') 일 경우에 true 가 나온다.  
    // isNaN(변수명) 은 Not a Number 로서 변수명에 들어온 값이 숫자로 변경이 
    // 가능한 데이터('20' 또는 '30') 일 경우에는 false 가 나온다. 

    if( isNaN(num1) || isNaN(num2)){
        alert("입력하시는 값은 두개 모두 숫자로만 입력하셔야 합니다.");
        func_clear();
        return; 
        // return 을 만나면 해당 함수 종료.
    }

    var sum = Number(num1) + Number(num2);
    document.getElementById("sum").innerHTML = sum;
}// ===== EoP func_sum_correct() =====

function func_clear() { 
    document.getElementById("num1").value = "";
    document.getElementById("num2").value = "";
    document.getElementById("sum").innerHTML ="";
    // input 태그가 아닐경우 inner로 받아와야함 
    // .value()는 input태그만 받아올 수 있다 .

    document.getElementById("num1").focus;

}// ===== Eop func_clear() =====


function func_minus(){
    var num3 = document.getElementById("num3").value;  
    var num4 = document.getElementById("num4").value;  

    if( isNaN(num3) || isNaN(num4)){
        alert("입력하시는 값은 두개 모두 숫자로만 입력하셔야 합니다.");
        func_clear2();
        return; 
    }

    var minus = Number(num3) - Number(num4);
    document.getElementById("minus").innerHTML = minus;
}// ===== EoP func_minus() =====

function func_clear2() { 
    document.getElementById("num3").value = "";
    document.getElementById("num4").value = "";
    document.getElementById("minus").innerHTML ="";
    // input 태그가 아닐경우 inner로 받아와야함 
    // .value()는 input태그만 받아올 수 있다 .

}// ===== Eop func_clear2() =====