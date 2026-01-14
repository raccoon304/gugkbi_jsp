package myshop.controller;

import java.util.List;

import common.controller.AbstractController;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import myshop.domain.ProductDTO;
import myshop.model.ProductDAO;
import myshop.model.ProductDAO_imple;

public class ProdView extends AbstractController {
	ProductDAO pdao = new ProductDAO_imple();
	
	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		// **** GET 방식을 막는 또 다른 방법 ==> 웹브라우저 주소창에서 직접입력하지 못하게 막아버리면 된다. **** //
		// 이것의 단점은 웹브라우저에서 북마크(즐겨찾기)를 했을 경우 접속이 안된다는 것이다.
		// 왜냐하면 이전 페이지가 없이 웹브라우저 주소창에서 직접입력한 것과 동일하기 때문이다.
		
        String referer = request.getHeader("referer"); // 이전 페이지 URL(없으면 null)
		
		if(referer == null) {
			// referer == null은 웹브라우저 주소팡에 키보드로 URL을 직접 입력하고 들어온 경우 
			super.setRedirect(true);
			super.setViewPage(request.getContextPath()+"/index.up");
			return;
		}
		
		String pnum = request.getParameter("pnum"); // 제품번호
		//System.out.println("확인용 pnum"+pnum);
		
		// 제품번호를 가지고서 해당 제품의 정보를 조회해오기 
		ProductDTO pdto = pdao.selectOneProduuctByPnum(pnum);
		
		// 제품번호를 가지고서 해당 제품의 추가된 이미지 정보를 조회해오기 
		List<String> imgList =  pdao.getImagesByPnum(pnum);
		
		pdto.setImgList(imgList);
		
		request.setAttribute("pdto", pdto);
		
		super.setRedirect(false);
		super.setViewPage("/WEB-INF/myshop/prodView.jsp");
		
	}

}
