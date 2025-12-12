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

@WebServlet("/personUpdateEnd.do")
public class PersonUpdateEnd_09 extends HttpServlet {
   private static final long serialVersionUID = 1L;
   private PersonDAO_03 psDao = new PersonDAO_imple_04();
   
   @Override
   protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
      String method = request.getMethod(); //"GET"인지 "POST"인지 알아오기
      
      if(!"POST".equalsIgnoreCase(method)) {
         // GET 방식으로 들어온 경우 Select.do 페이지로 다시 이동시키기
         response.sendRedirect(request.getContextPath()+"/personSelect.do");
      } else {
         // POST 방식으로 서브밋 되어져 form 태그에서 받아온 데이터를 request에 넣어주어야 함!!
         String seq = request.getParameter("seq");
         String name = request.getParameter("name");
         String school = request.getParameter("school");
         String color = request.getParameter("color");
         String[] arrFood = request.getParameterValues("food");
         
         
         PersonDTO_02 psDto = new PersonDTO_02();
         psDto.setSeq(Integer.parseInt(seq));
         psDto.setName(name);
         psDto.setSchool(school);
         psDto.setColor(color);
         psDto.setFood(arrFood);
         
         String pathName = "";
         try {
            // 회원 정보를 수정한다!
            int n = psDao.updatePerson(psDto);
            
            if(n==1) {
               // 회원정보를 수정한 이후 수정된 회원정보를 조회해주기
               // POST 방식으로 회원정보를 조회해야 하므로 form 태그가 있는 View단 페이지로 가야함!
               request.setAttribute("seq", seq);
               pathName = "/WEB-INF/chap05_right/personSeq_Form.jsp";
               
            }
              
         } catch (SQLException e) {
            e.printStackTrace();
            pathName = "/WEB-INF/chap05_right/error.jsp";
         }
         
         RequestDispatcher dispatcher = request.getRequestDispatcher(pathName);
         dispatcher.forward(request, response);
      }
   }//end of protected void doGet()-----

   
   @Override
   protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
      doGet(request, response);
   }

}//end of 함수종료!