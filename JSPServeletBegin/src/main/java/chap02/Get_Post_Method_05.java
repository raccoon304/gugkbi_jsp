package chap02;

import java.io.IOException;
import java.io.PrintWriter;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class Get_Post_Method_05 extends HttpServlet{


	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// *** 클라이언트(form 태그가 있는 .jsp 파일)에서 넘어온 method 방식이 GET 인지 POST 인지 알아오기 *** //
		String method = req.getMethod(); //get 또는 post
		
		// ***** 웹 브라우저에 출력하기 시작 ***** // 
		//	HttpServletResponse resp 객체는 전송되어져온 데이터를 조작해서 결과물을 나타내고자 할때 쓰인다. 
		resp.setContentType("text/html; charset=UTF-8");
		// jsp 상단 contentType과 맞춰줌. 
		
		PrintWriter out = resp.getWriter();
		// out은 웹 브라우저에 기술하는 대상체라고 생각하면됨.
		
		if(!"POST".equalsIgnoreCase(method)) {
			out.println("<html>"
					+ "<head>"
					+ 	"<title>개인성향 테스트 결과 반환</title>"
					+ "</head>"
					+ "<body>"
					+ 	"<h2 style='color:orange;'>??????????</h2>"
					+ "</body>"
					+ ""
					+ ""
					+ ""
					+ "</html>");
		}
		else {
			
//	HttpServletRequest req 객체는 전송되어온 데이터를 처리해주는 용도로 쓰인다.
			String name = req.getParameter("name");
			String school = req.getParameter("school");
			String color = req.getParameter("color");
			String[] arrFood = req.getParameterValues("food");
			
			if(color == null) {
				color = "없음";
			}
						
			String likeColor = ""; 
			String htmlColor = color;
			switch (color) {
			case "red":
				color = "빨강색";
				break;
			case "blue":
				color = "파랑색";
				break;
			case "green":
				color = "녹색";
				break;
			case "yellow":
				color = "노란색";
				break;
			}
			if(!color.equals("없음")) {
				likeColor += color + "을 좋아합니다.";
			}
			else {
				likeColor = "없습니다.";
			}
			
			String like_foodes = arrFood != null?String.join(",", arrFood)+"입니다.": "없습니다.";
								
			out.println("<html>"
					+ "<head>"
					+ 	"<title>개인성향 테스트 결과 반환</title>"
					+ "</head>"
					+ "<body>"
					+ 	"<h2>개인성향 테스트 결과 05("+method+")</h2>"
					+ 	"<span style='color:purple; font-weight:bold;'>" + name + "</spna>님의 개인성향은<br><br>"
					+ 	"학력은"+school+"이며, 색상은 <span style='color:"+htmlColor+"'>"+likeColor+"</span><br><br>"
					+ 	"좋아하는 음식은 "+like_foodes+"<br><br>"
					+ "</body>"
					+ ""
					+ ""
					+ ""
					+ "</html>");
			// ***** 웹 브라우저에 출력하기 끝 ***** //
		}
	}


	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		doGet(req,resp);
	}	
}
