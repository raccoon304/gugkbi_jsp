package myshop.domain;

public class ImageDTO { // ImageDTO는 오라클의 tbl_main_page테이블에 해당함. 
	private int imgno;
	private String imgname;
	private String imgfilename;
	
	public int getImgno() {
		return imgno;
	}
	public void setImgno(int imgno) {
		this.imgno = imgno;
	}
	public String getImgname() {
		return imgname;
	}
	public void setImgname(String imgname) {
		this.imgname = imgname;
	}
	public String getImgfilename() {
		return imgfilename;
	}
	public void setImgfilename(String imgfilename) {
		this.imgfilename = imgfilename;
	}
}
