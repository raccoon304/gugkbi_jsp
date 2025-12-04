window.onload = () => {
    document.querySelector('input[id="inputText"]').focus();

    document.querySelector('button[id="btnOK_1"]').addEventListener('click', () => {
        func_encodeURI_decodeURI();
    });

    document.querySelector('input[id="inputText"]').addEventListener('keydown', (e) =>{
        // console.log(e.keyCode); //enter 는 13으로 나옴. 
        // event.keyCode 종류를 알려면 검색어로 " 자바스크립트 keyCode"검색하면 나옴. 
        
        // 모든 글자에서 이벤트 발생 -> 엔터시에만 
        if(e.keyCode == 13){ //13이 엔터임.
            func_encodeURI_decodeURI();
        }

    });

    document.querySelector('button[id="btnReset_1"]').addEventListener('click', () => {
        document.querySelector('input[id="inputText"]').value = "";
        document.querySelector('input[id="inputText"]').focus();
        document.querySelector('td[id="encode_1"]').innerHTML = "";
        document.querySelector('td[id="decode_1"]').innerHTML = "";
    });



    // ===== URI로 인코딩된 값 변경 시작 ===== // 
    document.querySelector('button[id="btnOK_2"]').addEventListener('click', () => {
        func_decodeURI();
    });

    // %EC%98%A4%EB%9D%BC%ED%81%B4
    document.querySelector('input[id="encode_2"]').addEventListener('keydown', (e) =>{
        if(e.keyCode == 13){ //13이 엔터임.
            func_decodeURI();
        }
    });

    document.querySelector('button[id="btnReset_2"]').addEventListener('click', () => {
        document.querySelector('input[id="encode_2"]').value = "";
        document.querySelector('input[id="encode_2"]').focus();
        document.querySelector('td[id="decode_2"]').innerHTML = "";
    });
    // ===== URI로 인코딩된 값 변경 끝 ===== // 




    //Function Expression
    const func_encodeURI_decodeURI = () => {
        const inputText = document.querySelector('input[id="inputText"]').value;
        // console.log(encodeURI(inputText)) // %EC%98%A4%EB%9D%BC%ED%81%B4
        const encodeVal = encodeURI(inputText);
                        // encodeURI("문자열"); ==> 입력된 문자열을 웹 상에서 컴퓨터가 이해하는 문자로 변환 
        // decodeURI(encodeVal); ==> 웹상에서 컴퓨터가 알아듣는 문자를 사람이 알아볼수 있는 문자로 변환시켜준다.

        document.querySelector('td[id="encode_1"]').innerHTML = encodeVal;
        document.querySelector('td[id="decode_1"]').innerHTML = decodeURI(encodeVal);
    };

    // === URI를 Decoding 해주는 function ===
    const func_decodeURI = () => {
        const inputEncoder = document.querySelector('input[id="encode_2"]').value;
        document.querySelector('td[id="decode_2"]').innerHTML = decodeURI(inputEncoder);
    };


    








}// ===== EoP window.onload =====


    //Function declaration