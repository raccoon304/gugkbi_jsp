package test.controller;

import common.controller.AbstractController;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class Test4Controller extends AbstractController {

	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		request.setAttribute("name", "박보영");
		request.setAttribute("img", "parkby.jpg");
		
		super.setRedirect(false);
		super.setViewPage("/WEB-INF/test/test4.jsp");
		
	}

}
