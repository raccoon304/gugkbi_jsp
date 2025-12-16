package member.model;

import java.sql.SQLException;

import member.domain.MemberDTO;

public interface MemberDAO {
	
	//회원가입을 해주는 메서드(tbl_member 테이블에 insert) 
	int registerMember(MemberDTO member) throws SQLException;
	
}
