package myshop.controller;

import common.controller.AbstractController;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import myshop.model.ProductDAO;
import myshop.model.ProductDAO_imple;

public class MallHomeMore extends AbstractController {

	//private ProductDAO pdao = new ProductDAO_imple();
	//또는
	private ProductDAO pdao;
	
	public MallHomeMore() {
		pdao = new ProductDAO_imple();
	}
	
	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		// HIT 상품의 전체개수를 알아온다. 
		int totalHITCount = pdao.totalPspecCount(1);
		System.out.println("확인용 " + totalHITCount);
		
		request.setAttribute("totalHITCount", totalHITCount);
		
		super.setRedirect(false);
		super.setViewPage("/WEB-INF/myshop/mallHomeMore.jsp");	
	}
}
