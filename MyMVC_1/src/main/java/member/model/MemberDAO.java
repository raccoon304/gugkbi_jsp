package member.model;

import java.sql.SQLException;
import java.util.Map;

import member.domain.MemberDTO;

public interface MemberDAO {
	
	//회원가입을 해주는 메서드(tbl_member 테이블에 insert) 
	int registerMember(MemberDTO member) throws SQLException;

	// ID 중복검사 (tbl_member 테이블에서 userid 가 존재하면 true 를 리턴해주고, userid 가 존재하지 않으면 false 를 리턴한다) 
	boolean idDuplicateCheck(String userid) throws SQLException;

	boolean emailDuplicateCheck(String email) throws SQLException;

	// 로그인 처리
	MemberDTO login(Map<String, String> paraMap) throws SQLException;

	// 아이디 찾기(성명, 이메일을 입력받아서 해당 사용자의 아이디를 알려준다) 
	String findUserid(Map<String, String> paraMap) throws SQLException;

	// 비밀번호 찾기(아이디, 이메일을 입력받아서 해당 사용자가 존재하는지 여부를 알려준다.) 
	boolean isUserExists(Map<String, String> paraMap) throws SQLException;

	// 비밀번호 찾기 후 정상적인 인증 완료하였을때, 비밀번호를 새로 변경한다. 
	int pwdUpdate(Map<String, String> paraMap) throws SQLException;
	
}
