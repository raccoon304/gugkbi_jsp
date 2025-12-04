window.onload = function(){
    const arr_person = [{name:"아이유", photo:"iyou.jpg",   age:28, address:"서울시 강동구", special:"가수 겸 탤런트<br/>팬들이 많음"},
                         {name:"김태희", photo:"kimth.jpg",  age:27, address:"서울시 강서구", special:"탤런트<br/>팬들이 많음"},
                         {name:"박보영", photo:"parkby.jpg", age:26, address:"서울시 강남구", special:"탤런트 및 영화배우<br/>팬들이 많음"}];

    const btn_list = document.querySelectorAll("body > div:first-child > button");
        // all로 유사배열    
        console.log(btn_list); //NodeList(4)
        console.log(btn_list[0]); //<button type="button">보이기-1</button>

    // 보이기 - 1 버튼 
    btn_list[0].onclick = function() {
        // alert("?");
        let html = ``;

        arr_person.forEach( item => {
            html += `<table>
                        <tr>
                            <td rowspan="3"><img src="./images/${item.photo}"></td>
                            <td class="title">성명</td>
                            <td>${item.name}</td>
                        </tr>
                        <tr>
                            <td class="title">나이</td>
                            <td>${item.age}</td>
                        </tr>
                        <tr>
                            <td class="title">주소</td>
                            <td>${item.address}</td>
                        </tr>
                        <tr>
                            <td colspan ="3" class="title">특이사항</td>
                        </tr>
                        <tr>
                            <td colspan = "3" class="title">${item.special}</td>
                        </tr>
                    </table>`;
        }); // EoP forEach
        document.querySelector('div[id="view"]').innerHTML = html;
    }

    // 감추기 - 1 버튼 
    btn_list[1].onclick = function() {
        document.querySelector('div[id="view"]').innerHTML = "";
    };


    // ==== !! 암기 !! ==== // 
    // 문서로딩과 함께 자동으로 btn_list[0]을 클릭하도록 한다. 
    btn_list[0].click();

    //-------------------------------------------------------------------------------
    


    let html_2 = ``;

    arr_person.forEach( item => {
        html_2 += `<table>
                    <tr>
                        <td rowspan="3"><img src="./images/${item.photo}"></td>
                        <td class="title">성명</td>
                        <td>${item.name}</td>
                    </tr>
                    <tr>
                        <td class="title">나이</td>
                        <td>${item.age}</td>
                    </tr>
                    <tr>
                        <td class="title">주소</td>
                        <td>${item.address}</td>
                    </tr>
                    <tr>
                        <td colspan ="3" class="title">특이사항</td>
                    </tr>
                    <tr>
                        <td colspan = "3" class="title">${item.special}</td>
                    </tr>
                </table>`;
    }); // EoP forEach


    
    
    // 보이기 - 2 버튼 
    btn_list[2].onclick = function() {
        document.querySelector('div[id="view"]').style.display = "";
        document.querySelector('div[id="view"]').innerHTML = html_2;
    }



    // 감추기 - 2 버튼 
    btn_list[3].onclick = function() {
        document.querySelector('div[id="view"]').style.display = "none"; //display를 none 해주었기에 위에 다시 보이기 에서 display를 바꿔줘야함. 
    };



}// ===== EoP window.onload = function() ===== 