window.onload = function(){

    const member = { 
        id : "leess",
        passwd : "qwer1234$",
        name : "이순신",
        address: "서울시 마포구",
        mobile: "010-0000-0000",

        info1 : function(){
            return this.id + " " + this.name + " " + this.address;
        },

        info2(){
            return this.id + " " + this.name + " " + this.address;
        },
        info3(sarary){
            return sarary * 3;
        }
    }

    document.querySelector('div[id="div_1"]').innerHTML = member.info1;
    //function(){ return this.id + " " + this.name + " " + this.address; }

    document.querySelector('div[id="div_2"]').innerHTML = member.info1();
    //leess 이순신 서울시 마포구


    /* 
        member 의 형태가 const 이므로 member 의 객체를 다른 객체로 변경할 수 없는 거시지
        member 객체의 필드값은 변경이 가능하다.
    */

    member.id = "eomjh";
    member.name = "엄정화";
    member.address = "서울시 강남구"

    document.querySelector('div[id="div_3"]').innerHTML = member.info1();
    // eomjh 엄정화 서울시 강남구 

    document.querySelector('div[id="div_4"]').innerHTML = member.info2();
    //eomjh 엄정화 서울시 강남구

    document.querySelector('div[id="div_5"]').innerHTML = member.info3(100);
    // 300
}