$(function(){
	$('td#error').hide();
	
	// [충전결제하기]에 마우스를 올리거나 마우스를 빼면 
	$('td#purchase').hover(function(e){ //마우스를 올린경우
		$(e.target).addClass('purchase');
	}, function(e){ // 마우스를 뺀 경우 
		//alert("확인용 마우스 아웃");	
		$(e.target).removeClass('purchase');
	});
	
	// 충전금액에 해당하는 라디오를 선택하면 금액에 따른 POINT에 배경색/글자색 부여 
	$('input:radio[name="coinmoney"]').click(function(e){
		//%%%%%!!== 3개의 radio태그 하위에 span 태그가 각각 1개씩 존재하는데 이를 index 로 만들어서 선택한 radio의 span태그만 선택하도록 ==!!%%%%%
		const index = $('input:radio[name="coinmoney"]').index($(e.target));
		//console.log(index);
		
		$('td>span').removeClass('stylePoint'); //하나만 css를 적용하기 위해서 전체 없앤 후 선택한 하나만 적용
		
		$('td>span').eq(index).addClass('stylePoint'); //.eq()는 배열처럼 꺼내옴
		// $("td>span").eq(index); ==> $("td>span")중에 index 번째의 요소인 엘리먼트를 선택자로 보는 것이다.
		// $("td>span")은 마치 배열로 보면 된다. $("td>span").eq(index) 은 배열중에서 특정 요소를 끄집어 오는 것으로 보면 된다. 예를 들면 arr[i] 와 비슷한 뜻이다
		
		$('td#error').hide();
		
		
		
		//$(e.target) -> radio 셋중 선택한 radio 
	});
	
	
	
	
}); // EoP $(function(){}
	 

// Function Declearation

// [충전결제하기]를 클릭했을때 이벤트 처리하기.
function goCoinPayment(ctxPath, userid){
	const checked_cnt = $('input:radio[name="coinmoney"]:checked').length;

	if(checked_cnt == 0){
		// 결제금액을 선택하지 않았을 경우.
		$('td#error').show();
		return ;
	}
	else{
		// 결제 진입 
		const coinmoney = $('input:radio[name="coinmoney"]:checked').val(); // 충전금액 
		
		// alert(`${coinmoney}원 결제합니다. `)
		
		/* === 팝업창에서 부모창 함수 호출 방법 3가지 ===
	          1-1. 일반적인 방법
	         opener.location.href = "javascript:부모창스크립트 함수명();";
	                        
	         1-2. 일반적인 방법
	         window.opener.부모창스크립트 함수명();
	
	         2. jQuery를 이용한 방법
	         $(opener.location).attr("href", "javascript:부모창스크립트 함수명();");
      	*/
		
		opener.location.href = `javascript:goCoinPurchaseEnd("${ctxPath}", "${coinmoney}", "${userid}");`;
		//window.opener.goCoinPurchaseEnd();
		
		self.close(); // 자신의 팝업창을 닫음. ( PG사의 결제 페이지로 넘어가고 기존 팝업은 닫기 위함. )
		
	}
}