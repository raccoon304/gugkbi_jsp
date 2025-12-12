package chap05.oracle.controller;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;

import chap05.oracle.domain.PersonDTO_02;
import chap05.oracle.model.PersonDAO_03;
import chap05.oracle.model.PersonDAO_imple_04;


@WebServlet("/personUpdate.do")
public class PersonUpdate_08 extends HttpServlet {
	private static final long serialVersionUID = 1L;

	private PersonDAO_03 dao = new PersonDAO_imple_04();
	
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String method = request.getMethod(); // GET또는 POST <암기하기>

		if(!"POST".equalsIgnoreCase(method)) { //GET 방식으로 들어온 경우 
			response.sendRedirect(request.getContextPath() + "/personSelect.do"); // 암기 !!! 자바에서 URL 페이지 이동 시키기 !!!
			// request.getContextPath() 이 컨텍스트 패스명을 알아오는것이다. 즉, JSPServletBegin
		}
		else { // POST 방식인 경우
			
			String pathname = "";
			
			try {
				// === 특정 회원을 수정하기 전 수정하기전의 회원 정보를 가져오기.
				String seq = request.getParameter("seq");
				// System.out.println(seq); ==> 해당 seq를 가지고옴. 
				PersonDTO_02 psdto = dao.selectOne(seq);
				request.setAttribute("psdto", psdto);
				//<중요> 서블릿에서 넘겨준 psdto는, 아래 path인 personUpdate.jsp에만 읽어올 수 있지, personUpdate.jsp 아래에 붙은 personUpdate.js는 읽어올 수 없음. 
				// 즉, js에서는 활용 할 수없게됨. 
				// 이때, js 파일을 분리하는 것이아닌 personUpdate.jsp내에 JavaScript를 생성하면 사용할 수있기에 분리하지않고 사용.
				
				pathname = "/WEB-INF/chap05_right/personUpdate.jsp";
				
			} catch (SQLException e) {
				e.printStackTrace();
				pathname = "/WEB-INF/chap05_right/error.jsp";
			}
			RequestDispatcher dispatcher = request.getRequestDispatcher(pathname);
			dispatcher.forward(request, response);
			
		}
	}

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
