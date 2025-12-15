package index.controller;

import java.sql.SQLException;
import java.util.List;

import common.controller.AbstractController;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import myshop.domain.ImageDTO;
import myshop.model.ProductDAO;
import myshop.model.ProductDAO_imple;

public class IndexController extends AbstractController {

	// private ProductDAO pdao = new ProductDAO_imple();
	// 또는
	private ProductDAO pdao;

	public IndexController() { // 기본생성자 
		pdao = new ProductDAO_imple();
	}
	
	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception {     
		
		try {
			List<ImageDTO> imgList = pdao.imageSelectAll();
			request.setAttribute("imgList", imgList);
			
			super.setRedirect(false);
			super.setViewPage("/WEB-INF/index.jsp");
	
		} catch(SQLException e) {
			e.printStackTrace();
			
			super.setRedirect(true);
			super.setViewPage(request.getContextPath()+"error.up") ;
		};
	}
}
