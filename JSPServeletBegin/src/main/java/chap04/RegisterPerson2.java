package chap04;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;


@WebServlet("/registerPerson2.do")
public class RegisterPerson2 extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// POST 방식만 허용해주어야 한다.
		String method = request.getMethod(); // GET 또는 POST가 나온다. 
		
		if("POST".equalsIgnoreCase(method)) { // POST 방식인 경우 
			
			// request의 역할은 크게보면 2가지가 있는데,
			// 1) form 태그에서 보내온 데이터 값을 받아오는 용도로 쓰임. 
			String name = request.getParameter("name");
			String school = request.getParameter("school");
			String color = request.getParameter("color");
			String[] arrFood = request.getParameterValues("food");
		
			/*
			 * System.out.println("확인용 =>" +String.join(", ", arrFood));
			 * System.out.println(name); 
			 * System.out.println(school);
			 * System.out.println(color);
			 */
			
			
			// 2) form 태그에서 보내온 데이터 값을 저장하는 "저장소" 용도로 쓰임. 
			// request.setAttribute("키",데이터값); ==> requestScope러눈 저장소에 데이터값을 "키"값으로 저장함. 
			request.setAttribute("name",name);
			request.setAttribute("school",school);
			request.setAttribute("color",color);
			request.setAttribute("arrFood", arrFood);
			
			RequestDispatcher dispatcher= request.getRequestDispatcher("/chap04_JSTL/04_forEach/02_view_02.jsp");
			dispatcher.forward(request, response);
			
		}
		else { // GET 방식인 경우 
			RequestDispatcher dispatcher= request.getRequestDispatcher("/chap04_JSTL/04_forEach/02_forbidden_02.jsp");
			dispatcher.forward(request, response);
			
		}
	}

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}
}
