<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%
	String ctxPath = request.getContextPath();
	//	/JSPServeletBegin

%>

<jsp:include page="header.jsp"/>

        <!-- 상단 컨텐츠 시작 -->
        <div class="row mt-4">
            <div class="col-md-3">
                <h2>회원가입</h2>
                <p>회원 가입 화면입니다. 회원 가입하시면 회원만의 특화된 서비스를 이용하실 수 있습니다.</p>
            </div>
            <div class="col-md-9 ">
                <img src="./images/Penguins.jpg" alt="Penguins" class="img-fluid">            
            </div>
        </div>
        <!-- 상단 컨텐츠 끝 -->


        <!-- 중단 컨텐츠 시작 -->
        <div class="row mt-4">
            <div class="col-md-3">
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <a class="nav-link" href="./login.jsp">로그인</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">아이디찾기</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">비밀번호찾기</a>
                    </li>
                </ul>
            </div>

            <div class="col-md-9">
                <form>
                    <fieldset>
                        <legend class="MB-4">회원가입</legend>
                        <div class="form-group row">
                            <label for="userId" class="col-md-3 col-form-label">아이디</label>
                            <div class="col-md-9">
                                <input type="text" class="form-control" id="userId" placeholder="아이디입력">
                            </div>
                        </div>  

                        <div class="form-group row">
                            <label for="passwd" class="col-md-3 col-form-label">비밀번호</label>
                            <div class="col-md-9">
                                <input type="text" class="form-control" id="passwd" placeholder="비밀번호 입력">
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="name" class="col-md-3 col-form-label">성명</label>
                            <div class="col-md-9">
                                <input type="text" class="form-control" id="name" placeholder="성명 입력">
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="mobile" class="col-md-3 col-form-label">휴대폰</label>
                            <div class="col-md-9">
                                <input type="text" class="form-control" id="mobile" placeholder="휴대폰 입력">
                            </div>
                        </div>

                        <div class="row">
                            <legend class="col-form-label col-md-3">성별</legend> <!-- pt-0 은 padding top 0 이다.  -->
                            <div class="col-md-9">
                                <div class="form-check">                                   
                                    <input class="form-check-input" type="radio" name="gender" id="male" value="male">
                                    <label class="form-check-label" for="male">남성</label>
                                </div>
                                <div class="form-check">                                   
                                    <input class="form-check-input" type="radio" name="gender" id="female" value="female">    
                                    <label class="form-check-label" for="female">여성</label>                             
                                </div>
                            </div>
                        </div>

                        <div class="form-group row mt-5">
                            <div class="col-sm-2 offset-md-5">
                                <!-- <button type="submit" class="btn btn-success">전송</button> -->
                                <!-- 또는 -->
                                <input type="submit" class="btn btn-success form-control" value="전송"/>
                            </div>
                        </div>

                    </fieldset>
                </form>	
            </div>
        </div>    
        <!-- 중단 컨텐츠 끝 -->
        
<jsp:include page="footer.jsp"></jsp:include>