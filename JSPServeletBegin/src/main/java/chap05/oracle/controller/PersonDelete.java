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

/**
 * Servlet implementation class PersonDelete
 */
@WebServlet("/personDelete.do")
public class PersonDelete extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private PersonDAO_03 dao = new PersonDAO_imple_04();


	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String method = request.getMethod(); // GET또는 POST <암기하기>

		if(!"POST".equalsIgnoreCase(method)) { //GET 방식으로 들어온 경우 
			response.sendRedirect(request.getContextPath() + "/personSelect.do"); // 암기 !!! 자바에서 URL 페이지 이동 시키기 !!!
			// request.getContextPath() 이 컨텍스트 패스명을 알아오는것이다. 즉, JSPServletBegin
		}
		else { // POST 방식인 경우
			
			String pathname = "";
			int n = 0;
	
			// === 특정 회원을 수정하기 전 수정하기전의 회원 정보를 가져오기.
			String seq = request.getParameter("seq");
			// System.out.println(seq); ==> 해당 seq를 가지고옴. 
			PersonDTO_02 dto = new PersonDTO_02();
			
			dto.setSeq(Integer.parseInt(seq));
		
			try {
				PersonDTO_02 psdto = dao.selectOne(seq);
				String name = psdto.getName();
				
				
				n = dao.deletePerson(dto);
				if(n==1) {
					request.setAttribute("name", name); 
					pathname = "/WEB-INF/chap05_right/personDelete.jsp";
		           }
				
			} catch (SQLException e) {
				e.printStackTrace();
			}
		
			RequestDispatcher dispatcher = request.getRequestDispatcher(pathname);
			dispatcher.forward(request, response);
			
		}
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
