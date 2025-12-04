
// ==== 체크박스 여러개중 라디오 처럼 1개만 선택되도록 만든 것 ==== //
function onlyOneCheck(obj) {
    const checkboxList = document.querySelectorAll('input[name="product_old"]'); 

    checkboxList.forEach(elmt => {
        if(elmt != obj) { // elmt != obj 은 체크박스에 체크를 하지 않은 나머지 모든 체크박스를 말한다. 
           elmt.checked = false; // 체크박스에 체크를 못하도록 한다.
        }
    });// end of checkboxList.forEach()-------------------
}// end of function onlyOneCheck(obj) {}----------------------------



// ==== 체크박스 전체선택/전체해제 ==== //
function func_allCheck(bool) {
    const checkboxList = document.querySelectorAll('input[name="product_usa"]');
    checkboxList.forEach(elmt => elmt.checked=bool);
}// end of function func_allCheck(bool) {}--------------------------


// === 체크박스 전체선택/전체해제 에서 
//     하위 체크박스에 체크가 1개라도 체크가 해제되면 체크박스 전체선택/전체해제 체크박스도 체크가 해제되고
//     하위 체크박스에 체크가 모두 체크가 되어지면 체크박스 전체선택/전체해제 체크박스도 체크가 되어지도록 하는 것 === //
function func_usaCheck(bool) {

 // if(!bool) {
 // 또는 
    if(bool == false) {
       // 미국산 체크박스 6개중 클릭한 체크박스가 체크가 해제 되어진 상태로 넘어온 경우
       document.querySelector('input[id="allCheck"]').checked = false;
    }
    else {
       // 미국산 체크박스 6개중 클릭한 체크박스가 체크가 되어진 상태로 넘어온 경우
       
       const checkboxList = document.querySelectorAll('input[name="product_usa"]');

       let is_all_checked = true;
       for(let checkbox of checkboxList){
            if(!checkbox.checked) { // 미국산 체크박스 6개를 반복할때, 해당 체크박스가 체크가 해제 되어진 경우라면  
               is_all_checked = false;
               break;
            } 
       }// end of for----------------------------------

       document.querySelector('input[id="allCheck"]').checked = is_all_checked;
    }

}// end of function func_usaCheck(bool)------------------------------


