<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<%@ taglib prefix="c"   uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn"  uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>  

<jsp:include page="../../header2.jsp" /> 

<style type="text/css">
	table.table-bordered > tbody > tr > td:nth-child(1) {
		width: 25%;
	    font-weight: bold;
	    text-align: right;
	}
</style>
<script type="text/javascript">
	
	$(function(){
		$('div#smsResult').hide();
		
		$('button#btnSend').click(function(){
			//console.log($('input#reservedate').val() + " " + $('input#reservetime').val() );
			//2026-01-05 11:50
			// --> 202601051150이렇게 바꿔줘야함.
			
			let reservedate = $('input#reservedate').val();
			reservedate = reservedate.split("-").join("");
			// "20260105"
			let reservetime = $('input#reservetime').val();
			reservetime = reservetime.split(":").join("");
			// "1150"
			
			const datetime = reservedate + reservetime;
			//console.log(datetime);
			// 202601051150
			
			let dataObject;
			
			if(reservedate == "" || reservetime == ""){
				//문자를 바로 보내기 인 경우 
				dataObj = {"mobile":"${requestScope.mbrDto.mobile}",
						   "smsContent":$('textarea#smsContent').val()};
			}
			
			else{
				// 예약문자 보내기인경우 
				dataObj = {"mobile":"${requestScope.mbrDto.mobile}",
						   "smsContent":$('textarea#smsContent').val(),
						   "datetime":datetime};
				
			}
			
			$.ajax({
				url:"${pageContext.request.contextPath}/admin/member/smsSend.up",
				// type:"get", 디폴트 get임. 
				data:dataObj,
				dataType:"json",
				success:function(json){
					// json 은 {"group_id":"R2GWPBT7UoW308sI","success_count":1,"error_count":0} 처럼 된다.
					if(json.success_count == 1) {
	                	$("div#smsResult").html("<span style='color:red; font-weight:bold;'>문자전송이 성공되었습니다.^^</span>");
		            }
		            else if(json.error_count != 0) {
		            	$("div#smsResult").html("<span style='color:red; font-weight:bold;'>문자전송이 실패되었습니다.ㅜㅜ</span>");
		            }
					
		            $("div#smsResult").show();
		            $("textarea#smsContent").val("");
				},
				error: function(request, status, error){
	              	alert("code: "+request.status+"\n"+"message: "+request.responseText+"\n"+"error: "+error);
	           	}
			});
			
			<%--  .jsp 파일에서 사용되어지는 것들 
	        console.log('${pageContext.request.contextPath}');  // 컨텍스트패스   /MyMVC
	        console.log('${pageContext.request.requestURL}');   // 전체 URL     http://localhost:9090/MyMVC/WEB-INF/member/admin/memberList.jsp
	        console.log('${pageContext.request.scheme}');       // http        http
	        console.log('${pageContext.request.serverName}');   // localhost   localhost
	        console.log('${pageContext.request.serverPort}');   // 포트번호      9090
	        console.log('${pageContext.request.requestURI}');   // 요청 URI     /MyMVC/WEB-INF/member/admin/memberList.jsp 
	        console.log('${pageContext.request.servletPath}');  // 파일명       /WEB-INF/member/admin/memberList.jsp 
	      	--%>
			
			
		});//EoP $('button#btnSend').click(function(){}
	});//EoP (function(){}

</script>

<div class="container">
	<c:if test="${empty requestScope.mbrDto }">
		<div class="text-center h4 my-5">존재하지 않는 회원입니다.</div>	
	</c:if>
	<c:if test="${not empty requestScope.mbrDto }">
		<p class="h3 text-center mt-5 mb-4">::: ${requestScope.mbrDto.name} 님의 회원 상세 정보 :::</p>
		<table class="table table-bordered" style="width: 60%; margin: 0 auto;">
			<tr>
				<td>아이디&nbsp;:&nbsp;</td>
			   	<td>${requestScope.mbrDto.userid}</td>
			</tr>
			<tr>
			   	<td>회원명&nbsp;:&nbsp;</td>
			   	<td>${requestScope.mbrDto.name}</td>
			</tr>
			<tr>
			   	<td>이메일&nbsp;:&nbsp;</td>
			   	<td>${requestScope.mbrDto.email}</td>
			</tr>
			<tr>
			   	<td>휴대폰&nbsp;:&nbsp;</td>
			   	<c:set var="mobile" value="${requestScope.mbrDto.mobile}" />   
				<td>${fn:substring(mobile, 0, 3)}-${fn:substring(mobile, 3, 7)}-${fn:substring(mobile, 7, 11)}</td> 
			</tr>
			<tr>
			   	<td>우편번호&nbsp;:&nbsp;</td>
			   	<td>${requestScope.mbrDto.postcode}</td>
			</tr>
			<tr>
			   	<td>주소&nbsp;:&nbsp;</td>
			   	<td>${requestScope.mbrDto.address}&nbsp;
			    	${requestScope.mbrDto.detailaddress}&nbsp;
			    	${requestScope.mbrDto.extraaddress}
			   	</td>
			</tr>
			<tr>
			 	<td>성별&nbsp;:&nbsp;</td>
			   	<td>
			      	<c:choose>
			      <c:when test="${requestScope.mbrDto.gender == '1'}">남</c:when> 
			      <c:otherwise>여</c:otherwise>
			   	</c:choose>
			   	</td>
			</tr>
			<tr>
			   	<td>생년월일&nbsp;:&nbsp;</td>
			   	<td>${requestScope.mbrDto.birthday}</td>
			</tr>
			<tr>
			   	<td>만나이&nbsp;:&nbsp;</td>
			   	<td>${requestScope.mbrDto.age}&nbsp;세</td>
			</tr>
			<tr>
			   	<td>코인액&nbsp;:&nbsp;</td>
			   	<td>
			      	<fmt:formatNumber value="${requestScope.mbrDto.coin}" pattern="###,###" />&nbsp;원
			   	</td>
			</tr>
			<tr>
			   	<td>포인트&nbsp;:&nbsp;</td>
			   	<td>
			      	<fmt:formatNumber value="${requestScope.mbrDto.point}" pattern="###,###" />&nbsp;POINT 
			   	</td>
			</tr>
			<tr>
			   	<td>가입일자&nbsp;:&nbsp;</td>
			   	<td>${requestScope.mbrDto.registerday}</td>
			</tr>
      </table>
	
	
	<%-- ==== 휴대폰 SMS(문자) 보내기 ==== --%>
    <div class="border my-5 text-center" style="width: 60%; margin: 0 auto;">
         <p class="h5 bg-info text-white">
           &gt;&gt;&nbsp;&nbsp;휴대폰 SMS(문자) 보내기 내용 입력란&nbsp;&nbsp;&lt;&lt;
         </p>
         <div class="mt-4 mb-3">
            <span class="bg-danger text-white" style="font-size: 14pt;">문자발송 예약일자</span>
            <input type="date" id="reservedate" class="mx-2" />
            <input type="time" id="reservetime" />
         </div>
         <div style="display: flex;">
            <div style="border: solid 0px red; width: 81%; margin: auto;">
               <textarea rows="4" id="smsContent" style="width: 100%;"></textarea>
            </div>
            <div style="border: solid 0px blue; width: 19%; margin: auto;">
               <button id="btnSend" class="btn btn-secondary">문자전송</button>
            </div>
         </div>
         <div id="smsResult" class="p-3"></div>
    </div>   
	
	
	</c:if>

	<div class="text-center mb-5 ">
		<button type="button" class="btn btn-secondary" onclick="javascript:location.href='memberList.up'">회원목록[처음으로]</button>
		<button type="button" class="btn btn-success mx-5" onclick="javascript:history.back()">회원목록[history:back]</button>
		<button type="button" class="btn btn-primary mx-5" onclick="javascript:location.href='${requestScope.referer}'">회원목록[referer]</button>
		<!-- 위 예제는 history.back의 경우, 스냅샷으로 뜨는거라 상세정보를 보는도중 특정회원이 삭제되어도 목록에는 나오게됨. 
			 referer로 가는경우 스냅샷이 아닌 페이지를 다시 들어가는거라 referer를 쓰는게 맞음. -->
	
	</div>
	
</div>

<jsp:include page="../../footer2.jsp" /> 

    