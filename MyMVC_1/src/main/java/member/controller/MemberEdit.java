package member.controller;

import common.controller.AbstractController;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import member.domain.MemberDTO;

public class MemberEdit extends AbstractController {

	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		//내 정보를 수정하기 위한 전제조건은 먼저 로그인을 하는것이다. 
		if(super.checkLogin(request)) { // 로그인 한 경우 (부모에 정의해놓음)
			String userid = request.getParameter("userid");
			
			HttpSession session = request.getSession();
			MemberDTO loginuser = (MemberDTO) session.getAttribute("loginUser");
			
			
			if(loginuser.getUserid().equals(userid)) { //로그인한 사용자가 자신의 정보를 수정하는 경우 
				super.setRedirect(false);
				super.setViewPage("/WEB-INF/member/memberEdit.jsp");
			}
			else {
				String message = "다른 사용자의 정보를 수정하는것은 불가합니다.";
				String loc ="javascript:history.back()";
				
				request.setAttribute("message", message);
				request.setAttribute("loc", loc);
				
				super.setRedirect(false);
				super.setViewPage("/WEB-INF/msg.jsp");
			}
			
		}
		else { // 로그인 하지 않은경우
			String message = "회원정보를 수정하기 위해서는 먼저 로그인이 필요합니다.";
			String loc ="javascript:history.back()";
			
			request.setAttribute("message", message);
			request.setAttribute("loc", loc);
			
			super.setRedirect(false);
			super.setViewPage("/WEB-INF/msg.jsp");
			
		}
		
	}

}
