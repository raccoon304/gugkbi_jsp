window.onload = function(){
    const tbl = document.querySelector('table[id="tbl"]');

    // tbl.onchange = function(){
    //     alert("확인용");
    // }

    // 또는 
    
    // tbl.addEventListener("change", function(){
    //     alert("확인용2");
    // });

    // tbl.onkeydown = function(){
    //     alert("확인용3");
    // }

    // tbl.addEventListener("keydown", function(){
    //     alert("확인용4");
    // });

    // tbl.onkeyup = function(){
    //     alert("확인용5");
    // }

    // tbl.addEventListener("keyup", function(){
    //     alert("확인용6");
    // });






    // tbl.addEventListener('change',function(event){
    //     alert(event.target.id);
    //     // 현재 이벤트가 발생되어진 target(즉,태그)를 잡아줌. 
    // });

    // 일반적으론 event의 e 만 쓰는경우가 많음.
    tbl.addEventListener('change',function(e){
        // alert(e.target.id);
        // 현재 이벤트가 발생되어진 target(즉,태그)를 잡아줌. 
        // e.target이 change가 발생되어진 input 태그를 가리키는것. 
        // apple    strawberry      melon

        // alert(e.target.value);

        /*
         노드.parentNode.parentNode - 부모노드 의 부모노드
         노드.parentNode            - 부모노드
         노드.childNodes            - 모든자식노드들
         노드.firstChild            - 첫째자식노드
         노드.lastChild             - 막내자식노드
         노드.nextSibling           - 나의바로밑동생노드(형제노드)
         노드.previousSibling       - 나의바로위형노드(형제노드)
         
         !! 조심할 사항은 태그사이에 띄어쓰기를 하거나 태그를 줄 바꿈을 해버리면
           띄어쓰기나 줄바꿈을 텍스트 노드(text node)로 취급해버리므로 
            원하는 노드의 값을 가지고 오지 않고 undefined 가 나온다.  
                          
         이렇게 undefined 가 나오지 않도록 하기 위해서 우리는 노드에 id 값을 주어서 처리하도록 한다. 
      */
       // alert(e.target.parentNode.innerText);   // "1,000"          "2,000" "3,000"
                                                // ["1","000"]      ... 
                                                // "1000"
                                                // Number("1000")
                                                // 1000
        let price = e.target.parentNode.innerText;
        price = Number(price.split(",").join(""))
        // alert(price);

        let su = Number(e.target.value); //개수 
        price *= su;

        //alert(`가격: ${price}`)
        // 숫자.toLocaleString('en'); ==> 숫자를 3자리 마다 콤마를 찍어서 문자열로 리턴시켜줌
        //alert(`가격: ${price.toLocaleString('en')}`)
        price = price.toLocaleString('en')

        // alert("확인용 : " + e.target.parentNode.nextSibling.innerHTML)
        // 사과 : 0, 딸기 : 0, 참외 : undifined

        const id = e.target.id;
        document.querySelector(`td#${id}`).innerHTML = price;

        const td_list = document.querySelectorAll('table[id="tbl"] > tbody > tr > td:last-child'); 
            // 과일 각각의 td가 나옴 -> 3 (즉, nodelist 형태로 나옴.)
            
        const td_arr = Array.from(td_list,(elmt, indexm ,array) => {return Number(elmt.innerText.split(",").join(""))});
        //유사배열을 배열로 변환
        console.log(td_arr)
        // (3) [3000, 0, 0]

        let sum = 0;
        td_arr.forEach(item => {sum += item})
        document.querySelector('table[id="tbl"] > tfoot > tr > td:last-child').innerHTML = sum.toLocaleString('en');
        // document.querySelector("div#display_error > span").style.display = "";
        
        const display = document.querySelector("div#display_error > span").style.display;
        
        if(display == "inline"){
            document.querySelector("div#display_error > span").style.display = "";
        }
    });

    //-----------------------------------------------------------------------
    tbl.addEventListener("keyup", function(e){
        func_calcuration(e.target); // e.target이 키보드로 타이핑을 한 input태그를 가리침 
    })

}// ===== EoP window.onload = function() =====

// Function Declaration 
function func_calcuration(target) {
    const su = Number(target.value);

    if(su < 0 || su > 10 ){
        document.querySelector("div#display_error > span").style.display = "inline";
        target.value = "0";
        document.querySelector(`td[id="${target.id}"]`).innerHTML = "0";
    }
    else{
        document.querySelector("div#display_error > span").style.display = "";

        let price = target.parentNode.innerText;
        price = Number(price.split(",").join(""));

        price *= su;
        price = price.toLocaleString('en')
        const id = target.id;

        document.querySelector(`td#${id}`).innerHTML = price;

        const td_list = document.querySelectorAll('table[id="tbl"] > tbody > tr > td:last-child'); 
        const td_arr = Array.from(td_list,(elmt, indexm ,array) => {return Number(elmt.innerText.split(",").join(""))});

        let sum = 0;
        td_arr.forEach(item => {sum += item})

        document.querySelector('table[id="tbl"] > tfoot > tr > td:last-child').innerHTML = sum.toLocaleString('en');
    }
}