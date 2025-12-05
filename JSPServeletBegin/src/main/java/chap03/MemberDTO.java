package chap03;

public class MemberDTO {
	
	private String name;	//성명
	private String jubun; 	//주민번호
	

	public MemberDTO() {
		
	}
	
	public MemberDTO(String name, String jubun) {
		this.name = name;
		this.jubun = jubun;
	}
	
	

	
	
	
	

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getJubun() {
		return jubun;
	}

	public void setJubun(String jubun) {
		this.jubun = jubun;
	}
	

//	=============================================================================== //
//	성별을 알아오는 메서드 생성하기 
	public String getGender() { 
		
		if(jubun != null && jubun.length() == 13 && jubun.substring(6, 7).equals("1")
												 || jubun.substring(6, 7).equals("2")
												 || jubun.substring(6, 7).equals("3")
												 || jubun.substring(6, 7).equals("4")) {
			if(jubun.substring(6, 7).equals("1") || jubun.substring(6, 7).equals("3")) {
				return "남";
			}
			else {
				return "여";
			}
		}
		else {
			return "";
		}
	}// ===== EoP String getGender() =====
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
