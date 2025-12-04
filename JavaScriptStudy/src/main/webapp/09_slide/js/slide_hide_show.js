
window.onload = function() {

    const btn_previous = document.querySelector('button[id="previous"]');
    const btn_next = document.querySelector('button[id="next"]');

    const imgList = document.querySelectorAll('div[id="images"] > img');
    imgList.forEach( elmt => {elmt.style.display = "none";} );
    // 초기설정으로 모든 이미지들은 안보이게 만든다.

    imgList[0].style.display = ""; // 초기설정으로 첫번째 이미지만 보이게 만든다.
    
    let current_indexno = 0; // 이미지의 현재 인덱스 번호
    const max_indexno = imgList.length - 1; 
    // 3 


    // ==== 다음으로 이동하는 함수 ==== //
    const func_next = function(){
        
        if(current_indexno < max_indexno) { // 이미지의 현재 인덱스 번호가 마지막(지금은 3임)이 아닌 경우

              btn_previous.removeAttribute('disabled');  // 이전버튼은 활성화 상태로 만든다. 
           // 또는
           // btn_previous.disabled = false; // 이전버튼은 활성화 상태로 만든다.

              imgList.forEach( elmt => {elmt.style.display = "none";} );

              const img = imgList[++current_indexno]; 
              img.style.display = ""; 
              // 이미지의 현재 인덱스 번호를 1증가 시킨 후, 인덱스번호에 해당하는 이미지만 보이게 만든다.

              /////////////////////////////////////////////////////////////
              // ==== 이미지에 애니메이션 효과 주기(transition) 시작 ==== //
              img.style.opacity = "0.3"; 
              // opacity 는 광도로서 0.0(투명, 안보임) 부터 1.0(원래 광도) 까지 이다.

              let opc = img.style.opacity;

              let increase = 0.01;
              const opacityInterval = setInterval(() => {
                  increase += 0.004;
                  img.style.opacity = `${Number(opc) + increase}`;
                  
               // console.log("img.style.opacity => ", img.style.opacity);

                  if(Number(img.style.opacity) >= 1.0) {
                   //  console.log("그만~~!!");
                       clearInterval(opacityInterval);
                  }
               }, 10);
               // 0.01 초 마다 매번 반복해서 실행함.
              // ==== 이미지에 애니메이션 효과 주기(transition) 끝 ==== //
              /////////////////////////////////////////////////////////////

              document.querySelector('h2[id="msg"]').innerHTML = "";
        }    
        else { // 이미지의 현재 인덱스 번호가 마지막(지금은 3임)인 경우
               btn_next.setAttribute('disabled', true);  // 마지막 사진일 때 다음버튼을 비활성화 상태로 만든다. 
            // 또는
            // btn_next.disabled = true; // 마지막 사진일 때 다음버튼을 비활성화 상태로 만든다.   

               document.querySelector('h2[id="msg"]').innerHTML = "마지막 사진 입니다.";
        }    
         
    };

    // ==== 이전으로 이동하는 함수 ==== //
    const func_previous = function(){
        
        if(current_indexno > 0) { // 이미지의 현재 인덱스 번호가 처음이 아닌 두번째 이상인 경우

               btn_next.removeAttribute('disabled');  // 다음버튼은 활성화 상태로 만든다. 
            // 또는
            // btn_next.disabled = false; // 다음버튼은 활성화 상태로 만든다.

               imgList.forEach( elmt => {elmt.style.display = "none";} );

               const img = imgList[--current_indexno]; 
               img.style.display = "";
               // 이미지의 현재 인덱스 번호를 1감소 시킨 후, 인덱스번호에 해당하는 이미지만 보이게 만든다.

               document.querySelector('h2[id="msg"]').innerHTML = "";

               /////////////////////////////////////////////////////////////
               // ==== 이미지에 애니메이션 효과 주기(transition) 시작 ==== //
               img.style.opacity = "0.3"; 
               // opacity 는 광도로서 0.0(투명, 안보임) 부터 1.0(원래 광도) 까지 이다.

               let opc = img.style.opacity;

               let increase = 0.01;
               const opacityInterval = setInterval(() => {
                     increase += 0.004;
                     img.style.opacity = `${Number(opc) + increase}`;
                     
                  // console.log("img.style.opacity => ", img.style.opacity);

                     if(Number(img.style.opacity) >= 1.0) {
                     //  console.log("그만~~!!");
                        clearInterval(opacityInterval);
                     }
               }, 10);
               // 0.01 초 마다 매번 반복해서 실행함.
              // ==== 이미지에 애니메이션 효과 주기(transition) 끝 ==== //
              /////////////////////////////////////////////////////////////      
        }    
        else { // 이미지의 현재 인덱스 번호가 처음인 경우
               btn_previous.setAttribute('disabled', true);  // 처음 사진일 때 이전버튼을 비활성화 상태로 만든다. 
            // 또는
            // btn_previous.disabled = true; // 처음 사진일 때 이전버튼을 비활성화 상태로 만든다.   

               document.querySelector('h2[id="msg"]').innerHTML = "처음 사진 입니다.";
        }

    };

    btn_previous.setAttribute('disabled', true);  // 이전버튼은 초기화로 사용하지 못하도록 비활성화 상태로 만든다. 
 // 또는
 // btn_previous.disabled = true; // 이전버튼은 초기화로 사용하지 못하도록 비활성화 상태로 만든다.

    btn_previous.addEventListener('click', func_previous); // 이전버튼 클릭시 이전으로 이동하는 함수를 호출한다. 
    btn_next.addEventListener('click', func_next);         // 다음버튼 클릭시 다음으로 이동하는 함수를 호출한다.

}// end of window.onload = function() {}--------------------
