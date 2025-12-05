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
                <h2>로그인</h2>
                <p>회원 로그인 화면입니다. 회원 아이디와 비밀번호를 입력하고 로그인하세요.</p>
            </div>
            <div class="col-md-9 ">
                <img src="./images/Tulips.jpg" alt="Tulips" class="img-fluid">            
            </div>
        </div>
        <!-- 상단 컨텐츠 끝 -->


        <!-- 중단 컨텐츠 시작 -->
        <div class="row mt-4">
            <div class="col-md-3">
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <a class="nav-link " href="./register.jsp">회원가입</a>
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
                <!-- 경고메시지 시작 -->
                <div class="alert alert-warning alert-dismissible fade show" role="alert">
                    공용으로 사용하는 PC에서는 <strong>&quot;비밀번호 기억하기&quot;</strong>를 체크하면 개인정보 유출의 위험이있습니다.
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <!-- 경고메시지 끝 -->

                <div class="row">
                    <!-- 로그인 폼 시작 -->
                    <div class="col-md-9">
                        <form>
                            <fieldset>
                                <legend class="MB-4">회원로그인</legend>

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
                                    <label for="Remember" class="col-md-3 col-form-label">비밀번호 기억하기</label>
                                    <div class="col-md-1">
                                        <input type="checkbox" class="form-control" id="Remember">
                                    </div>
                                </div>

                            </fieldset>
                        </form>	
                    </div>
                    <!-- 로그인 폼 끝 -->


                    <div class="col-md-3" style="display: flex;">
                        <button type="button" class="btn btn-success" style="width: 100px; height: 100px; font-size: 16pt; margin: auto;">로그인</button>
                    </div>

                </div>
            </div>
        </div>    
        <!-- 중단 컨텐츠 끝 -->
        
<jsp:include page="footer.jsp"></jsp:include>



