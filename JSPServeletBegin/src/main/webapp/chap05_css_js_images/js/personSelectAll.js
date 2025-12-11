$(function(){
	/*
	$('tbody > tr').bind('click', function(){});
	또는 
	$('tbody > tr').bind('click', ()=>{});
	또는 
	$('tbody > tr').click(function(){});
	또는
	*/
	$('tbody > tr').click((e)=>{
		// alert("선택");
		//console.log( $(e.target).html());
		// $(e.target)는 이벤트인 클릭이 발생한 태그(element:요소)를 가리키는 것이다.
		// 여기서 $(e.target).html() 은 <td>태그가 된다. 
		
		const seq = $(e.target).parent().find('span').text();
		// ==> td의 parent() 니까 tr 임. 
		// find(""든 ''든 상관x 특정 id나class 인경우도 . #으로 표기 가능. )
		// 자바스크립트는 웹에서 데이터를 가져올때 text(), 순수 자바는 innerhtml()임. 
		
		// console.log(seq);
		
		// !!! 암기 !!! //
		// 자바스크립트에서 URL 페이지 이동은 location.href="이동하고자하는 URL주소"; 이다.
		location.href = "personDetail.do?seq="+seq;
		
		
		//POST 방식
	});
		 	
});//EoP function()