package chap02;

import java.io.IOException;
import java.io.PrintWriter;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/*
=== Servlet 이란 ? 웹서비스 기능을 해주는 자바 클래스를 말한다. ===

 *** Servlet 이 되기 위한 조건은 3가지 규칙을 따라야 한다. ***

1. 서블릿(Servlet)은 반드시 
   javax.servlet.http.HttpServlet 클래스를 부모 클래스로 상속을 받아와야 한다.
   (Tomcat 9 까지)
   
   jakarta.servlet.http.HttpServlet 클래스를 부모 클래스로 상속을 받아와야 한다.
   (Tomcat 10 이후 부터)


2. 웹클라이언트의 요청방식이 GET 방식으로 요청을 해오면
   doGet() 메소드로 응답을 해주도록 코딩을 해야하고,
   웹클라이언트의 요청방식이 POST 방식으로 요청을 해오면
   doPost() 메소드로 응답을 해주도록 코딩을 해주어야만 한다.
   그러므로  반드시  doGet() 메소드와  doPost() 메소드를 
   Overriding(재정의)를 해주어야만 한다.
   
   doGet() 메소드와 doPost() 메소드의 
   첫번째 파라미터는 HttpServletRequest 타입이고,
   두번째 파라미터는 HttpServletResponse 타입이다.
   
   
3. 만약에 서블릿(Servlet)에서 결과물을 웹브라우저상에 출력하고자 한다라면 
   doGet() 메소드와 doPost() 메소드 모두 
   서블릿(Servlet)의 두번째 파라미터인 HttpServletResponse response 를 
   사용하여 출력해준다.      
*/
public class GetMethod_01 extends HttpServlet{

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		System.out.println("GET 방식으로 요청을 보냈습니다.");
		
		//	HttpServletRequest req 객체는 전송되어온 데이터를 처리해주는 용도로 쓰인다.
		String name = req.getParameter("name");
		String school = req.getParameter("school");
		String color = req.getParameter("color");
		String[] arrFood = req.getParameterValues("food");
		
		if(color == null) {
			color = "없음";
		}
		
		
		// ***** 콘솔에 출력하여 확인하기 시작 ***** // 
		System.out.println("name => "+ name );
		System.out.println("school => "+ school  );
		System.out.println("color=> "+ color);
		
		
		String likeFoodes = "";
		if(arrFood != null) {
			for(int i=0; i<arrFood.length; i++) {
				System.out.println("food => "+ arrFood[i] );
			}
		}

		System.out.println("food =>" + likeFoodes);
		// ***** 콘솔에 출력하여 확인하기 끝 ***** // 
		
		// ***** 웹 브라우저에 출력하기 시작 ***** // 
		//	HttpServletResponse resp 객체는 전송되어져온 데이터를 조작해서 결과물을 나타내고자 할때 쓰인다. 
		resp.setContentType("text/html; charset=UTF-8");
		// jsp 상단 contentType과 맞춰줌. 
		
		PrintWriter out = resp.getWriter();
		// out은 웹 브라우저에 기술하는 대상체라고 생각하면됨.
		
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
				+ 	"<h2>개인성향 테스트 결과 01(GET방식)</h2>"
				+ 	"<span style='color:blue; font-weight:bold;'>" + name + "</spna>님의 개인성향은<br><br>"
				+ 	"학력은"+school+"이며, 색상은 <span style='color:"+htmlColor+"'>"+likeColor+"</span><br><br>"
				+ 	"좋아하는 음식은 "+like_foodes+"<br><br>"
				+ "</body>"
				+ ""
				+ ""
				+ ""
				+ "</html>");
		
		// ***** 웹 브라우저에 출력하기 끝 ***** //
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		System.out.println("POST 방식으로 요청을 보냈습니다.");
	}

	
}
