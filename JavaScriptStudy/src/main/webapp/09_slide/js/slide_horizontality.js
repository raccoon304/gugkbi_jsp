window.onload = () => {
    const btn_previous = document.querySelector('button[id="previous"]');
    const btn_next = document.querySelector('button[id="next"]');

    const imglist = document.querySelectorAll('div[id="images"] > img '); // nodeList가 나옴
   
    const div_images = document.querySelector('div[id="images"]');


    let current_indexno = 0; //이미지의 현재 인덱스 번호 
    const max_indexno = imglist.length - 1; 
    // 3 
    
    let positionValue = 0;// div_images의 위치값    
    const image_width = 900;//한번 이동시 해당 숫자만큼 이동.




    // ===== 다음으로 이동하는 함수 ===== //
    const func_next = () => {

        if(current_indexno < max_indexno) { //이미지의 현재 인덱스 번호가 마지막(지금은 3)이 아닌경우. 
            btn_previous.removeAttribute('disabled'); //이전 버튼을 활성화

            positionValue -= image_width; // images 의 위치를 왼쪽으로 이동시키도록 image_width를 빼줘야함.
         
            div_images.style.transform = `translate(${positionValue}px)`;// x축 방향(가로)
            
            current_indexno++; //이미지의 현재 인덱스 번호를 1증가 시킨다        

            document.querySelector('h2[id="msg"]').innerHTML = "";

        }
        else{                               //이미지의 현재 인덱스 번호가 마지막(지금은 3)인 경우. 
            //btn_next.setAttribute('disavled', true);
            //또는
            btn_next.disabled = true;

            document.querySelector('h2[id="msg"]').innerHTML = "마지막 사진 입니다.";
        }
    }

    // ===== 이전으로 이동하는 함수 ===== //
    const func_previous = () => {

        if(current_indexno > 0) {  //이미지의 현재 인덱스 번호가 처음(지금은 3)이 아닌경우. 

            btn_next.removeAttribute('disabled'); //다음 버튼을 활성화

            positionValue += image_width; // images 의 위치를 오른쪽으로 이동시키도록 image_width를 더해줘야함.
         
            div_images.style.transform = `translate(${positionValue}px)`;// x축 방향(가로)

            current_indexno--; //이미지의 현재 인덱스 번호를 1감소 시킨다

            document.querySelector('h2[id="msg"]').innerHTML = "";
        }
        else{                      //이미지의 현재 인덱스 번호가 처음(지금은 3)인 경우. 
            btn_previous.disabled = true;

            document.querySelector('h2[id="msg"]').innerHTML = "처음 사진 입니다.";
        }
    };

    btn_previous.setAttribute('disabled', true); //이전 버튼을 비활성화
    
    // btn_previous.addEventListener('click', () => {
    //     func_previous();
    // });
    //또는
    btn_previous.addEventListener('click', func_previous); //이전버튼 클릭시 이전으로 이동하는 함수를 호출한다. 
    btn_next.addEventListener('click', func_next); //다음버튼 클릭시 이전으로 이동하는 함수를 호출한다. 


};