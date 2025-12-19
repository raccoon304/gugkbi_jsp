package login.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import common.controller.AbstractController;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import mail.controller.GoogleMail;
import member.model.MemberDAO;
import member.model.MemberDAO_imple;

public class PwdFind extends AbstractController {

	private MemberDAO mdao = new MemberDAO_imple();
	
	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		/*
		 * System.out.println("=== PwdFind execute() 진입, method=" + request.getMethod()
		 * + " ==="); System.out.println("userid=" + request.getParameter("userid"));
		 * System.out.println("email=" + request.getParameter("email"));
		 */
		
		
		
		
		String method = request.getMethod();
		
		if("POST".equalsIgnoreCase(method)) {
			//아이디 찾기 모달창에서 찾기 버튼을 클릭했을경우
			String userid = request.getParameter("userid");
			String email = request.getParameter("email");
			
			Map<String, String> paraMap = new HashMap<>();
			paraMap.put("userid", userid);
			paraMap.put("email", email);
			
			boolean isUserExists = mdao.isUserExists(paraMap);
			
			// ---------------------------------------------------------------- //
			boolean sendMailSuccess = false; // 메일이 정상적으로 전송되었는지 유무를 알아오기 위한 용도
			
			if(isUserExists) {
				//회원으로 존재하는 경우
				Random rnd = new Random();
				
				// 인증키는 영문소문자 5글자 + 숫자 7글자로 발급 
				String certication_code = "";
				
				char randchar = ' ';
				for(int i=0; i<5; i++) {
					//min 부터 max 사이의 값으로 랜덤한 정수를 얻으려면 
					randchar = (char)(rnd.nextInt('z' - 'a' + 1) + 'a');
					//			 소문자 변환     	  max값  min값      min값
 					//영문 소문자 'a' 부터 'z' 까지 랜덤하게 1개를 만든다.
	                certication_code += randchar;
				}// EoP for 
				
				int randnum = ' ';
				for(int i=0; i<5; i++) {
					//min 부터 max 사이의 값으로 랜덤한 정수를 얻으려면 
					randnum = rnd.nextInt(9 - 0 + 1) + 0;
					//			    	max값-min값+1  min값
 					//영문 소문자 'a' 부터 'z' 까지 랜덤하게 1개를 만든다.
	                certication_code += randnum;
				}// EoP for 
				//System.out.println("확인용 : " + certication_code);
				
				
				// 랜덤하게 생성한 인증코드(certification_code)를 비밀번호 찾기를 하고자 하는 사용자의 email 로 전송시킨다.
				GoogleMail mail = new GoogleMail();
				
				try {
					mail.send_certification_code(email,certication_code);
					sendMailSuccess = true;
					
					//세션 불러오기 
					HttpSession session = request.getSession();
					
					// 발급한 인증코드를 세션에 저장시킴.
					session.setAttribute("certication_code", certication_code);
					
					
					
				} catch (Exception e) {//메일 전송이 실패한경우 
					e.printStackTrace();
					sendMailSuccess = false;
				}
			}	
			request.setAttribute("isUserExists", isUserExists);
			request.setAttribute("userid", userid);
			request.setAttribute("email", email);
			request.setAttribute("sendMailSuccess", sendMailSuccess);
		}// EoP if("POST".equalsIgnoreCase(method)) {}
		
		request.setAttribute("method", method);

		super.setRedirect(false);
		super.setViewPage("/WEB-INF/login/pwdFind.jsp");
	}
}
