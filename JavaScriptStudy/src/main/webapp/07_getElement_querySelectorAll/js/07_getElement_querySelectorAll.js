window.onload = function() { 
// === 1. 자바스크립트에서 태그를 가지고 선택자를 잡는 방법 === //
    /*
    document.getElementsByTagName("태그명"); 이다.

    document.getElementsByTagName("태그명"); 을 실행하면 NodeList 타입(배열과 거의 비슷함)으로 반환해준다. 
    즉, 쉽게 말하자면 객체(object)가 여러개인 형태로 반환해준다.        
    */   

    const divList = document.getElementsByTagName("div");

    console.log("divList", divList)
    //divList HTMLCollection(3)

    //this.alert("divList의 길이 :"+ divList.length);
    // divList의 길이 :3


    for(let i=0; i<divList.length; i++){
        // alert(divList[i].innerText);
        divList[i].style.border = "solid 1px gray";
        divList[i].style.display = "inline-block";
        divList[i].style.width = "200px";
        divList[i].style.height = "150px";
        divList[i].style.margin = "20px"
        divList[i].style.backgroundColor = divList[i].innerText;
        // CSS에서는 background-color 처럼 스네이크 기법 "-"이나, JS에서는 카멜임. 
        divList[i].style.color = "white";
    }// ===== EoP for =====

    const btnList = document.getElementsByTagName("button");
    for(let i=0; i<btnList.length; i++){
        btnList[i].style.width = "100px"
        btnList[i].style.height = "50px"
        btnList[i].style.margin = "10px"
    }

    document.getElementsByTagName("button")[3].style.backgroundColor = "yellow";
    // 버튼4의 배경색을 노랑색으로 한다. 




    // === 2. 자바스크립트에서 클래스명을 가지고 선택자를 잡는 방법 === //
    /*
    document.getElementsByClassName("클래스명"); 이다.

    document.getElementsByClassName("클래스명"); 을 실행하면 NodeList 타입(배열과 거의 비슷함)으로 반환해준다. 
    즉, 쉽게 말하자면 객체(object)가 여러개인 형태로 반환해준다.        
    */   
    
    const btn_navy_list = document.getElementsByClassName("btn_navy");

    for(let i=0; i<btn_navy_list.length; i++){
        btn_navy_list[i].style.backgroundColor = "navy";
        btn_navy_list[i].style.color = "white";
    }// ===== EoP for =====

    document.getElementsByTagName("ul")[0].style.listStyleType = "none";
    const label_sty_list = document.getElementsByTagName("label");

    for(let i=0; i<label_sty_list.length; i++){
        label_sty_list[i].style.color = "red";
        label_sty_list[i].style.fontWeight = "bold";
        label_sty_list[i].style.fontSize = "16pt";
    }// ===== EoP for =====





// === 3. 자바스크립트에서 name속성을 가지고 선택자를 잡는 방법 === //
    /*
    document.getElementsByName("name 값"); 이다.

    document.getElementsByName("name 값"); 을 실행하면 NodeList 타입(배열과 거의 비슷함)으로 반환해준다. 
    즉, 쉽게 말하자면 객체(object)가 여러개인 형태로 반환해준다.        
    */   

    const checkbox_hobby_list = document.getElementsByName("hobby");

    for(let i=0; i<checkbox_hobby_list.length; i++){
        // console.log(checkbox_hobby_list[i].value);    . 표기법으로 각각의 hobby의 속성명만 뽑음.
        //또는 
        console.log(checkbox_hobby_list[i]["value"]);  //[] 표기법으로 각각의 hobby의 속성명만 뽑음.
    }// ===== EoP for =====

    const span_hobby_list = document.getElementsByClassName("hobby_val");

    for(let i=0; i<span_hobby_list.length; i++){
        span_hobby_list[i].innerHTML = checkbox_hobby_list[i].value;
    }// ===== EoP for ===== 



// === 4. 자바스크립트에서 id 값을 가지고 선택자를 잡는 방법 === //
    /*
    document.getElementById("id 값"); 이다.

    document.getElementById("id 값"); 을 실행하면 return type은 하나의 객체이다. 
    */   

    // ====== 엘리먼트(객체)에 마우스가 올라가면 발생하는 이벤트 핸들러 생성하기 ==== //
    document.getElementById("btn_ok_1").onmouseover = function(){
        // document.getElementById("btn_ok_1")를 "이벤트 소스"라고 부른다.
        // .onmouseover 를 "이벤트"라고 부른다. 지금은 마우스가 올라가면 발생하는 이벤트다.
        // function(){ } 부분을 "핸들러(처리)" 라고 부른다.
        // alert("확인용 : 체크박스 확인1");
        
        this.style.backgroundColor = "red"
        // this 는 "이벤트소스"인 자기자신의 객체 document.getElementById("btn_ok_1")를 가리키는 것임. 
    };


    // ====== 엘리먼트(객체)에 마우스가 올라갔다가 빠지면 발생하는 이벤트 핸들러 생성하기 ==== //
    document.getElementById("btn_ok_1").onmouseout = function(){
        this.style.backgroundColor = "";
        // "" CSS에 원래 주었던 배경색. 
    }




// === 5.자바스크립트에서 css 선택자를 가지고 선택자를 잡는 방법 === //
    // document.querySelectorAll("CSS 선택자");  
    // document.querySelectorAll("CSS 선택자");을 실행하면 NodeList 타입(배열과 거의 비슷함)으로 반환해준다. 
    // 즉, 쉽게 말하자면 객체(object)가 여러개인 형태로 반환해준다.

// === 6.자바스크립트에서 css 선택자를 가지고 선택자를 잡는 방법 === //
    // document.querySelector("CSS 선택자");
    // document.querySelector("CSS 선택자"); 을 실행하면 return type은 하나의 객체이다. 

    const li_foodlist =  document.querySelectorAll("section#food > ol:nth-child(2) > li");
    const img = document.querySelector("img[id='food_image']");

    const img_food_list = ["jjm.png", "jjbong.png", "tangsy.png", "palbc.png"];
    // 자바스크립트에서 배열은 [] 이다. 


    for(let i=0; i<li_foodlist.length; i++){
        li_foodlist[i].onmouseover = function(){
            // alert(li_foodlist[i].innerText + "마우스 올림.");    또는
            // alert(`${li_foodlist[i].innerText} 마우스 올림.`);   또는
            // alert(this.innerText + "마우스 올림.");              또는
            // alert(`${this.innerText} 마우스 올림.`);
            this.style.backgroundColor = "navy";
            this.style.color = "red";
        
            // img.src = "./images/" + img_food_list[i];
            img.src = `./images/${img_food_list[i]}`;
            img.width ="100";
            img.height = "100";
            // CSS 에서는 뒤에 px 등 지정해줘야하지만 JS에서는 그러면 적용되지 않음. 
        
            img.style.display = "";
            // 아래 onmouseout에서 display를 none으로 고정시킨걸 풀어주기 위해 초기값으로 세팅. 
        }

        li_foodlist[i].onmouseout = function(){
            this.style.backgroundColor = "";
            this.style.color = "";
            
            img.style.display = "none";
            // 위는 영구적으로 display를 none으로 바꿔줌  


        }
    }// ===== EoP for =====

    // 체크박스확인1 버튼을 클릭하면 name 값이 hobby 인 체크박스에 체크가 되어진것만 value 을 나열해서 span태그의 id값이 result1 인 곳에 출력하세요...
    document.querySelectorAll("button")[6].onclick = function(){
        // alert("확인용 체크박스 1 ");

        const checkbox_list = document.querySelectorAll("input[name = 'hobby'] ");
        let result = "";
        let cnt = 0;


        for(let i=0; i<checkbox_list.length; i++){
        //     console.log("확인용 value : ", checkbox_list[i].value);
        //     console.log("확인용 체크박스 체크 유무 : ", checkbox_list[i].checked); // 체크박스에서 체크가 되었으면 true, 아니라면 false 로 나옴. 
            if(checkbox_list[i].checked){
                // console.log("확인용 : ", checkbox_list[i].value);
                
                if(checkbox_list[i].checked){
                    cnt++;
                    let str_comma = (cnt == 1)? "" : ", ";
                    result += str_comma + checkbox_list[i].value ;
                }
            }
        }// ===== EoP for =====
        // console.log(result);  
        document.querySelector("span[id='result1']").innerHTML = result; 
    }    
    
    
    // 체크박스확인2 버튼을 클릭하면 name 값이 hobby 인 체크박스에 체크가 되어진것만 value 을 나열해서 span태그의 id값이 result2 인 곳에 출력하세요...
    document.querySelector("button[id='btn_ok_2']").onclick = function(){
        // alert("확인용 체크박스 2 ");
        const checkbox_list = document.querySelectorAll("input[name = 'hobby'] ");
        let result = "";
        let cnt = 0;

        for(let i=0; i<checkbox_list.length; i++){
        //     console.log("확인용 value : ", checkbox_list[i].value);
        //     console.log("확인용 체크박스 체크 유무 : ", checkbox_list[i].checked); // 체크박스에서 체크가 되었으면 true, 아니라면 false 로 나옴. 
            if(checkbox_list[i].checked){
                // console.log("확인용 : ", checkbox_list[i].value);
                
                if(checkbox_list[i].checked){
                    cnt++;
                    let str_comma = (cnt == 1)? "" : ", ";
                    result += str_comma + checkbox_list[i].value ;
                }
            }
        }// ===== EoP for =====
        // console.log(result);  
        document.querySelector("span[id='result2']").innerHTML = result; 
    }   


    // Function Expression
    const func_clear = function(){

    }

}// ===== EoP window.onload = function() =====



// Function Declearation 
function func_clear(){
    const checkbox_list = document.querySelectorAll("input[type = 'checkbox'] ");

    for(let i=0; i<checkbox_list.length; i++){
        checkbox_list[i].checked = false;
    }
    document.querySelector("span[id='result1']").innerHTML = ""; 
    document.querySelector("span[id='result2']").innerHTML = ""; 
}