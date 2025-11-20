function myFunction(){
    console.log("확인버튼을 클릭하셨습니다.");
    // console.log()는 크롬 웹브라우저에서 키보드 F12(개발자도구)를 눌러서 콘솔에서 확인하는것.

    document.getElementById("name").innerHTML = "홍길동";
}

function myClear(){
    if(window.confirm("지우십니까?")){
        document.getElementById("name").innerHTML = "";
        // 일반적으로 window는 생략한다. 
        // window.confirm(); 은 확인이면 true, 취소면 false가 된다.
    }
    else{
        alert("지우기 취소.");
    }
}