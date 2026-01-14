package myshop.controller;

import common.controller.AbstractController;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import myshop.model.ProductDAO;
import myshop.model.ProductDAO_imple;

public class OrderAdd extends AbstractController {
ProductDAO pdao = new ProductDAO_imple();
	
	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String method = request.getMethod();
         
		if(!"POST".equalsIgnoreCase(method)) { 
            String message = "비정상적인 경로로 들어왔습니다";
            String loc = "javascript:history.back()";
               
            request.setAttribute("message", message);
            request.setAttribute("loc", loc);
              
            super.setRedirect(false);   
            super.setViewPage("/WEB-INF/msg.jsp");
		}
		else if("POST".equalsIgnoreCase(method) && super.checkLogin(request)) {
			// POST 방식이고 로그인 했다라면
			String cartno = request.getParameter("cartno");
			
			String sum_totalPrice = request.getParameter("n_sum_totalPrice");    // 주문총액
	        String sum_totalPoint = request.getParameter("n_sum_totalPoint");    // 주문총포인트
	        String str_pnum_join = request.getParameter("str_pnum_join");       // 제품번호를 다 합친것 
	        String str_oqty_join = request.getParameter("str_oqty_join");       // 주문량을 다 합친것
	        String str_totalPrice_join = request.getParameter("str_totalPrice_join"); // 주문가격을 다 합친것
	        String str_cartno_join = request.getParameter("str_cartno_join");     // 장바구니번호를 다 합친것 
	         
	        System.out.println("~~~~ 확인용 sum_totalPrice : " + sum_totalPrice);
	        System.out.println("~~~~ 확인용 sum_totalPoint : " + sum_totalPoint);
	        System.out.println("~~~~ 확인용 str_pnum_join : " + str_pnum_join);
	        System.out.println("~~~~ 확인용 str_oqty_join : " + str_oqty_join);
	        System.out.println("~~~~ 확인용 str_totalPrice_join : " + str_totalPrice_join);
	        System.out.println("~~~~ 확인용 str_cartno_join : " + str_cartno_join);
			
		}
	}
}
