package chap02;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/*
== 배치서술자인 web.xml 에 기술하지 않고 @WebServlet 어노테이션을 사용한 예제 ==

*** === 중요 === ***
확장자가 .xml 또는 .java 인 파일에서 URL경로를 나타낼때 맨 앞에 / 가 오면
그 앞에는  http://ip주소:포트번호/컨텍스트패스명 이 자동으로 붙게 된다.
우리의 컨텍스트 패스명은  /JSPServletBegin 이다.      
즉, 우리는  http://localhost:9090/JSPServletBegin/06_get_post_Method.do 으로 된다.

http://localhost:9090/JSPServletBegin/06_get_post_Method.do 을 처리해주는 서블릿은 Get_Post_Method_06 이다. 
*/


@WebServlet("/06_get_post_Method.do")
public class Get_Post_Method_06 extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// *** 클라이언트(form 태그가 있는 .jsp 파일)에서 넘어온 method 방식이 GET 인지 POST 인지 알아오기 *** //
		String method = request.getMethod(); //get 또는 post
		
		// ***** 웹 브라우저에 출력하기 시작 ***** // 
		//	HttpServletResponse resp 객체는 전송되어져온 데이터를 조작해서 결과물을 나타내고자 할때 쓰인다. 
		response.setContentType("text/html; charset=UTF-8");
		// jsp 상단 contentType과 맞춰줌. 
		
		PrintWriter out = response.getWriter();
		// out은 웹 브라우저에 기술하는 대상체라고 생각하면됨.
		
		if(!"POST".equalsIgnoreCase(method)) {
			out.println("<html>"
					+ "<head>"
					+ 	"<title>개인성향 테스트 결과 반환</title>"
					+ "</head>"
					+ "<body>"
					+ 	"<h2 style='color:green;'>??????????</h2>"
					+ "</body>"
					+ ""
					+ ""
					+ ""
					+ "</html>");
		}
		else {
			
//			HttpServletRequest req 객체는 전송되어온 데이터를 처리해주는 용도로 쓰인다.
			String name = request.getParameter("name");
			String school = request.getParameter("school");
			String color = request.getParameter("color");
			String[] arrFood = request.getParameterValues("food");
			
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
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
