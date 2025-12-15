package test.controller;

import common.controller.AbstractController;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class Test1Controller extends AbstractController{

	// 원래는 기본생성자가 생략되어 있는데, 확인차 기본생성자 생성 
	public Test1Controller() {
		 //System.out.println("--확인용 Text1Controller 클래스 생성자 호출--");
	}
	
	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		//System.out.println("--확인용 Text1Controller 클래스 execute 메서드 호출 -- ");
		
		request.setAttribute("name", "홍길동");
		//--------------------------------------------------//
		super.setRedirect(false);
		super.setViewPage("/WEB-INF/test/test1.jsp");
		
		
	}

}
