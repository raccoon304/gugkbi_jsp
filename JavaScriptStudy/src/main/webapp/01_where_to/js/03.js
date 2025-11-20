document.getElementById("h1").innerHTML = "<span style = 'color: red; font-weight: bold;'> h1태그입니다. </span>";

function myFunction(){
    document.getElementById("h1").innerHTML = "<span style = 'color: green; font-weight: bold;'> h1태그입니다. </span>";
    // javascript는 쌍따움표("") 및 홑따움표('')모두 문자열로 취급 
    document.getElementById("demo").innerHTML = "p태그의 <span style='color:red; font-weight:bold;'>내용이 변경</span>되었습니다."
    //  innerText는 글자 그대로 글어오게됨. 즉, 태그처리가 안됌.
}