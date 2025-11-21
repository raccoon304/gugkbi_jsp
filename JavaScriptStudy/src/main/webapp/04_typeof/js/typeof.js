// window.onload = function() {} 은 웹페이지 문서가 모두 로드되어진 다음에 자동적으로 실행해주는 것이다. 
window.onload = function(){

    // const val_1 = document.getElementById("val_1").innerHTML;
    // console.log("확인용 val_1 : ", val_1);
    // --> 확인용 val_1 :  <span style="color: red;">1234</span>

    const val_1 = document.getElementById("val_1").innerText;
    console.log("확인용 val_1 : ", val_1);
    // --> 확인용 val_1 :  1234

    console.log("변수 val_1의 타입 => ",typeof(val_1))
    // --> 변수 val_1의 타입 =>  string

    // document.getElementById("type_1").innerHTML = "<span style='color:blue;'>"+typeof(val_1)+"</span>";
    this.document.getElementById("type_1").innerHTML = `<span style='color:blue;'> ${typeof(val_1)} </span>`;
    // this.document.getElementById("type_1").innerText = `<span style='color:blue;'> ${typeof(val_1)} </span>`;
    // --> innerHTML의 경우 CSS를 적용시켜버림, 하지만 innerText의 경우 전부 text로 출력해버리기에 css적용은 안댐. 
    // 일반적으로 디자인은 .css에서 적용을 시키기 때문에 js에서는 따로 디자인을 하지않음. 즉, innerText를 일반적으로 사용하는게 맞다. 
//============================================================================================================================
    const val_2 = this.document.getElementById("val_2").innerText;
    console.log("확인용 val_2 : ", val_2);
    // --> 확인용 val_2 : 1234.567

    console.log("parseInt(val_2) : ", parseInt(val_2));
    // --> parseInt(val_2) : 1234 
    // 반올림 없고, 소수부 절삭후 정수부만 보여줌. 

    this.document.getElementById("type_2").innerHTML = `<span style='color:blue;'> ${typeof(parseInt(val_2))} </span>`;
    // --> number
//============================================================================================================================
    const val_3 = this.document.getElementById("val_3").innerText;
    console.log("확인용 val_3 : ", val_3);
    // --> 확인용 val_3 : 1234.567

    console.log("parseFloat(val_3) : ", parseFloat(val_3));
    // --> parseFloat(val_3) : 1234.567 

    this.document.getElementById("type_3").innerHTML = `<span style='color:blue;'> ${typeof(parseFloat(val_3))} </span>`;
    // --> number
//============================================================================================================================
    const val_4 = this.document.getElementById("val_4").innerText;
    console.log("확인용 val_4 : ", val_4);
    // --> 확인용 val_4 : 1234

    console.log("Number(val_4) : ", Number(val_4));
    // --> Number(val_4) : 1234 

    this.document.getElementById("type_4").innerHTML = `<span style='color:blue;'> ${typeof(Number(val_4))} </span>`;
    // --> number
//============================================================================================================================
    const val_5 = this.document.getElementById("val_5").innerText;
    console.log("확인용 val_5 : ", val_5);
    // --> 확인용 val_5 : 1234.567

    console.log("Number(val_5) : ", Number(val_5));
    // --> Number(val_5) : 1234.567

    this.document.getElementById("type_5").innerHTML = `<span style='color:blue;'> ${typeof(Number(val_5))} </span>`;
    // --> number
//============================================================================================================================
    const val_6 = this.document.getElementById("val_6").innerText;
    console.log("확인용 val_6 : ", val_6);
    // --> 확인용 val_6 : 안녕하세요

    this.document.getElementById("type_6").innerHTML = `<span style='color:blue;'> ${typeof(val_6)} </span>`;
    // --> string
//============================================================================================================================
    const sum = Number(this.document.getElementById("val_7").innerText) + Number(this.document.getElementById("val_8").innerText);
    console.log("typeof sum = ",typeof sum);
    // --> number
    
    this.document.getElementById("sum").innerHTML = `<span style='color:blue;'> ${sum} </span>`;
    // --> 50
    
    const sum_type = typeof(this.document.getElementById("sum").innerText);
    console.log("typeof sum_type = ",sum_type);
    // --> string 
    this.document.getElementById("val_8").innerHTML = sum_type;
    // 태그에 값을 넣고 태그에 넣어진 값을 다시 가져와서 타입을 확인 (web은 무조건 string임.)
//============================================================================================================================

    // this.document.getElementById("btn_10") 을 "이벤트 소스" 라고 부른다.
    // onclick을 "이벤트" 라고 부른다. 즉, 지금은 마우스 왼쪽 클릭 이벤트이다.
    // function(){}; 을 "이벤트 핸들러" 라고 부른다.

    this.document.getElementById("btn_10").onclick = function(){
/*        // == 와 === 차이점 
        // == 은 값만 비교하는것. 
        // === 은 데이터 타입 및 값 모두 비교함.

        let a = 10;
        let b = "10";

        if(a==b){
            alert("a의 값과 b의 값은 같습니다.");
        }
        if(a===b){
            alert("a 데이터 타입과 b 데이터 타입은 같으며, 또한 a 값과 b의 값은 같습니다.");
        }
*/    

        let val_9 = document.getElementById("val_9").value;     
        let val_10 = document.getElementById("val_10").value;     
        // val_9, val_10는 input 태그로 value 사용 

        document.getElementById("result_10").innerHTML = "";
        document.getElementById("result_11").innerHTML = "";
        document.getElementById("result_12").innerHTML = "";

        val_10 = Number(val_10);
        
        document.getElementById("type_9").innerHTML = ` ${val_9} => ${typeof val_9} `;
        document.getElementById("type_10").innerHTML = ` ${val_10} => ${typeof val_10} `;

        if(val_9 === val_10){
            document.getElementById("result_10").innerHTML = `${val_9}와 ${val_10}은 데이터타입 및 값이 같다.`
        }
        else if(val_9 == val_10){
            document.getElementById("result_11").innerHTML = `${val_9}와 ${val_10}은 데이터은 다르나, 값이 같다.`
        }
        else{
            document.getElementById("result_12").innerHTML = `${val_9}와 ${val_10}은 데이터 및 값이 다르다.`

        }
    };
//============================================================================================================================
    let val_13;
    //  자바스크립트에서 변수에 값을 넣지 않을 경우
    this.document.getElementById("type_13").innerHTML = `<span style='color:blue;'> ${typeof(val_13)} </span>`;
    // --> undefined 
    // 변수만 선언하고 값을 안넣어준 경우.
//============================================================================================================================
    // ===== !! 자바스크립트에서 사용되어지는 객체 사용법 - 1  !! =====

    // const person1 = new Object(); // 자바스크립트에서 말하는 빈 객체이다. 
    // 또는
    const person1 = {};                         // 자바스크립트에서 말하는 빈 객체이다. 
    person1.userid = "leess";                    // 객체에 새 속성을 추가하는 방법은 . 표기법이 있다. 즉, 객체명.속성명 = 값; 으로 한다. 
    person1.pwd = 'qwer1234$';                  // 객체에 새 속성을 추가하는 방법은 . 표기법이 있다. 즉, 객체명.속성명 = 값; 으로 한다. 
    person1["mobile phone"] ="010-5678-1234";    // 객체에 새 속성을 추가하는 방법은 대괄호 표기법이있다. 즉, 객체명[" "] = 값; 으로 한다.
    person1['name'] ="이순신";
    person1["age"] =25;

    this.document.getElementById("type_14").innerHTML =typeof person1;

    this.document.getElementById("val_15").innerHTML = person1.userid;
    this.document.getElementById("type_15").innerHTML = typeof person1.userid;
    
    this.document.getElementById("val_16").innerHTML = person1.pwd;    
    this.document.getElementById("type_16").innerHTML = typeof person1.pwd;
        
    this.document.getElementById("val_17").innerHTML = person1["mobile phone"];    
    this.document.getElementById("type_17").innerHTML = typeof person1["mobile phone"];
    
    this.document.getElementById("val_18").innerHTML = person1["name"];    
    this.document.getElementById("type_18").innerHTML = typeof person1.name;
    // 속성명에 공백이 없으므로, . 표기법으로 해도 무관하다. 

    this.document.getElementById("val_19").innerHTML = person1["age"];    
    this.document.getElementById("type_19").innerHTML = typeof person1.age;
    // 속성명에 공백이 없으므로, . 표기법으로 해도 무관하다. 
//============================================================================================================================
    // ===== !! 자바스크립트에서 사용되어지는 객체 사용법 - 2  !! =====
    // {속성명 : 값1, 속성명 : 값2, 속성명 : 값3;} 이 자바스크립트에서 말하는 객체이다. 
    const person2 = {userid : "eomjh"
                    , pwd : "qwer1234$"
                    , "mobile phone" : "010-3456-7788"
                    , 'name' : "엄정화"
                    , age : 27
    };
    // java에서는 {} 는 배열로 썼지만, script에서는 객체로 사용.

    this.document.getElementById("type_20").innerHTML =typeof person2;

    this.document.getElementById("val_21").innerHTML = person2.userid;
    this.document.getElementById("type_21").innerHTML = typeof person2.userid;
    
    this.document.getElementById("val_22").innerHTML = person2.pwd;    
    this.document.getElementById("type_22").innerHTML = typeof person2.pwd;
        
    this.document.getElementById("val_23").innerHTML = person2["mobile phone"];    
    this.document.getElementById("type_23").innerHTML = typeof person2["mobile phone"];
    
    this.document.getElementById("val_24").innerHTML = person2["name"];    
    this.document.getElementById("type_24").innerHTML = typeof person2.name;
    // 속성명에 공백이 없으므로, . 표기법으로 해도 무관하다. 

    this.document.getElementById("val_25").innerHTML = person2["age"];    
    this.document.getElementById("type_25").innerHTML = typeof person2.age;
    // 속성명에 공백이 없으므로, . 표기법으로 해도 무관하다. 

    

//============================================================================================================================
    // ===== !! 자바스크립트에서는 함수도 변수에 넣을 수 있다.  !! =====
    // 자바스크립트에서 함수를 선언하는 방법1 : 함수 표현식(Function Expression)
    const func_sum = function(num1, num2) {
        if(isNaN(num1)){
            alert("첫번째 입력값은 숫자이어야 함.");
            return;
        };
        if(isNaN(num2)){
            alert("두번째 입력값은 숫자이어야 함.");
            return;
        };

        return Number(num1) + Number(num2);
    };



    // ====== 함수 호출하기 =======
    const val_26 = this.document.getElementById("val_26").innerText; // "40"
    const val_27 = this.document.getElementById("val_27").innerText; // "50"

    document.getElementById("result_27").innerHTML = func_sum(val_26, val_27);

    document.getElementById("type_27").innerHTML = typeof func_sum;

//============================================================================================================================
    // ====== 함수 호출하기 =======
    const val_28 = this.document.getElementById("val_28").innerText; // "60"
    const val_29 = this.document.getElementById("val_29").innerText; // "70"
  
    document.getElementById("result_29").innerHTML = func_minus(val_28, val_29);



//============================================================================================================================
    // === "화살표 함수" 란?
    // ES6(ECMAScript 6)에서 처음으로 소개된 것으로써 화살표(=>)를 사용하여 함수를 선언하는 방법이다. 
    // 다른말로 람다 표현식(lambda expression)이라고 부른다.
    // 이것은 function 과 return 을 생략하기 위해서 개발한 것이다.

    const func_multiply_1 = (num1, num2) => {
        if(isNaN(num1)){
            alert("첫번째 입력값은 숫자이어야 함.");
            return;
        };
        if(isNaN(num2)){
            alert("두번째 입력값은 숫자이어야 함.");
            return;
        };
        return Number(num1) * Number(num2);
    };

    const func_multiply_2 = (num1, num2) => { return Number(num1) * Number(num2) };
    const func_multiply_3 = (num1, num2) => Number(num1) * Number(num2);
    // 함수의 내용물이 return 만 있을경우 {}와 return을 생략할 수 있다. 

    const func_multiply_4 = num => Number(num) * 5;
    // 매개변수가 1개만 있을 경우 {} 생략 가능.
    
    const func_multiply_5 = () => {return 200};
    // 매개변수가 없을 경우에는 ()를 사용해야 하며, return 이 있을 경우 {}를 사용해야한다.

    const n1 = Number(document.getElementById("val_30").innerText); // 20 
    const n2 = Number(document.getElementById("val_31").innerText); // 30 

    document.getElementById("result_32").innerHTML = func_multiply_1(n1, n2);
    document.getElementById("result_33").innerHTML = func_multiply_1(n1, n2);
    document.getElementById("result_34").innerHTML = func_multiply_1(n1, n2);
    document.getElementById("result_35").innerHTML = n1 * func_multiply_4(1);
    document.getElementById("result_36").innerHTML = func_multiply_5();
    
    document.getElementById("type_37").innerHTML = typeof func_multiply_4;

//============================================================================================================================

const val_32 = this.document.getElementById("val_32").innerText; // "10"
const num_val_32 = Number(this.document.getElementById("val_32").innerText); // 10

this.document.getElementById("result_37").innerHTML = (val_32 == num_val_32);
this.document.getElementById("result_38").innerHTML = (val_32 === num_val_32);

this.document.getElementById("type_38").innerHTML = typeof  (val_32 == num_val_32);


}// ===== EoP window.onload = function() =====


// 자바스크립트에서 함수를 선언하는 방법2 : 함수 선언식(Function declaration)
function func_minus(num1, num2) {

    if(isNaN(num1)){
        alert("첫번째 입력값은 숫자이어야 함.");
        return;
    };
    if(isNaN(num2)){
        alert("두번째 입력값은 숫자이어야 함.");
        return;
    };
    
    return Number(num1) - Number(num2);
}; // ===== EoP func_minus(num1, num2) =====