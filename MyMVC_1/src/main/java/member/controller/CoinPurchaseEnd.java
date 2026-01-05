package member.controller;

import common.controller.AbstractController;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import member.domain.MemberDTO;

public class CoinPurchaseEnd extends AbstractController {

	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		//원포트(구 아임포트)(PG사 결제 페이지) 결제창을 띄우기 위한 전제조건은 먼저 로그인을 하는것이다. 
		
		if(super.checkLogin(request)) { // 로그인 한 경우 (부모에 정의해놓음)
			String userid = request.getParameter("userid");
			
			HttpSession session = request.getSession();
			MemberDTO loginuser = (MemberDTO) session.getAttribute("loginUser");
			
			if(loginuser.getUserid().equals(userid)) {//로그인 한 사용자가 자신의 코인을 충전하는 경우
				
				String s_coinmoney = request.getParameter("coinmoney");
				String productName = "코인충전";//"새우깡";				
				
				int coinmoney = Integer.parseInt(s_coinmoney)/100; // 테스트를 위해서 금액을 줄여놓음.
				
				//paymentGateway.jsp에 띄울(PG사 결제 모달) 정보들. 
				request.setAttribute("productName",productName);
				request.setAttribute("productPrice", coinmoney);
				request.setAttribute("email", loginuser.getEmail());
				request.setAttribute("name", loginuser.getName());
				request.setAttribute("phoneNumber", loginuser.getMobile());
				
				request.setAttribute("userid", userid);
				
				super.setRedirect(false);
				super.setViewPage("/WEB-INF/member/paymentGateway.jsp");
			}
			else {
				String message = "다른 사용자의 코인 결제 시도는 불가합니다.";
				String loc ="javascript:history.back()";
				
				request.setAttribute("message", message);
				request.setAttribute("loc", loc);
				
				super.setRedirect(false);
				super.setViewPage("/WEB-INF/msg.jsp");
			}
			
		}
		else { // 로그인 하지 않은경우
			String message = "코인충전결제를 하기 위해서는 먼저 로그인이 필요합니다.";
			String loc ="javascript:history.back()";
			
			request.setAttribute("message", message);
			request.setAttribute("loc", loc);
			
			super.setRedirect(false);
			super.setViewPage("/WEB-INF/msg.jsp");
			
		}
		
	}

}
