package login.controller;

import java.util.HashMap;
import java.util.Map;

import common.controller.AbstractController;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import member.domain.MemberDTO;
import member.model.MemberDAO;
import member.model.MemberDAO_imple;

public class Login extends AbstractController {

	private MemberDAO mdao = new MemberDAO_imple();
	
	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String method = request.getMethod(); //'GET'또는 'POST' 반환
		
		if(!"POST".equalsIgnoreCase(method)) { // GET 방식으로 들어온 경우
			String message = "비정상적인 경로로 들어왔습니다.";
			String loc = "javascript:history.back()"; // 이전경로로 돌아감
			
			request.setAttribute("message", message);
			request.setAttribute("loc", loc);
			
			super.setRedirect(false);
			super.setViewPage("/WEB-INF/msg.jsp");
			
			return; // public void execute... 해당 메서드가 종료됨.
		}
		// POST 방식으로 넘어온 경우.
		String userid = request.getParameter("userid");  // 웹에 입력된 ID 값을 받아옴, JSP에 name="userid"
		String pwd = request.getParameter("pwd");
		
		// 클라리언트의 IP주소를 알아오는 것
		String clientip = request.getRemoteAddr(); // /MyMVC_1/src/main/webapp/JSP 파일을 실행시켰을 때 IP 주소가 제대로 출력되기위한 방법.txt 참조할것.
		/*
		 * System.out.println("확인용 userid : " + userid); 
		 * System.out.println("확인용 pwd : " + pwd); 
		 * System.out.println("확인용 clientip : " + clientip);
		 */
		
		Map<String,String> paraMap = new HashMap<>();
		paraMap.put("userid",userid);
		paraMap.put("pwd", pwd);
		paraMap.put("clientip", clientip);
		
		MemberDTO loginuser = mdao.login(paraMap);
	}

}
