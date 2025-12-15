package test.controller;

import common.controller.AbstractController;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class Test2Controller extends AbstractController{
	
	// 원래는 기본생성자가 생략되어 있는데, 확인차 기본생성자 생성 
	public Test2Controller() {
		 //System.out.println("--확인용 Text2Controller 클래스 생성자 호출--");
	}

	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		//System.out.println("--확인용 Text2Controller 클래스 execute 메서드 호출 -- ");		
		super.setRedirect(true);
		super.setViewPage(request.getContextPath()+"/test1.up");
	}

}
