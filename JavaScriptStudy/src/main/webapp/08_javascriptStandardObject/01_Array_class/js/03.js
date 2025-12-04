window.onload = function(){
// === Array.from() === //
// ES6에 새로 도입된 메소드로서 유사 배열 객체나 반복 가능한 객체를 실제 배열로 변환시켜주는 것이다.
    const li_list = document.querySelectorAll('div[id="div_fruit"] > ul:first-child > li')
    console.log("li_list => ", li_list)     
    // li_list =>  NodeList(4) 
    
    // **** Array.from(유사배열객체) ****
    const li_arr = Array.from(li_list); // 유사 배열객체인 li_list를 배열로 바꾸어준다. 
    console.log(li_arr);
    // ->(4) [li, li, li, li]

    const fruitName_arr = li_arr.map(elmt => elmt.innerText);
    console.log(fruitName_arr);
    // -->(4) ['사과', '딸기', '수박', '참외']

    console.log(fruitName_arr.join(", "));
    // --> 사과, 딸기, 수박, 참외

    document.querySelector('div[id="fruit_hangul"]').innerHTML = fruitName_arr.join(", ");
// ============================================================================================
    // *** Array.from(유사배열객체 , map()메소드와 비슷한 1:1 매핑 시켜주는 함수정의) *** //
    const li_list2 = document.querySelectorAll('div[id="div_fruit"] > ul:last-child > li')
    
    const fruitName2_arr = Array.from(li_list2, function(elmt, index, array){
                                                        // elmt는 유사 배열객체를 배열로 바꾼거. 즉, 배열요소인 li 이다.
        return elmt.innerText;// <-- function(elmt, index, array)
    });

    console.log(fruitName2_arr)
    //(4) ['apple', 'strawberry', 'watermelon', 'melon']

    document.querySelector('div[id="fruit_english"]').innerHTML = fruitName2_arr.join(", ");

// ============================================================================================
    // 위와 같음. 
    const fruitName3_arr = Array.from(li_list2, elmt => elmt.innerText);
    console.log(fruitName3_arr);
    // --> (4) ['apple', 'strawberry', 'watermelon', 'melon']
    document.querySelector('div[id="fruit_english2"]').innerHTML = fruitName3_arr.join(", ");


// ============================================================================================
    // ==== td 태그에 나열된 점수를 가져와서 합계 및 평균 구하기 시작 ==== //
    const td_list = document.querySelectorAll('table[id="tbl"] > tbody > tr > td:last-child')
    console.log(td_list);
    //NodeList(5) [td, td, td, td, td]

    const point_arr = Array.from(td_list, elmt => Number(elmt.innerText));
    console.log(point_arr)
    //  [90, 100, 50, 70, 80]

    let sum = 0;
    point_arr.forEach(item => {sum+=item});
    console.log(sum);
    // --> 390 

    document.querySelector('table[id="tbl"] > tfoot > tr:first-child > td:last-child').innerHTML = sum;


    document.querySelector('table[id="tbl"] > tfoot > tr:last-child > td:last-child').innerHTML = sum/point_arr.length;

    // ==== td 태그에 나열된 점수를 가져와서 합계 및 평균 구하기 끝 ==== //



    const arr_member = [{userid:"leess",  passwd:"qwer1234$", name:"이순신", age:25},
                     {userid:"eomjh",  passwd:"qwer1234$", name:"엄정화", age:47},
                     {userid:"seokj",  passwd:"qwer1234$", name:"서강준", age:23},
                     {userid:"sunsin", passwd:"qwer1234$", name:"이순신", age:38},
                     {userid:"youks",  passwd:"qwer1234$", name:"유관순", age:24}];

    let html = `<table>
                  <thead>
                    <tr>
                      <th>아이디</th>
                      <th>암호</th>
                      <th>성명</th>
                      <th>나이</th>
                    </tr>
                  </thead>    
                  <tbody>`;
    let isFind = false;


    arr_member.forEach(item => {
        if(item.name == '이순신'){
            html += `<tr>
                        <th>${item.userid}</th>
                        <th>${item.passwd}</th>
                        <th>${item.name}</th>
                        <th>${item.age}</th>
                    </tr>`;
            isFind = true;
        }
    });
    if(!isFind){
        html += `<tr>
                    <th colspan='4'>데이터가 없습니다.</th>
                </tr>`;
    }

    html += `</tbody></tabel>`
    
    document.querySelector('div[id="quiz"]').innerHTML = html;

    //===========================================================================
        const arr_result = [];

    arr_member.forEach(item => {if(item.name == '이순신') arr_result.push(item);});

    let html2 = `<table>
                  <thead>
                    <tr>
                      <th>아이디</th>
                      <th>비밀번호</th>
                      <th>성명</th>
                      <th>나이</th>
                    </tr>
                  </thead>    
                  <tbody>`;

    if(arr_result.length > 0) {
        arr_result.forEach(item => {
            html2 += `<tr>
                       <td>${item.userid}</td>
                       <td>${item.passwd}</td>
                       <td>${item.name}</td>
                       <td>${item.age}</td>
                     </tr>`;
        });
    }   
    else {
        html2 += `<tr>
                    <td colspan='4'>데이터가 존재하지 않습니다</td>
                 </tr>`;
    }           

    html2 += `</tbody>
           </table>`;

    document.querySelector('div[id="quiz2"]').innerHTML = html2;


    // ---- **** 배열명.find() **** ----
    // ES6에서 새로 도입된 메소드로서 판별함수의 조건에 만족하는 배열요소가 있으면 첫번째 배열요소를 리턴 시켜주고 끝내고, 
    // 판별함수의 조건에 만족하는 배열요소가 없으면 undefinded

    const searchMember = arr_member.find(function(item, index, array){
                            // item은 필수. index, array는 선택사항(생략가능)
                            if(item.name == "이순신"){
                                return item;
                            }
    });
    console.log(searchMember);
    // --> {userid: 'leess', passwd: 'qwer1234$', name: '이순신', age: 25}



    //   === !!!! 암기  배열명.find() 은 고유한 값(primary key / unique)으로 검색할 때 사용한다. !!! ===
    const searchMember2 = arr_member.find(item => {if(item.userid == "leess") return item});
    console.log(searchMember2);
    // --> {userid: 'leess', passwd: 'qwer1234$', name: '이순신', age: 25}


    // ---- **** 배열명.filter() **** ----
    // 판별함수의 조건에 만족하는 배열요소가 있으면 모든 배열요소를 담은 배열로 리턴 시켜주고,
    // 판별함수의 조건에 만족하는 배열요소가 없으면 빈배열 [] 을 리턴시켜준다.
    const searchMember3 = arr_member.filter(item => {if(item.name.trim() == "이순신") return item});
    console.log(searchMember3);
// (2) [{…}, {…}]
// 0: {userid: 'leess', passwd: 'qwer1234$', name: '이순신', age: 25}
// 1: {userid: 'sunsin', passwd: 'qwer1234$', name: '이순신', age: 38}
// length: 2
// [[Prototype]]: Array(0)
    let html3 = `<table>
                  <thead>
                    <tr>
                      <th>아이디</th>
                      <th>암호</th>
                      <th>이름</th>
                      <th>나이</th>
                    </tr>
                  </thead>    
                  <tbody>`;

    if(searchMember2.length > 0) {
        arr_result.forEach(item => {
            html3 += `<tr>
                       <td>${item.userid}</td>
                       <td>${item.passwd}</td>
                       <td>${item.name}</td>
                       <td>${item.age}</td>
                     </tr>`;
        });
    }   
    else {
        html3 += `<tr>
                    <td colspan='4'>데이터가 존재하지 않습니다</td>
                 </tr>`;
    }           

    html3 += `</tbody>
           </table>`;

    document.querySelector('div[id="quiz3"]').innerHTML = html3;

//===============================================================================
    // ---- **** 배열명.findIndex() **** ----
    // ES6에서 새로 도입된 메소드로서 판별함수의 조건에 만족하는 배열요소가 있으면 첫번째 배열요소의 인덱스번호만 리턴 시켜주고 끝내고, 
    // 판별함수의 조건에 만족하는 배열요소가 없으면 -1 이 나온다.

    // ==> 배열 arr_member 에서 나이가 20대인 회원의 배열인덱스번호를 출력시켜보자. <== // 
    //  20  ==> 2               21  ==> 2                   27  ==>   2                 29  ==> 2
    //  20/10==>2               21/10==>2.1                 27/10==>2.7                 29/10==>2.9
    //  Math.floor(2)==>2       Math.floor(2.1)==>2         Math.floor(2.7)==>2         Math.floor(2.9)==>2
    //  Math.floor(20/10)==>2   Math.floor(21/10)==>2       Math.floor(27/10)==>2       Math.floor(29/10)==>2
    // parseInt("2.9")==> 2     parseInt("2.9")==>2

    // ==== 숫자를 문자열로 변환하기 ====
    // String(숫자)
    // 또는 
    // 숫자.toString()

    let idx = arr_member.findIndex(item => Math.floor(item.age/10)==2);
    console.log(idx);
    // --> 0

    // === !!!! 암기  배열명.findIndex() 은 고유한 값(primary key)으로 검색할 때 사용한다. !!! === // 
    idx = arr_member.findIndex(item => item.userid =="seokj");
    console.log(idx);
    // --> 2


    idx = arr_member.findIndex(item => item.userid =="saaa");
    console.log(idx);
    // --> -1 

    // === 배열 arr_member 에 저장된 회원들 중에서 userid 가 "seokj" 인 회원의 정보를 아래와 같이 나타내세요 === //
    const index = arr_member.findIndex(item => item.userid =="seokj");
    let html4 = `<table>
                <thead>
                <tr>
                    <th>아이디</th>
                    <th>암호</th>
                    <th>이름</th>
                    <th>나이</th>
                </tr>
                </thead>    
                <tbody>`;
    if(index != -1){
        html4 += `<tr>
                       <td>${arr_member[index].userid}</td>
                       <td>${arr_member[index].passwd}</td>
                       <td>${arr_member[index].name}</td>
                       <td>${arr_member[index].age}세.</td>
                     </tr>`;
    }
    else{
        html4 += `<tr>
                    <td colspan='4'>데이터가 존재하지 않습니다</td>
                 </tr>`;
    }
    document.querySelector('div[id="quiz4"]').innerHTML = html4;

//===============================================================================
    // ---- **** 배열명.some() **** ----
    // 배열명에서 판별함수의 조건에 만족하는 배열요소가 하나라도 있으면 true 를 리턴 시켜주고 조건검사를 중지한다.
    // 배열명에서 판별함수의 조건에 만족하는 배열요소가 하나라도 없으면 false 를 리턴 시켜준다.
   
    arr_member.push({userid:"teen", 
                    passwd:"qwer1234$", 
                    name:"나어려", 
                    age:12});
        
    let bool = arr_member.some(item => item.age < 20);
    console.log(bool)
    // true

    if(arr_member.some(item => item.age < 20)){
        console.log("회원중에 20대 미만 회원이 존재합니다. ")
    }
    else{
        console.log("모든 회원이 20세 이상입니다.")
    }



    // ---- **** 배열명.every() **** ----
    // 배열명에서 판별함수의 조건에 만족하는 배열요소가 하나라도 없으면 false 를 리턴 시켜주고 조건검사를 중지한다.
    // 배열명에서 판별함수의 조건에 만족하는 배열요소가 모두 존재해야만 true 를 리턴 시켜준다.
    bool = arr_member.every(item => item.age >= 10);
    console.log(bool);
    //true 
    bool = arr_member.every(item => item.age >= 30);
    console.log(bool);
    //false

    if(arr_member.every(item => item.age >= 10)){
        console.log("모든 회원들의 나이가 10세 이상입니다.")
    }
    else{
        console.log("회원중 나이가 10세 이하가 있습니다.")
    }






}// ===== EoP window.onload =====
