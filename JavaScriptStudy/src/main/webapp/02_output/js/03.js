function myFunction(){
    window.alert("확인 버튼 클릭 됨.")

    // 일반적으로 window는 생략한다. \n은 줄바꿈을 의미.
    alert("확인 버튼 \n클릭 됨.")

    document.getElementById("name").innerHTML = "홍길동";
}

function myClear(){
    document.getElementById("name").innerHTML = "";
}