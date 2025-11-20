function func_1() {
    var num1 = 10; // num1은 10임 
    var num2 = 20;
    {
        var num1 = 30;
    }
    var sum = num1 + num2;
    //  50  =  30  +  20 

    document.getElementById("span1").innerHTML = sum; //50
}// ===== Eop function func_1() ======



function func_2() {
    const num1 = 10; // num1은 10임 
    const num2 = 20;
    {
        const num1 = 30;

        const sum = num1+num2
         document.getElementById("span2-1").innerHTML = sum; //50
    }
    // const는 { } 내에서만 작동하고, 끝나면 소멸되기에, 
    // { } 내외는 다른 변수임. 

    sum = num1 + num2;
    //  50  =  30  +  20 

    document.getElementById("span2-2").innerHTML = sum; //30


// { } block 속에 선언된 const num1 은 { } 내에서만 사용가능한 것이며, 
// { } 을 벗어나는 순간 자동적으로 소멸 되어진다. 
// 그러므로 { } 내에서는 새로 선언이 가능하다.!! 
}// ===== Eop function func_2() ======


function func_3() {
    let num1 = 10; // num1은 10임 
    let num2 = 20;
    {
        let num1 = 30;

        let sum = num1-num2
        document.getElementById("span3-1").innerHTML = sum; //10
    }
    // const는 { } 내에서만 작동하고, 끝나면 소멸되기에, 
    // { } 내외는 다른 변수임. 

    sum = num1 - num2;
    //  50  =  30  +  20 

    document.getElementById("span3-2").innerHTML = sum; //-10


// { } block 속에 선언된 const num1 은 { } 내에서만 사용가능한 것이며, 
// { } 을 벗어나는 순간 자동적으로 소멸 되어진다. 
// 그러므로 { } 내에서는 새로 선언이 가능하다.!! 
}// ===== Eop function func_3() ======


function func_4() {
    const num1 = 10; // num1 은 10임
    // let num1 = 20;
    //  블록 범위 변수 'num1'을(를) 다시 선언할 수 없습니다.ts(2451)

    let num2 = 20;
    // const num2 = 20;
    // 블록 범위 변수 'num2'을(를) 다시 선언할 수 없습니다.ts(245


    num2 += num1;   // num2 = num2 + num1;
                    // num2는 let 이므로 값을 할당한 후 재할당이 가능하다.
    
    //num1 += num2;   // num1 = num1 + num2;
                    // num1은 const로 값을 할당한 이후 재할당이 불가능.

    document.getElementById("span4").innerHTML = num2; //30

}// ===== Eop function func_4() ======