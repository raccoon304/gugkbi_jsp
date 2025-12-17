package member.controller;

import org.json.JSONObject;

import common.controller.AbstractController;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import member.model.MemberDAO;
import member.model.MemberDAO_imple;

public class EmailDuplicateCheck extends AbstractController {

	private MemberDAO mdao = new MemberDAO_imple();
	
	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String method = request.getMethod(); // GET 또는 POST가 나옴. 
		if("POST".equalsIgnoreCase(method)) {
			String email = request.getParameter("email");
			
			boolean isExists = mdao.emailDuplicateCheck(email);
			//System.out.println("확인용 => " + isExists); //확인용 => true
			
			//JavaScript가 이해할수 있는(JSON)형태로 바꿔주어야함.
			//JSON in JAVA 를 다운받아 lib 안에 넣어주고 사용함. 
			JSONObject jsonObj = new JSONObject(); 	// 자바스크립트에서 쓸 빈객체 하나 생성
			jsonObj.put("isExists", isExists);		// {"isExists", true} 또는 {"isExists", false}로 나오게됨.
			
			String json = jsonObj.toString(); // ===> 문자열형태인 {"isExists", true} 또는 {"isExists", false}로 바꿔주게 됨.
			System.out.println("확인용 JSON => " + json); // 확인용 JSON => {"isExists":true} / 확인용 JSON => {"isExists":false}
			
			request.setAttribute("json", json); 
			
			super.setRedirect(false);
			super.setViewPage("/WEB-INF/jsonview.jsp");
		}//EoP if
		else {//GET으로 들어온 경우 
			
		}
	}
}
