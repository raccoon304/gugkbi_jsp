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
 * Servlet implementation class PersonDetail_07
 */
@WebServlet("/personDetail.do")
public class PersonDetail_07 extends HttpServlet {
	private static final long serialVersionUID = 1L;

	private PersonDAO_03 dao = new PersonDAO_imple_04();

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String seq = request.getParameter("seq");
		// System.out.println("확인용 seq"+seq);
		String pathName = "";

		try {
			PersonDTO_02 psdto = dao.selectOne(seq);

			if (psdto != null) {
				request.setAttribute("psdto", psdto);
				pathName = "/WEB-INF/chap05_right/personDetail.jsp";
				
				RequestDispatcher dispetcher = request.getRequestDispatcher(pathName);
				dispetcher.forward(request, response);
				
			} else { // get으로 임의의 seq 값을 던진경우
				response.sendRedirect(request.getContextPath() + "/personSelect.do");
			}

		} catch (SQLException e) {
			// 암기 !!! 자바에서 URL 페이지 이동 시키기 !!!
			pathName = "/WEB-INF/chap05_right/error.jsp";
			// request.getContextPath() 이 컨텍스트 패스명을 알아오는것이다. 즉, JSPServletBegin
			e.printStackTrace();
		}
		/*
		 * RequestDispatcher dispetcher = request.getRequestDispatcher(pathName);
		 * dispetcher.forward(request, response);
		 */

	}

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}

}
