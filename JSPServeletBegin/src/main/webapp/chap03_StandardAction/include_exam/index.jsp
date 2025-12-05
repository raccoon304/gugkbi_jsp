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
                <h2>Getting started</h2>
                <p>An overview of Bootstrap, how to download and use, basic templates and examples, and more.</p>
                <p>
                    <a href="#" class="btn btn-primary btn-lg">Learn more &raquo;</a>
                </p>
            </div>
            <div class="col-md-9 ">
                <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                    <ol class="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    </ol>
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src="./images/Koala.jpg" class="d-block w-100" alt="..."> <!-- d-block 은 display: block; 이고  w-100 은 width 의 크기는 <div class="carousel-item active">의 width 100% 로 잡으라는 것이다. -->
                            <div class="carousel-caption d-none d-md-block"> <!-- d-none 은 display : none; 이므로 화면에 보이지 않다가, d-md-block 이므로 d-md-block 은 width 가 768px이상인 것에서만 display: block; 으로 보여라는 말이다.  --> 
                                <h5>Koala</h5>
                                <p>Koala Content</p>
                            </div>
                        </div>
                        <div class="carousel-item">
                            <img src="../images/Lighthouse.jpg" class="d-block w-100" alt="...">
                            <div class="carousel-caption d-none d-md-block">
                                <h5>Lighthouse</h5>
                                <p>Lighthouse Content</p>
                            </div>		      
                        </div>
                        <div class="carousel-item">
                            <img src="../images/Penguins.jpg" class="d-block w-100" alt="...">
                            <div class="carousel-caption d-none d-md-block">
                                <h5>Penguins</h5>
                                <p>Penguins Content</p>
                            </div>		      
                        </div>
                    </div>
                    <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
            </div>
        </div>
        <!-- 상단 컨텐츠 끝 -->


        <!-- 중앙 컨텐츠 시작 -->
        <div class="row my-4">
            <div class="col-md-8">
                <div class="row">
                    <div class="col-sm-6">
                        <h2>Heading-1</h2>
                        <p>Donec id elit non mi porta gravida at eget metus. 
                            Fuscedapibus, tellus ac cursus commodo, tortor mauris condimentumnibh,
                            ut fermentum massa justo sit amet risus. 
                            Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.
                            malesuada magna mollis euismod. Donec sed odio dui.
                            malesuada magna mollis euismod. Donec sed odio dui.
                            malesuada magna mollis euismod. Donec sed odio dui.
                        </p>
                        <p>
                            <a class="btn btn-success" href="#">View details &raquo;</a>
                        </p>
                    </div>

                    <div class="col-sm-6">
                        <h2>Heading-2</h2>
                        <p>Donec id elit non mi porta gravida at eget metus. 
                            Fuscedapibus, tellus ac cursus commodo, tortor mauris condimentumnibh,
                            ut fermentum massa justo sit amet risus. 
                            Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.
                            malesuada magna mollis euismod. Donec sed odio dui.
                            malesuada magna mollis euismod. Donec sed odio dui.
                            malesuada magna mollis euismod. Donec sed odio dui.
                        </p>
                        <p>
                            <a class="btn btn-success" href="#">View details &raquo;</a>
                        </p>
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <ul class="list-group">
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        A list item
                        <span class="badge badge-primary badge-pill">14</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        B second list item
                        <span class="badge badge-danger badge-pill">2</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        C third list item
                        <span class="badge badge-success badge-pill">1</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        D third list item
                        <span class="badge badge-primary badge-pill">1</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        E third list item
                        <span class="badge badge-danger badge-pill">1</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        F third list item
                        <span class="badge badge-success badge-pill">1</span>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 중앙 컨텐츠 끝 -->


        <!-- 썸네일 시작(이미지에 border가 생기는 것.) -->
        <div class="row">
            <div class="col-md-3 col-sm-6">
                <img src="../images/Koala.jpg" class="img-thumbnail" alt="koala" width="260">
                <div>
                    <h3>Thumbnail label</h3>
                    <p>Cras justo odio, dapibus ac facilisis in, egestas eget
                        quam. Donec id elit non mi porta gravida at eget metus. Nullam id
                        dolor id nibh ultricies vehicula ut id elit.
                    </p>
                </div>
            </div>
            <div class="col-md-3 col-sm-6">
                <img src="./images/Lighthouse.jpg" class="img-thumbnail" alt="Lighthouse" width="260">
                <div>
                    <h3>Thumbnail label</h3>
                    <p>Cras justo odio, dapibus ac facilisis in, egestas eget
                        quam. Donec id elit non mi porta gravida at eget metus. Nullam id
                        dolor id nibh ultricies vehicula ut id elit.
                    </p>
                </div>
            </div>
            <div class="col-md-3 col-sm-6">
                <img src="./images/Penguins.jpg" class="img-thumbnail" alt="Penguins" width="260">
                <div>
                    <h3>Thumbnail label</h3>
                    <p>Cras justo odio, dapibus ac facilisis in, egestas eget
                        quam. Donec id elit non mi porta gravida at eget metus. Nullam id
                        dolor id nibh ultricies vehicula ut id elit.
                    </p>
                </div>
            </div>
            <div class="col-md-3 col-sm-6">
                <img src="./images/Tulips.jpg" class="img-thumbnail" alt="Tulips" width="260">
                <div>
                    <h3>Thumbnail label</h3>
                    <p>Cras justo odio, dapibus ac facilisis in, egestas eget
                        quam. Donec id elit non mi porta gravida at eget metus. Nullam id
                        dolor id nibh ultricies vehicula ut id elit.
                    </p>
                </div>
            </div>
        </div>
<jsp:include page="footer.jsp"></jsp:include>
      