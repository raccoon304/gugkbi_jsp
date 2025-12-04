window.onload = () => {
    
    try{
        func_plus(2,3);
    } catch(e){
        // alert(e);
        console.log(e);
    }

    document.querySelector('div[id="mydiv"]').innerHTML = `<span style="color: blue;>안녕하세요</span>`
}// EoP window.onload()