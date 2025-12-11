package chap05.oracle.controller;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

import chap05.oracle.domain.PersonDTO_02;
import chap05.oracle.model.PersonDAO_03;
import chap05.oracle.model.PersonDAO_imple_04;

/**
 * Servlet implementation class PersonSelect_06
 */
@WebServlet("/personSelect.do")
public class PersonSelect_06 extends HttpServlet {
	private static final long serialVersionUID = 1L;

	private PersonDAO_03 dao = new PersonDAO_imple_04();
	
    @Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	// tbl_person_interest테이블에 저장되어진 행(데이터)을 읽어다가(select)웹 페이지에 보여주어야함. 
    	String pathname = "";
    	
    	try {
			List<PersonDTO_02> personList = dao.selectAll();
			request.setAttribute("personList", personList);	
			pathname ="/WEB-INF/chap05_right/personSelectAll.jsp";
		
		} catch (SQLException e) {
			e.printStackTrace();
			pathname = "/WEB-INF/chap05_right/error.jsp";
		}
    	RequestDispatcher dispatcher = request.getRequestDispatcher(pathname);
    	dispatcher.forward(request, response);
    	
    }
    
    @Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
