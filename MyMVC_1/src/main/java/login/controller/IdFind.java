package login.controller;

import java.util.HashMap;
import java.util.Map;

import common.controller.AbstractController;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import member.model.MemberDAO;
import member.model.MemberDAO_imple;

public class IdFind extends AbstractController {

	private MemberDAO mdao = new MemberDAO_imple();
	
	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String method = request.getMethod();
		
		if("POST".equalsIgnoreCase(method)) {
			//아이디 찾기 모달창에서 찾기 버튼을 클릭했을경우
			String name = request.getParameter("name");
			String email = request.getParameter("email");
			
			Map<String, String> paraMap = new HashMap<>();
			paraMap.put("name", name);
			paraMap.put("email", email);
			
			String userid = mdao.findUserid(paraMap);
			
			if(userid != null) { // 찾은 userid 가 존재할 경우 
				request.setAttribute("userid", userid);
			}
			else { // 찾은 userid 가 존재하지않을 경우 
				request.setAttribute("userid", "존재하지 않습니다.");
			}		
			
			//아래 두개는 웹에서 사용자가 아이디 찾기후 아이디가 정상적으로 떴을때
			// 뷰단에서 이름과 이메일을 그대로 유지시키기 위해 받은 이름과 이메일을 그대로 다시 넘겨준다. 
			request.setAttribute("name", name);
			request.setAttribute("email", email);
			
		}
		
		request.setAttribute("method", method);
		
		super.setRedirect(false);
		super.setViewPage("/WEB-INF/login/idFind.jsp");
	}
}
