package error.controller;

import common.controller.AbstractController;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class ErrorController extends AbstractController {

	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		// super.setRedirect(false); 디폴트가 false라 굳이 안해줘도 됌.
		super.setViewPage("/WEB-INF/error.jsp");
	}

}
