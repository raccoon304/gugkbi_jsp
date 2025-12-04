
const arr_product = [
		{productId : "led",
		 productName : "led모니터",
		 image : "monitor.jpg",
		 price : 200000,
		 option : [
			        {optionId:"HDMI",      optionName:"HDMI케이블", price:1000},
					{optionId:"3Dglasses", optionName:"3D안경",    price:2000}
		          ]	
		},
		{productId : "camcoder",
		 productName : "캠코더",
		 image : "cam.jpg",
		 price : 500000,
		 option : [
					{optionId:"3Pedestal", optionName:"3각받침대",  price:10000},
					{optionId:"limokon",   optionName:"리모컨",    price:20000},
					{optionId:"charger",   optionName:"충전기",    price:30000}
				  ]
		 }
	];


/////////////////////////////////////////////////////////////////////////////

window.onload = function() {

    let html = `<table id='tbl'>
                    <thead>
                        <tr>
                            <th colspan='3'>제품선택</th>
                        </tr>
                        <tr>
                            <th width='30%'>제품사진</th>
                            <th width='30%'>제품정보</th>
                            <th width='40%'>부속품</th>
                        </tr>
                    </thead>
                    <tbody>`; 
                    

    arr_product.forEach((item, index, array) => {

            html += `<tr>
                        <td style='text-align: center;'>
                            <img src='images/${item.image}' title='클릭하면 원본이미지가 보입니다' onclick='openPopup(this.src)' />  
                        </td>
                        <td>
                            <ul>
                                <li>제품명 : ${item.productName}</li>
                                <li>가격 : ${item.price.toLocaleString('en')}</li>
                            </ul>
                        </td>
                        <td>`;
                    item.option.forEach(function(data, i, arr) {
                        html += `<label>${data.optionName}</label>`;
                    });    
                            
            html += `</td>
                    </tr>`;

    }); // end of arr_product.forEach()----------------------------   
    
    html += `</tbody>
          </table>`;
    
    document.querySelector('div[id="view"]').innerHTML = html;

}// end of window.onload = function()---------------------------------------


// === 팝업창 띄우기 === //
function openPopup(src){

  // alert(src); // http://192.168.10.210:5500/12_popup/images/monitor.jpg
                 // http://192.168.10.210:5500/12_popup/images/cam.jpg

                // window.open("./popup_contents.html", "my_popup", "width=400px, height=350px, left=100px, top=100px;"); 
     const popup = window.open("", "my_popup", "width=400px, height=350px, left=100px, top=100px;"); 

     popup.document.writeln(`
           <html>
              <head>
                 <title>제품이미지 확대보기</title>
              </head>
              <body align='center'>
                 <img src='${src}' /> 
                 <div style='margin-top: 15%;'>
                    <button type='button' onclick='window.close()'>팝업창닫기</button>
                 </div>
              </body>
           </html>
        `);

}// end of function openPopup(src)---------------------------

