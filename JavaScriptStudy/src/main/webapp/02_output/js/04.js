function myFunction(){
    window.alert("확인 버튼 클릭 됨.");

    // 일반적으로 window는 생략한다. \n은 줄바꿈을 의미.
    alert("확인 버튼 \n클릭 됨.");

    document.getElementById("name").innerHTML = "홍길동";
}

function myClear(){

    const isClear = window.confirm("지우십니까?");
    // 일반적으로 window는 생략한다. 
    // window.confirm(); 은 확인이면 true, 취소면 false가 된다.
    // isClear 변수에는 true 또는 false가 리턴된다.
    

    if(isClear){
        document.getElementById("name").innerHTML = "";
    }
    else{
        alert("지우기 취소.");
    }

    
}