<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%@ taglib prefix="c"   uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>    

<%
    String ctx_Path = request.getContextPath();
    //    /MyMVC
%>

<link rel="stylesheet" type="text/css" href="<%= ctx_Path%>/css/login/login.css" />
<script type="text/javascript" src="<%= ctx_Path%>/js/login/login.js"></script>

<script type= "text/javascript">
	$(function(){
		
		
	});

</script>

<%-- ==== 로그인을 하기 위한 폼태그 생성하기 시작 ==== --%>
<form name="loginFrm" action="<%= ctx_Path%>/login/login.up" method="post">
	<table id="loginTbl">
		<thead>
			<tr>
				<th colspan="2">LOGIN</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>ID</td>
				<td><input type="text" name="userid" id="loginUserid" size="20" autocomplete="off" /></td>
			</tr>
			<tr>
				<td>암호</td>
				<td><input type="password" name="pwd" id="loginPwd" size="20" /></td>
            </tr>
            
            
            <%-- ==== 아이디 찾기, 비밀번호 찾기 ==== --%>
			<tr>
				<td colspan="2">
					<a style="cursor: pointer;" data-toggle="modal" data-target="#userIdfind" data-dismiss="modal">아이디찾기</a> / 
					<a style="cursor: pointer;" data-toggle="modal" data-target="#passwdFind" data-dismiss="modal" data-backdrop="static">비밀번호찾기</a>
				</td>
			</tr>
			
			<tr>
				<td colspan="2">
					<input type="checkbox" id="saveid" name="saveid" />&nbsp;<label for="saveid">아이디저장</label>
                     
                    <button type="button" id="btnSubmit" class="btn btn-primary btn-sm ml-3">로그인</button> 
				</td>
			</tr>
		</tbody>
	</table>
</form>
<%-- ==== 로그인을 하기 위한 폼태그 생성하기 끝 ==== --%>



<%-- ****** 아이디 찾기 Modal 시작 ****** --%>
<%-- <div class="modal fade" id="userIdfind"> --%> <%-- 만약에 모달이 안보이거나 뒤로 가버릴 경우에는 모달의 class 에서 fade 를 뺀 class="modal" 로 하고서 해당 모달의 css 에서 zindex 값을 1050; 으로 주면 된다. --%> 
<div class="modal fade" id="userIdfind" data-backdrop="static"><%-- 만약에 모달이 안보이거나 뒤로 가버릴 경우에는 모달의 class 에서 fade 를 뺀 class="modal" 로 하고서 해당 모달의 css 에서 zindex 값을 1050; 으로 주면 된다. --%>  
    <div class="modal-dialog">
		<div class="modal-content">
      
	        <!-- Modal header -->
	        <div class="modal-header">
				<h4 class="modal-title">아이디 찾기</h4>
				<button type="button" class="close idFindClose" data-dismiss="modal">&times;</button>
	        </div>
	        
	        <!-- Modal body -->
	        <div class="modal-body">
				<div id="idFind">
	          <%-- 
	             <iframe id="iframe_idFind" style="border: none; width: 100%; height: 350px;" src="<%= ctx_Path%>/login/idFind.up"> 
	             </iframe>
	           --%>
	          	</div>
	        </div>
	        
	        <!-- Modal footer -->
	        <div class="modal-footer">
	          	<button type="button" class="btn btn-danger idFindClose" data-dismiss="modal">Close</button>
	        </div>
		</div>
	</div>
</div>
<%-- ****** 아이디 찾기 Modal 끝 ****** --%>
  
  
<%-- ****** 비밀번호 찾기 Modal 시작 ****** --%>
  <div class="modal fade" id="passwdFind"> <%-- 만약에 모달이 안보이거나 뒤로 가버릴 경우에는 모달의 class 에서 fade 를 뺀 class="modal" 로 하고서 해당 모달의 css 에서 zindex 값을 1050; 으로 주면 된다. --%>
    <div class="modal-dialog">
      <div class="modal-content">
      
        <!-- Modal header -->
        <div class="modal-header">
          <h4 class="modal-title">비밀번호 찾기</h4>
          <button type="button" class="close passwdFindClose" data-dismiss="modal">&times;</button>
        </div>
        
        <!-- Modal body -->
        <div class="modal-body">
          <div id="pwFind">
          <%-- 
             <iframe style="border: none; width: 100%; height: 350px;" src="<%= ctx_Path%>/login/pwdFind.up">  
             </iframe>
           --%>
          </div>
        </div>
        
        <!-- Modal footer -->
        <div class="modal-footer">
          <button type="button" class="btn btn-danger passwdFindClose" data-dismiss="modal">Close</button>
        </div>
      </div>
      
    </div>
  </div> 
<%-- ****** 비밀번호 찾기 Modal 끝 ****** --%>