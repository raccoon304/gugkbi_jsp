package admin.member.controller;

import common.controller.AbstractController;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import member.domain.MemberDTO;
import member.model.MemberDAO;
import member.model.MemberDAO_imple;

public class MemberOneDetail extends AbstractController {
	private MemberDAO mdao = new MemberDAO_imple();
	
	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		//관리자(admint)로 로그인했을 때만 회원조회가 가능하도록 
		HttpSession session = request.getSession();
		MemberDTO loginUser = (MemberDTO)session.getAttribute("loginUser");
      
		if(loginUser != null && "admin".equals(loginUser.getUserid()) ) {
			//관리자로 로그인한 경우
			
			String method = request.getMethod();
			String referer = request.getHeader("Referer");
			
			if("POST".equalsIgnoreCase(method)) {// 관리자로 로그인하고 POST인 경우
				String userid = request.getParameter("userid");
				
				//System.out.println("확인용 referer"+referer);
				
				/*  request.getHeader("Referer"); 은 
	            현재 페이지 주소인 http://localhost:9090/MyMVC/admin/memberOneDetail.up 페이지 주소로 접근하려고 시도하였던 
	             이전 페이지 URL 주소를 알려주는 것이다.
	              
	             request.getHeader("Referer"); 값이 null 이 나오는 경우가 있는데 
	            이것은 사용자가 웹브라우저 주소창에 URL주소 (http://localhost:9090/MyMVC/admin/memberOneDetail.up) 를 직접 입력하고 들어온 경우이다.
				*/
				/*
				 * if(referer == null) { // referer == null 이 나오는 경우는 // 사용자가 웹브라우저 주소창에 URL주소
				 * (http://localhost:9090/MyMVC/member/memberOneDetail.up) 를 직접 입력하고 들어온 경우이다.
				 * referer = "http://localhost:9090/MyMVC/index.up";
				 * 
				 * super.setRedirect(false);
				 * super.setViewPage(request.getContentType()+"/index.up"); }
				 */
				
				
				MemberDTO mbrDto = mdao.selectOneMember(userid);
				
				request.setAttribute("mbrDto", mbrDto);
				request.setAttribute("referer", referer);
				
				super.setRedirect(false);
				super.setViewPage("/WEB-INF/admin/member/memberOneDetail.jsp");
			}
			
			
	
		} else {
			//로그인을 안 한 경우 혹은 관리자가 아닌 경우
			String message = "관리자만 접근이 가능합니다.";
			String loc = "javascript:history.back()";
         
			request.setAttribute("message", message);
			request.setAttribute("loc", loc);
               
			super.setRedirect(false);
			super.setViewPage("/WEB-INF/msg.jsp");
		} 	
	}
}
