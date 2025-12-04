
window.onload = function() {

    // ==== 체크박스 여러개중 라디오 처럼 1개만 선택되도록 만든 것 ==== //
    const checkboxList = document.querySelectorAll('input[name="product_old"]');

    for(let elmt of checkboxList) {

        elmt.addEventListener('click', () => {
            for(let checkbox of checkboxList) {
                if(elmt != checkbox) {
                   checkbox.checked = false;
                }
            }// end of for--------------------
        });

    }// end of for-----------------------------



    // ==== 체크박스 전체선택/전체해제 ==== //
    const allCheck = document.querySelector('input[id="allCheck"]');

    allCheck.addEventListener('click', () => {

        const checkboxList = document.querySelectorAll('input[name="product_usa"]'); 

        for(let checkbox of checkboxList) {
            checkbox.checked = allCheck.checked;
        }// end of for-----------------------------

    });


    // === 체크박스 전체선택/전체해제 에서 
    //     하위 체크박스에 체크가 1개라도 체크가 해제되면 체크박스 전체선택/전체해제 체크박스도 체크가 해제되고
    //     하위 체크박스에 체크가 모두 체크가 되어지면 체크박스 전체선택/전체해제 체크박스도 체크가 되어지도록 하는 것 === // 
    const checkboxUsaList = document.querySelectorAll('input[name="product_usa"]');

    // === 이벤트 소스를 잡은것(복수개 이므로 for문을 사용함) === //
    for(let checkbox of checkboxUsaList) {

        checkbox.addEventListener('click', () => {

            if(!checkbox.checked) { // 체크박스에 체크를 해제한 클릭인 경우
                document.querySelector('input[id="allCheck"]').checked = false;
            }

            else { // 체크박스에 체크를 한 클릭인 경우 
                   // ==> name 값이 product_usa 인 모든 체크박스를 검사해서 모든 체크박스가 체크가 되어진 경우라면 
			       //     체크박스 전체선택/전체해제 체크박스에 체크를 해주도록 한다.

                let is_all_checked = true;   
                for(let checkbox of checkboxUsaList) {
                    if(!checkbox.checked) {
                        is_all_checked = false;
                        break;
                    }
                }// end of for----------------------

                document.querySelector('input[id="allCheck"]').checked = is_all_checked;
            }

        });

    }// end of for------------------------------


}// end of window.onload = function() {}----------------------------
