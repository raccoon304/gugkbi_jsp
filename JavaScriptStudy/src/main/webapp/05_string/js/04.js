window.onload = function () {
  /*
       1. "문자열".toUpperCase()
      ===> 문자열을 모두 대문자로 변경하여 리턴해준다.
   */
  const str = "Please visit Microsoft! ORACLE / Microsoft MS-SQL";

  let new_str = str.toUpperCase();
  document.getElementById("toUpperCase").innerHTML = new_str;
  // PLEASE VISIT MICROSOFT! ORACLE / MICROSOFT MS-SQL

  document.getElementById("str").innerHTML = str;
  // Please visit Microsoft! ORACLE / Microsoft MS-SQL
  // 원본 "문자열"은 그대로 유지된다. 



  /*
       2. "문자열".toLowerCase()
      ===> 문자열을 모두 소문자로 변경하여 리턴해준다.
   */
  new_str = str.toLowerCase();
  document.getElementById("toLowerCase").innerHTML = new_str;


  /*   
      3. 문자열을 합치는 concat()
      ===> concat() 대신에 + 를 사용해도 된다.
   */
  const text1 = "Hello";
  const text2 = "World";
  const text3 = text1.concat(" ",text2);
  document.getElementById("concat").innerHTML = text3;
  // -> Hello World

  document.getElementById("plus").innerHTML = text1 + " " + text2;


  /*    
      4. "문자열".trim()
      ===> 문자열의 좌,우 공백을 없애서 리턴해준다.
  */
  const text4 = "java";
  const text5 = "         script        ";
  const text6 = "/jQuery";

  document.getElementById("trim").innerHTML = text4 + text5.trim + text6;
  // --> javafunction trim() { [native code] }/jQuery



  /*
       5. "문자열".padStart(확보길이,'채울글자');  // ECMAScript 2017 feature.
      6. "문자열".padEnd(확보길이,'채울글자');    // ECMAScript 2017 feature.
   */
  const str2 = "안녕하세요";
  new_str = str2.padStart(10, '*');
  document.getElementById("padStart").innerHTML = new_str; 
  // --> *****안녕하세요

  new_str = str2.padEnd(10, '*');
  document.getElementById("padEnd").innerHTML = new_str; 

  /*
       7. "문자열".charAt(index) 
       ==> "문자열" 에서 특정 index 에 위치한 문자를 리턴해준다.
  */
  const text7 = "HELLO WORLD";
  let ch = text7.charAt(0); //H
  document.getElementById("charAt").innerHTML = ch; 
  
  ch = text7[0];  //H ECNAScript 5 (2009)
  document.getElementById("ch").innerHTML = ch; 

  let str_quiz = "";

  for(let i = 0; i < text7.length; i++){
      const curr = text7.charAt(i);
      const next = text7.charAt(i + 1);

      str_quiz += curr;

      if(i < text7.length - 1 && curr !== " " && next !== " "){
          str_quiz += "-";
      }
  }
  document.getElementById("quiz").innerHTML = str_quiz;
}