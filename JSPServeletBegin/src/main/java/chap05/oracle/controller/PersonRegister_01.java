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


@WebServlet("/personRegister.do")
public class PersonRegister_01 extends HttpServlet {
	private static final long serialVersionUID = 1L;

	private PersonDAO_03 dao = new PersonDAO_imple_04();
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String method = request.getMethod(); // GET 또는 POST 라고 나옴.
		if("GET".equalsIgnoreCase(method)) {
			// localhost:9090/JSPServletBegin/personRegister.do를 하면 개인성향 입력창(form 태그)을 띄우도록한다. 
			System.out.println(method + "방식으로 들어오셨습니다.");
			
			RequestDispatcher dispatcher = request.getRequestDispatcher("/WEB-INF/chap05_right/personRegister_form.jsp");
			dispatcher.forward(request, response);
		}
		else {
			//POST 방식으로 localhost:9090/JSPServletBegin/personRegister.do 을 호출한 경우라면
			// submit 되어져온 데이터를 받아서 DB로 보내야한다. 
			
			System.out.println(method + "방식으로 들어오셨습니다.");
			
			String name = request.getParameter("name");
			String school = request.getParameter("school");
			String color = request.getParameter("color");
			String[] arrFood = request.getParameterValues("food");
			// form ㅌ그에서 체크박스에 체크가 되어진 것만 받아지게 되어있다. 
			// 만약에 체크박스에 체크가 되어진 것이 없다면, null pointexception 발생. 
			
			PersonDTO_02 psdto = new PersonDTO_02();
			psdto.setName(name);
			psdto.setSchool(school);
			psdto.setColor(color);
			psdto.setFood(arrFood);
			 
			String pathName = "";
			try {
				int n = dao.personRegister(psdto);
				
				if(n==1) {
					pathName = "/WEB-INF/chap05_right/personRegister_success.jsp";
				}
				else {
					pathName = "/WEB-INF/chap05_right/error.jsp";
				}
				
			} catch (SQLException e) {
				e.printStackTrace();
				pathName = "/WEB-INF/chap05_right/error.jsp";
			}
			
			RequestDispatcher dispatcher = request.getRequestDispatcher(pathName);
			dispatcher.forward(request, response);
		}
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
