package myshop.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;

import common.controller.AbstractController;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import myshop.domain.ProductDTO;
import myshop.model.ProductDAO;
import myshop.model.ProductDAO_imple;

public class MallDisplayJSON extends AbstractController {
	//private ProductDAO pdao = new ProductDAO_imple();
	//또는
	private ProductDAO pdao;
	
	public MallDisplayJSON() {
		pdao = new ProductDAO_imple();
	}
	
	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String sname = request.getParameter("sname");
		String start = request.getParameter("start");
		String len = request.getParameter("len");
		/*
	       맨 처음에는 sname("HIT")상품을  start("1") 부터 len("8")개를 보여준다.
	       더보기... 버튼을 클릭하면  sname("HIT")상품을  start("9") 부터 len("8")개를 보여준다.
	       또  더보기... 버튼을 클릭하면 sname("HIT")상품을  start("17") 부터 len("8")개를 보여준다.      
	    */
		
		Map<String, String> paraMap = new HashMap<>();
		
		paraMap.put("sname",sname);		// "HIT"	"NEW"	"BEST"
		paraMap.put("start", start);	// "1"	"9"	"17"	"25"	"33"
		
		String end = String.valueOf( Integer.parseInt(start) + Integer.parseInt(len) - 1 );
		// end => start + len - 1 
		// end는 "8"   "16"   "24"   "32"   "40" 나옴
		paraMap.put("end", end);
		
		List<ProductDTO> productList = pdao.selectBySpecName(paraMap);
		
		JSONArray jsonArr = new JSONArray();
		
		if(productList.size() > 0) {
			// DB에서 조회해온 결과물이 있을 경우 
			for(ProductDTO pdto : productList) {
				JSONObject jsonObj = new JSONObject(); // {}
				
				jsonObj.put("pnum",pdto.getPnum()); // {"pnum":36}
				jsonObj.put("pname", pdto.getPname()); // {"pnum":36, "pname":"노트북30"}
				jsonObj.put("cname", pdto.getCategdto().getCname()); // {"pnum":36, "pname":"노트북30", "cname":"전자제품"}
				jsonObj.put("pcompany", pdto.getPcompany());
	            jsonObj.put("pimage1", pdto.getPimage1());
	            jsonObj.put("pimage2", pdto.getPimage2());
	            jsonObj.put("pqty", pdto.getPqty());
	            jsonObj.put("price", pdto.getPrice());
	            jsonObj.put("saleprice", pdto.getSaleprice());
	            jsonObj.put("sname", pdto.getSpdto().getSname());
	            jsonObj.put("pcontent", pdto.getPcontent());
	            jsonObj.put("point", pdto.getPoint());
	            jsonObj.put("pinputdate", pdto.getPinputdate());
	            
	            jsonObj.put("discountPercent", pdto.getDiscountPercent());
				
	            // {"pnum":36, "pname":"노트북30", "cname":"전자제품" , ... , "pinputdate":"2026-01-06" , "discountPercent":17}
				
	            jsonArr.put(jsonObj);
			}// EoP for 
			
			String json = jsonArr.toString(); //문자열 변환
			
			System.out.println("확인용 json : " + json);
			/*
			확인용 json : [{"pnum":56,"discountPercent":17,"pname":"노트북30","pcompany":"삼성전자","cname":"전자제품","saleprice":1000000,"point":60,"pinputdate":"2026-01-06","pimage1":"59.jpg","pqty":100,"pimage2":"60.jpg","pcontent":"30번 노트북","price":1200000,"sname":"HIT"},
						 {"pnum":55,"discountPercent":17,"pname":"노트북29","pcompany":"레노버","cname":"전자제품","saleprice":1000000,"point":60,"pinputdate":"2026-01-06","pimage1":"57.jpg","pqty":100,"pimage2":"58.jpg","pcontent":"29번 노트북","price":1200000,"sname":"HIT"},
						 {"pnum":54,"discountPercent":17,"pname":"노트북28","pcompany":"아수스","cname":"전자제품","saleprice":1000000,"point":60,"pinputdate":"2026-01-06","pimage1":"55.jpg","pqty":100,"pimage2":"56.jpg","pcontent":"28번 노트북","price":1200000,"sname":"HIT"},
						 {"pnum":53,"discountPercent":17,"pname":"노트북27","pcompany":"애플","cname":"전자제품","saleprice":1000000,"point":60,"pinputdate":"2026-01-06","pimage1":"53.jpg","pqty":100,"pimage2":"54.jpg","pcontent":"27번 노트북","price":1200000,"sname":"HIT"},
						 {"pnum":52,"discountPercent":17,"pname":"노트북26","pcompany":"MSI","cname":"전자제품","saleprice":1000000,"point":60,"pinputdate":"2026-01-06","pimage1":"51.jpg","pqty":100,"pimage2":"52.jpg","pcontent":"26번 노트북","price":1200000,"sname":"HIT"},
						 {"pnum":51,"discountPercent":17,"pname":"노트북25","pcompany":"삼성전자","cname":"전자제품","saleprice":1000000,"point":60,"pinputdate":"2026-01-06","pimage1":"49.jpg","pqty":100,"pimage2":"50.jpg","pcontent":"25번 노트북","price":1200000,"sname":"HIT"},
						 {"pnum":50,"discountPercent":17,"pname":"노트북24","pcompany":"한성컴퓨터","cname":"전자제품","saleprice":1000000,"point":60,"pinputdate":"2026-01-06","pimage1":"47.jpg","pqty":100,"pimage2":"48.jpg","pcontent":"24번 노트북","price":1200000,"sname":"HIT"},
						 {"pnum":49,"discountPercent":17,"pname":"노트북23","pcompany":"DELL","cname":"전자제품","saleprice":1000000,"point":60,"pinputdate":"2026-01-06","pimage1":"45.jpg","pqty":100,"pimage2":"46.jpg","pcontent":"23번 노트북","price":1200000,"sname":"HIT"}]
			
			
			확인용 json : [{"pnum":48,"discountPercent":17,"pname":"노트북22","pcompany":"에이서","cname":"전자제품","saleprice":1000000,"point":60,"pinputdate":"2026-01-06","pimage1":"43.jpg","pqty":100,"pimage2":"44.jpg","pcontent":"22번 노트북","price":1200000,"sname":"HIT"},
						{"pnum":47,"discountPercent":17,"pname":"노트북21","pcompany":"한성컴퓨터","cname":"전자제품","saleprice":1000000,"point":60,"pinputdate":"2026-01-06","pimage1":"41.jpg","pqty":100,"pimage2":"42.jpg","pcontent":"21번 노트북","price":1200000,"sname":"HIT"},
						{"pnum":46,"discountPercent":17,"pname":"노트북20","pcompany":"LG전자","cname":"전자제품","saleprice":1000000,"point":60,"pinputdate":"2026-01-06","pimage1":"39.jpg","pqty":100,"pimage2":"40.jpg","pcontent":"20번 노트북","price":1200000,"sname":"HIT"},
						{"pnum":45,"discountPercent":17,"pname":"노트북19","pcompany":"LG전자","cname":"전자제품","saleprice":1000000,"point":60,"pinputdate":"2026-01-06","pimage1":"37.jpg","pqty":100,"pimage2":"38.jpg","pcontent":"19번 노트북","price":1200000,"sname":"HIT"},
						{"pnum":44,"discountPercent":17,"pname":"노트북18","pcompany":"레노버","cname":"전자제품","saleprice":1000000,"point":60,"pinputdate":"2026-01-06","pimage1":"35.jpg","pqty":100,"pimage2":"36.jpg","pcontent":"18번 노트북","price":1200000,"sname":"HIT"},
						{"pnum":43,"discountPercent":17,"pname":"노트북17","pcompany":"레노버","cname":"전자제품","saleprice":1000000,"point":60,"pinputdate":"2026-01-06","pimage1":"33.jpg","pqty":100,"pimage2":"34.jpg","pcontent":"17번 노트북","price":1200000,"sname":"HIT"},
						{"pnum":42,"discountPercent":17,"pname":"노트북16","pcompany":"한성컴퓨터","cname":"전자제품","saleprice":1000000,"point":60,"pinputdate":"2026-01-06","pimage1":"31.jpg","pqty":100,"pimage2":"32.jpg","pcontent":"16번 노트북","price":1200000,"sname":"HIT"},{"pnum":41,"discountPercent":17,"pname":"노트북15","pcompany":"한성컴퓨터","cname":"전자제품","saleprice":1000000,"point":60,"pinputdate":"2026-01-06","pimage1":"29.jpg","pqty":100,"pimage2":"30.jpg","pcontent":"15번 노트북","price":1200000,"sname":"HIT"}]	
			*/
			request.setAttribute("json", json);
		       
			super.setRedirect(false);
			super.setViewPage("/WEB-INF/jsonview.jsp");
		}// EoP if(productList.size() > 0) {}	
	}
}
