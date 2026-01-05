package member.controller;

import java.sql.SQLException;
import java.text.DecimalFormat;
import java.util.HashMap;
import java.util.Map;

import org.json.JSONObject;

import common.controller.AbstractController;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import member.domain.MemberDTO;
import member.model.MemberDAO;
import member.model.MemberDAO_imple;

public class CoinUpdateLoginUser extends AbstractController {
	private MemberDAO mdao = new MemberDAO_imple();
	
	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String method = request.getMethod();
	
		String message = "";
		String loc = ""; 
		
		int n = 0; 
		
		if(method.equalsIgnoreCase("POST")) { //POST 방식일 경우 
			String userid = request.getParameter("userid");
			String coinmoney = request.getParameter("coinmoney");
			
			Map<String, String> paraMap = new HashMap<>();
			paraMap.put("userid", userid);
			paraMap.put("coinmoney", coinmoney);
			
			
			try {
				n = mdao.coinUpdateLoginUser(paraMap);
				
				if(n == 1 ) {
					HttpSession session = request.getSession();
					MemberDTO loginuser = (MemberDTO) session.getAttribute("loginUser");
					
					//!! 세션값을 변경하기 !!// --> 코인충전이후 index 페이지 내가 보유한 코인정보는 바로 업데이트 안되는데 이문제 해결
					loginuser.setCoin(loginuser.getCoin() + Integer.parseInt(coinmoney));
					loginuser.setPoint(loginuser.getPoint() + (int)(Integer.parseInt(coinmoney)*0.01));
					
					
					DecimalFormat df = new DecimalFormat("#,###");
					/*
						System.out.println(df.format(3000000));
						// "3,000,000"으로. 
					*/
					
					message= loginuser.getName()+"님의"+ df.format(Long.parseLong(coinmoney)) +"원 결제가 완료되었습니다.";
					loc = request.getContextPath() + "/index.up";
				}
				
				
			} catch (SQLException e) {
				message = "코인액 결제가 DB 오류로 실패하였습니다.";
				loc = "javascript:history.back()";
			}
		}
		else {
			message = "비정상적인 접근입니다.";
			loc = "javascript:history.back()";
		}
		
		
		JSONObject jsonObj = new JSONObject(); //자바스크립트에서 쓸 수 있는 객체를 하나 생성.
		jsonObj.put("n", n); // {"n":1} => 정상일 경우.  {"n":0} => DB update 실패.
		jsonObj.put("message",message); //{"n":1, "message":"--님의 --원 결제가 완료되었습니다."}
		jsonObj.put("loc", loc);
		
		String json = jsonObj.toString();
		request.setAttribute("json", json);
		
		super.setRedirect(false);
		super.setViewPage("/WEB-INF/jsonview.jsp");
		
	}
}
