window.onload = function() { 
    // ====== 1. 자바스크립트에서 배열은 아래와 같이 나타낸다. ======
    // const arr_fruit1 = new Array(); // 배열도 객체이다.(new 를 해옴.)
    // 또는 
    const arr_fruit1 = []; // 생략하고, 일반적으로는 이렇게 사용함. 

    let len = arr_fruit1.push("사과"); // 배열명.push() : 배열의 마지막에 새로운 요소를 추가한 후, 변경된 배열의 길이를 리턴시켜줌.
    len = arr_fruit1.push("딸기");
    len = arr_fruit1.push("메론");
    len = arr_fruit1.push("참회");
    len = arr_fruit1.push("수박");

    console.log("1. arr_fruit1 배열 길이", arr_fruit1.length );
    // --> 1. arr_fruit1 배열 길이 5 

    console.log("2. 변수 len의 값.", len );
    // --> 2. 변수 len의 값. 5 


    // ====== 자바스크립트에서 사용되는 for 문. ======
    let html_1 = `<ol>`;
    for(let i=0; i<arr_fruit1.length; i++){
        html_1 += `<li>${arr_fruit1[i]}</li>`;
    }
    html_1 += `</ol>`;

    document.querySelector("div[id='fruitDisplay1']").innerHTML = html_1;
    // 또는 
    //document.querySelector("div#fruitDisplay1").innerHTML = html_1;

    //-----------------------------------------------------------------------------------------------------------------------------
    let html_2 = `<ol>`;
    for(let i=0; i<arr_fruit1.length; i++){
        html_2 += `<li>${arr_fruit1[i]}</li>`;
    }
    html_2 += `</ol>`;

    document.querySelector("div#fruitDisplay2").innerHTML = html_2;


    //-----------------------------------------------------------------------------------------------------------------------------
    let html_3 = `<ol>`;
    for(let item of arr_fruit1){// [참고] for ... of 는 배열값을 가져올때 사용하는 것이고,  for ... in 은 객체의 속성목록을 가져올때 사용하는 것이다. 
                                    // 배열도 객체인데 배열의 속성은 바로 인덱스번호 이다. 그래서 of 대신에 in 을 사용하면 배열요소의 인덱스번호가 나온다.
        html_3 += `<li>${item}</li>`;
    }
    html_3 += `</ol>`;
    document.querySelector("div#fruitDisplay3").innerHTML = html_3;



    //-----------------------------------------------------------------------------------------------------------------------------
    // 배열명.forEach(function(item, index, array){});
    /*
        item : 현재 처리 중인 배열의 각 요소 
        index : (선택) 처리 중인 요소의 인덱스 
        array : (선택) forEach()가 적용되고 있는 배열 
    */
    let html_4 = `<ol>`;
    arr_fruit1.forEach(function(item, index, array){
        html_4 += `<li>${item}</li>`;
    });
    html_4 += `</ol>`;
    document.querySelector("div#fruitDisplay4").innerHTML = html_4;

    //-----------------------------------------------------------------------------------------------------------------------------
    let html_5 = `<ol>`;
    arr_fruit1.forEach(function(item, index, array){
        html_5 += `<li>${array[index]}</li>`;
    });
    html_5 += `</ol>`;
    document.querySelector("div#fruitDisplay5").innerHTML = html_5;


    //-----------------------------------------------------------------------------------------------------------------------------
    let html_6 = `<ol>`;
    arr_fruit1.forEach((item) => {          // function을 없애고 람다로 생략
        html_6 += `<li>${item}</li>`;
    });
    html_6 += `</ol>`;
    document.querySelector("div#fruitDisplay6").innerHTML = html_6;




    //-----------------------------------------------------------------------------------------------------------------------------
    let html_7 = `<ol>`;
    arr_fruit1.forEach(item => {            // 파라미터가 하나라면 소괄호 생략
        html_7 += `<li>${item}</li>`;
    });
    html_7 += `</ol>`;
    document.querySelector("div#fruitDisplay7").innerHTML = html_7;


    //-----------------------------------------------------------------------------------------------------------------------------
    let html_8 = `<ol>`;
    arr_fruit1.forEach(item => html_8 += `<li>${item}</li>` );       // 처리해야할 내용이 1개 밖에없으면 { } 생략가능.
    html_8 += `</ol>`;
    document.querySelector("div#fruitDisplay8").innerHTML = html_8;





    //-----------------------------------------------------------------------------------------------------------------------------

    // ====== 2. 자바스크립트에서 배열은 아래와 같이 나타낸다. ======
    const arr_fruit = ["사과", "딸기", "메론", "참외", "수박"]; 

    let html = `<ol>`
    arr_fruit.forEach(item => html += `<li>${item}</li>`);
    html += `</ol>`;

    document.querySelector("div#fruitDisplay9").innerHTML = html;


    //-----------------------------------------------------------------------------------------------------------------------------
    // ======== 과일을 맨 마지막에 추가하기[push()] 시작 ======== //
    document.querySelector('button[id="btn_last_add"]').onclick = function(){
        const addVal = document.querySelector('input[id="addVal"]').value;

        if(addVal.trim() == ""){ // "문자열".trim()은 문자열의 좌,우의 공백이 있으면 좌,우 공백을 모두 제거해주는 것이다.
            alert("경고 : 과일명을 입력.")
            document.querySelector('input[id="addVal"]').value = "";
            document.querySelector('input[id="addVal"]').focus();
            return;
        }

        arr_fruit.push(addVal.trim()); // 배열명.push() : 배열의 마지막에 새로운 요소를 추가한 후, 변경된 배열의 길이를 리턴시켜줌.
        // console.log(arr_fruit);  --> ['사과', '딸기', '메론', '참외', '수박', '키위키위', '키위위', '키위위'] 
    
        func_view_1(arr_fruit, document.querySelector('div[id="fruitDisplay"]'));
        document.querySelector('input[id="addVal"]').value = "";
        document.querySelector('input[id="addVal"]').focus();
    }
    // ===== Function Expression(함수 표현식) ===== // 
    const func_view_1 = function(arr, displayid) { 
        let html = `<ol>`;
        for(let item of arr ){
            html += `<li>${item}</li>`;
        }
        html += `</ol>`;

        displayid.innerHTML = html;
    };
    // ======== 과일을 맨 마지막에 추가하기[push()] 끝 ======== //



    // ======== 과일을 맨 처음에 추가하기[unshift()] 시작 ======== //
    document.querySelector('button[id="btn_first_add"]').onclick = function(){
        const addVal = document.querySelector('input[id="addVal"]').value;

        if(addVal.trim() == ""){ // "문자열".trim()은 문자열의 좌,우의 공백이 있으면 좌,우 공백을 모두 제거해주는 것이다.
            alert("경고 : 과일명을 입력.")
            document.querySelector('input[id="addVal"]').value = "";
            document.querySelector('input[id="addVal"]').focus();
            return;
        }

        arr_fruit.unshift(addVal.trim()); // 배열명..unshift() : 배열의 처음에 새로운 요소를 추가한 후, 변경된 배열의 길이를 리턴시켜줌.
        // console.log(arr_fruit);  --> ['사과', '딸기', '메론', '참외', '수박'] 
        func_view_1(arr_fruit, document.querySelector('div[id="fruitDisplay"]'));
        document.querySelector('input[id="addVal"]').value = "";
        document.querySelector('input[id="addVal"]').focus();
    }
    // ======== 과일을 맨 처음에 추가하기[unshift()] 끝 ======== //



    // ======== 과일을 배열의 특정 위치에 추가하기 추가하기[splice()] 시작 ======== //
    // 배열명.splice() : 배열의 특정 위치에 배열 요소를 추가하거나 삭제하는데 사용한다. 
    //                  삭제할 경우 리턴값은 삭제한 배열 요소이다. 삭제한 요소가 없으면 빈 배열( [] )을 반환한다.

    /*
        // 배열명.splice(start, 0, element);  // 배열의 특정 위치에 배열 요소를 추가하는 경우 
            start   - 수정할 배열 요소의 인덱스
            0       - 요소를 추가할 경우
            element - 배열에 추가될 요소

        // 배열명.splice(start, deleteCount); // 배열의 특정 위치의 배열 요소를 삭제하는 경우    
            start   - 수정할 배열 요소의 인덱스
            deleteCount - 삭제할 요소 개수
    */
    document.querySelector('button[id="btn_special_add"]').onclick = function(){
    
        console.log(arr_fruit);
        // -->(5) ['사과', '딸기', '메론', '참외', '수박']

        arr_fruit.splice(2, 0, "밤","감","대추");

        console.log(arr_fruit);
        // -->(5) ['사과', '딸기', '밤', '감', '대추', '메론', '참외', '수박']

    };
    // ======== 과일을 배열의 특정 위치에 추가하기 추가하기[splice()] 끝 ======== //




    // ========배열의 맨 마지막 요소 삭제하기[pop()] 시작 ======== //
    document.querySelector('button[id="btn_last_del"]').onclick = function(){
        const deleted_item =  arr_fruit.pop();
        
        if(deleted_item != undefined){
            alert(`배열 arr_fruit 에서 ${deleted_item} 을(를) 삭제했습니다.`)
        }
        else{
            alert(`더이상 삭제할 요소가 없습니다.`)
        }

        console.log("deleted_item => ", deleted_item)

        func_view_1(arr_fruit, document.querySelector('div[id="fruitDisplay"]'));
    };
    // ========배열의 맨 마지막 요소 삭제하기[pop()] 끝 ======== //








    // ========배열의 맨 처음 요소 삭제하기[shift()] 시작 ======== //
    document.querySelector('button[id="btn_first_del"]').onclick = function(){
        const deleted_item =  arr_fruit.shift();
        
        if(deleted_item != undefined){
            alert(`배열 arr_fruit 에서 ${deleted_item} 을(를) 삭제했습니다.`)
        }
        else{
            alert(`더이상 삭제할 요소가 없습니다.`)
        }

        console.log("deleted_item => ", deleted_item)

        func_view_1(arr_fruit, document.querySelector('div[id="fruitDisplay"]'));
    
    };
    // ========배열의 맨 처음 요소 삭제하기[shift()] 끝 ======== //









    // ========배열의 특정 위치에있는 요소 삭제하기[splice()] 시작 ======== //
    // 배열명.splice() : 배열의 특정 위치에 배열 요소를 추가하거나 삭제하는데 사용한다. 
    //                  삭제할 경우 리턴값은 삭제한 배열 요소이다. 삭제한 요소가 없으면 빈 배열( [] )을 반환한다.

    /*
        // 배열명.splice(start, 0, element);  // 배열의 특정 위치에 배열 요소를 추가하는 경우 
            start   - 수정할 배열 요소의 인덱스
            0       - 요소를 추가할 경우
            element - 배열에 추가될 요소

        // 배열명.splice(start, deleteCount); // 배열의 특정 위치의 배열 요소를 삭제하는 경우    
            start   - 수정할 배열 요소의 인덱스
            deleteCount - 삭제할 요소 개수
    */
    document.querySelector('button[id="btn_special_del"]').onclick = function(){
        
        console.log(arr_fruit);
        // --> (5) ['사과', '딸기', '메론', '참외', '수박']


        const deleted_item = arr_fruit.splice(1,3);

        console.log(deleted_item);
        // --> ['딸기', '메론', '참외']  

        if(deleted_item.length > 0){
            let msg = ``;
            deleted_item.forEach(item=> msg += item);
            alert(`${msg}를 삭제했습니다.`);
        }
        else{
            alert('사과 다음에 나오는 과일이 없어 삭제가 불가.')
        }
        func_view_1(arr_fruit, document.querySelector('div[id="fruitDisplay"]'));

    };
    // ========배열의 특정 위치에있는 요소 삭제하기[splice()] 끝 ======== //

    // ======== 배열의 요소를 역순으로 만들기 [배열명.reverse()] 시작 ======== //
    document.querySelector('button[id="btn_reverse"]').onclick = function() {
        arr_fruit.reverse();
        // 배열명.reverse() 는 배열의 요소를 뒤집어 역순으로 만들어 준다.

        func_view_1(arr_fruit, document.querySelector('div[id="fruitDisplay"]'));
    };
    // ======== 배열의 요소를 역순으로 만들기 [배열명.reverse()] 끝 ======== //




    // ======== 배열의 요소를 오름차순으로 만들기 [배열명.sort()] 시작 ======== //
    document.querySelector('button[id="btn_sort"]').onclick = function() {
        arr_fruit.sort();
        // 배열명.sort() 는 배열의 요소를 "문자열로 변환" 한 후 오름차순으로 정렬한다. 

        func_view_1(arr_fruit, document.querySelector('div[id="fruitDisplay"]'));
    };
    // ======== 배열의 요소를 오름차순으로 만들기 [배열명.sort()] 시작 ======== //



    // ======== 배열의 요소를 내림차순으로 만들기 [배열명.sort().reverse()] 시작 ======== //
    document.querySelector('button[id="btn_sort_reverse"]').onclick = function() {
        arr_fruit.sort().reverse();
        // 배열명.sort() 는 배열의 요소를 "문자열로 변환" 한 후 내림차순으로 정렬한다. 

        func_view_1(arr_fruit, document.querySelector('div[id="fruitDisplay"]'));
    };
    // ======== 배열의 요소를 내림차순으로 만들기 [배열명.sort().reverse()] 시작 ======== //



    // ===== 숫자배열 ===== //
     const num_arr = [10, 1, 50, 11, 109, 1004, 20];

     // === 배열명.join("구분문자"); === //
    /*  배열명.join("구분문자"); 는 구분문자를 사용해서 배열을 하나의 문자열로 만들어 반환해주는 것이다.
        만약에 "구분문자"를 지정해주지 않으면 즉, 배열명.join(); 으로 하면 구분문자는 자동적으로 콤마(,)로 되어진다. */

//----------------------------------------------------------------------------------------------------------------------------------------------
    let str_num = num_arr.join(" / ");

    console.log("typeof num_arr => ",typeof num_arr)

    console.log("typeof str_num => ",typeof str_num)

    str_num = num_arr.join();  // num_arr.join();은 num_arr.join(","); 와 같은것이다. 
    console.log("str_num =>", str_num);
    // str_num => 10,1,50,11,109,1004,20

    document.querySelector('div[id="number_display"]').innerHTML = str_num;




    // ===== 숫자로 되어진 배열의 요소를 오름차순으로 정렬하기(틀린것) 시작 ===== //
    document.querySelector('button[id="btn_asc_sort_number_fail"]').onclick = function() {
        const str_num_data = document.querySelector('div[id="number_display"]').innerText;
        // console.log(str_num_data);
        // --> 10,1,50,11,109,1004,20

        const arr_num_data = str_num_data.split(',');
        // console.log(arr_num_data);
        // --> (7) ['10', '1', '50', '11', '109', '1004', '20']

        // arr_num_data.sort();
        // console.log(arr_num_data);
        // --> (7) ['1', '10', '1004', '109', '11', '20', '50']

        // console.log(arr_num_data.sort().join(","));
        // --> 1,10,1004,109,11,20,50

        document.querySelector('div[id="number_sort_display"]').innerHTML = arr_num_data.sort().join(",");
        // 배열명.sort() 는 배열의 요소를 문자열로 변환한 후 오름차순으로 정렬한다.
        // 현재 배열의 요소의 타입이 숫자이므로 배열명.sort()를 해버리면 숫자를 문자열로 변환시켜 버리므로
        // ["10","1","50","11","109","1004","20"] 으로 되어진 후 오름차순 정렬시키므로
        // ["1","10","1004","109","11","20","50"] 으로 된다.
        // 그런다음에 하나의 문자열로 합쳐서 보여주므로 
        // 1 , 10 , 1004 , 109 , 11 , 20 , 50 으로 보여지게 된다.
    };
    // ===== 숫자로 되어진 배열의 요소를 오름차순으로 정렬하기(틀린것) 끝 ===== //




    // ===== 숫자로 되어진 배열의 요소를 오름차순으로 정렬하기(올바른것) 시작 ===== //
    document.querySelector('button[id="btn_asc_sort_number_success"]').onclick = function() {
        const str_num_data = document.querySelector('div[id="number_display"]').innerText;
        // console.log(str_num_data);
        // --> 10,1,50,11,109,1004,20

        const arr_num_data = str_num_data.split(',');
        // console.log(arr_num_data);
        // --> (7) ['10', '1', '50', '11', '109', '1004', '20']

        // console.log(arr_num_data.sort(function(a,b) {return a-b;}));
        // --> (7) ['1', '10', '11', '20', '50', '109', '1004']

        // 배열요소가 숫자인 경우 문자열이 아닌 숫자로 오름차순 정렬하고자 하고자 한다라면 sort() 괄호 속에 
        // function(a,b){return a-b;} 을 넣어줌으로써 해결해준다.
        // return a-b; 의 결과값이 음수 이라면  a 가 낮은 인덱스로 정렬된다.
        // return a-b; 의 결과값이  0 이라면  a 와 b 의 순서는 바뀌지 않는다.
        // return a-b; 의 결과값이 양수 이라면  b 가 낮은 인덱스로 정렬된다.

        //console.log(arr_num_data.sort(function(a,b) {return a-b;}).join(","));
        // --> 1,10,11,20,50,109,1004
        document.querySelector('div[id="number_sort_display"]').innerHTML = arr_num_data.sort(function(a,b) {return a-b;}).join(",");
    };
    // ===== 숫자로 되어진 배열의 요소를 오름차순으로 정렬하기(올바른것) 끝 ===== //




    // ===== 숫자로 되어진 배열의 요소를 내림차순으로 정렬하기(올바른것) 시작 ===== //
    document.querySelector('button[id="btn_desc_sort_number_success"]').onclick = function() {
        const str_num_data = document.querySelector('div[id="number_display"]').innerText;

        const arr_num_data = str_num_data.split(',');
        document.querySelector('div[id="number_sort_display"]').innerHTML = arr_num_data.sort(function(a,b) {return b-a;}).join(",");
    };
    // ===== 숫자로 되어진 배열의 요소를 내림차순으로 정렬하기(올바른것) 끝 ===== //




    document.querySelector('button[id="btn_name_sort_asc"]').onclick = function() {
        const str_name_data = document.querySelector('div[id="irum"]').innerText;
        const arr_name_data = str_name_data.split(',');
        // console.log(arr_name_data.sort());
        // 배열명.sort() 는 배열의 요소를 "문자열로 변환" 한 후 오름차순으로 정렬한다. 

        document.querySelector('div[id="irum_sort_result"]').innerHTML = arr_name_data.sort().join(",");
    };

    document.querySelector('button[id="btn_name_sort_desc"]').onclick = function() {
        const str_name_data = document.querySelector('div[id="irum"]').innerText;
        const arr_name_data = str_name_data.split(',');
        // console.log(arr_name_data.sort());
        // 배열명.sort() 는 배열의 요소를 "문자열로 변환" 한 후 오름차순으로 정렬한다. 

        document.querySelector('div[id="irum_sort_result"]').innerHTML = arr_name_data.sort().reverse().join(",");
    };


    // ===== 퀴즈 - 1시작 ===== //
    document.querySelector('button[id="btn_food_list_1"]').onclick = function() {
        const str_food_data = document.querySelector('div[id="food"]').innerText;
        const arr_food_data = str_food_data.split(',');
        
        result = `<ol>`;
        for(let i=0; i<arr_food_data.length; i++){
            result += `<li>${arr_food_data[i]}</li>`;
        }
        result += `</ol>`

        document.querySelector('div[id="food_list"]').innerHTML = result;
    };



    document.querySelector('button[id="btn_food_clear"]').onclick = function() {
        document.querySelector('div[id="food_list"]').innerHTML = "";
    };




    document.querySelector('button[id="btn_food_list_3"]').onclick = function() {
        const str_food_data = document.querySelector('div[id="food"]').innerText;
        
        let arr_food_data = str_food_data.split(',');
        arr_food_data = arr_food_data.slice(1,6);


        result = `<ol>`;
        for(let i=0; i<arr_food_data.length; i++){
            result += `<li>${arr_food_data[i]}</li>`;
        }
        result += `</ol>`

        document.querySelector('div[id="food_list"]').innerHTML = result;
    };


    document.querySelector('button[id="btn_food_list_4"]').onclick = function() {
        const str_food_data = document.querySelector('div[id="food"]').innerText;
        
        let arr_food_data = str_food_data.split(',');
        arr_food_data = arr_food_data.slice(1);


        result = `<ol>`;
        for(let i=0; i<arr_food_data.length; i++){
            result += `<li>${arr_food_data[i]}</li>`;
        }
        result += `</ol>`

        document.querySelector('div[id="food_list"]').innerHTML = result;
    };







    // === [중요] 자바스크립트에서 배열은 반드시 동일한 데이터 타입만 들어오는 것이 아니라 서로 다른 데이터 타입을 가지는 데이터도 들어올 수 있다.!!! === // 
    const data_arr = [1234, "java", 100, true, 1234, 'html', 'java', "java", {userid:"leess", passwd:"qwer1234", name:"이순신"}];

    for(let item of data_arr){
        console.log(item);
        // 34
        // java
        // 100
        // true
        // 1234
        // html
        // java
        // {userid: 'leess', passwd: 'qwer1234', name: '이순신'}
    }
    const person = data_arr[data_arr.length-1];
    console.log(person);
    // {userid: 'leess', passwd: 'qwer1234', name: '이순신'}
    /*
        ===== 암기. =====
        for(.. of ..)는 배열 값을 가져올때 사용하는 것이고, 
        for(.. in ..)는 객체의 속성목록을 가져올때 사용하는것이다.
    */
    for(let propertyName in person){
        console.log(propertyName);
    }
// ========================================================================================================================================
    for(let propertyName in person){
        console.log(person.propertyName);
    }
    // --> undefined
    // !!! [중요] !!!
    // 객체의 속성에 해당하는 값을 읽어오는 방법에 있어서 속성명이 변수로 되어져 있을 경우에는 .표기법이 아닌 대괄호 표기법을 사용해야 한다. 
    // 즉, 속성명이 변수로 되어져 있을 경우 속성명에 해당하는 값을 읽어오기 위해서는 객체.속성명 이 아닌 객체[속성명] 으로 해야만 한다.


// ========================================================================================================================================
    for(let propertyName in person){
        console.log(person[propertyName]);
    }
    // leess
    // qwer1234
    // 이순신


console.log("====================");
// ========================================================================================================================================
    const arr_person = [ {photo:"iyou.jpg", userid:"iyou", passwd:"qwer1234", name:"아이유"}
                        ,{photo:"kimth.jpg", userid:"kimth", passwd:"qwer1234", name:"김태희"}
                        ,{photo:"parkby.jpg", userid:"parkby", passwd:"qwer1234", name:"박보영"} ];
    
    let html_person = ``;
    for(let person of arr_person){

        let title;

        html_person +=  `<div><ul style='list-style-type: none;'>`;

        for(let propertyName in person){
            switch(propertyName){
            case "photo":
                title = "";
                break;

            case "userid":
                title = "아이디";
                break;

            case "passwd":
                title = "비밀번호";
                break;

            case "name":
                title = "이름";
                break;

            default:
                break;
            }

            if(propertyName == "photo"){
                html_person += `<li><img src="./images/${[person[propertyName]]}" width='119px' height="149px"></li>`;
            }
            else{
                html_person += `<li><label class="title">${title}</label>&nbsp;${[person[propertyName]]}</li>`
            }
        }
        html_person += `</ul></div>`;
    }
    document.querySelector('div[id="person_arr"]').innerHTML = html_person;






// ===========================퀴즈 2 시작=============================
    const str_word_data = document.querySelector('div[id="words"]').innerText;
    const arr_word_data = str_word_data.split(',');
    // console.log(arr_word_data)
    let result = `<ul>`;
    for(let i=0; i<arr_word_data.length; i++){
        arr_word_data[i] = arr_word_data[i].trim();
        const index = arr_word_data[i].indexOf("o",1);
        // if (arr_word_data[i].charAt(1) === 'o'){
        if (index == 1){
            // console.log(arr_word_data[i])
            result += `<li>${arr_word_data[i]}</li>`;
        } 
    }
    
    result += `</ul>`;
    document.querySelector('div[id="word_list"]').innerHTML = result;
    
// ===========================퀴즈 2 끝=============================

}// ===== EoP window.onload = function() =====