package myshop.controller;

import org.json.JSONObject;

import common.controller.AbstractController;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import myshop.model.ProductDAO;
import myshop.model.ProductDAO_imple;

public class CartDel extends AbstractController {
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

	        
	        // 장바구니 테이블에서 특정제품을 비우기(삭제)
	        int n = pdao.delCart(cartno); 
	        
	        JSONObject jsobj = new JSONObject(); // {}
	        jsobj.put("n", n); // {"n":1}
	         
	        String json = jsobj.toString(); // "{"n":1}"
	         
	        request.setAttribute("json", json);
	         
	        super.setRedirect(false);
	        super.setViewPage("/WEB-INF/jsonview.jsp");
		}
	}
}
