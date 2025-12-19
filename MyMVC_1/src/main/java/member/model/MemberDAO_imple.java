package member.model;

import java.io.UnsupportedEncodingException;
import java.security.GeneralSecurityException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Map;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;


import member.domain.MemberDTO;
import util.security.AES256;
import util.security.SecretMyKey;
import util.security.Sha256;

public class MemberDAO_imple implements MemberDAO {

	private DataSource ds;//(context.xml내) javax.sql.DataSource아파치톰캣이 제공하는 DBCP(DB Connection Pool)이다.
	private Connection conn;
	private PreparedStatement pstmt;
	private ResultSet rs;
	
	private AES256 aes;
	
	public MemberDAO_imple() { //기본생성자 
	    Context initContext;
		try {
			initContext = new InitialContext();
		    Context envContext  = (Context)initContext.lookup("java:/comp/env");
		    ds = (DataSource)envContext.lookup("jdbc/myoracle");
		    
		    // SecretMyKey.KEY 은 우리가 만든 암호화/복호화 키이다.
		    aes = new AES256(SecretMyKey.KEY);
		    
		} catch (NamingException e) {
			e.printStackTrace();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
	}
	
	// 사용한 자원을 반납하는 close() 메소드 생성하기
	private void close() {
		try {
			if(rs    != null) {rs.close();     rs=null;}
			if(pstmt != null) {pstmt.close(); pstmt=null;}
			if(conn  != null) {conn.close();  conn=null;}
		} catch(SQLException e) {
			e.printStackTrace();
		}
	}// end of private void close()---------------
	
	
	
	

	//======== 회원가입을 해주는 메서드(tbl_member 테이블에 insert) ==========
	@Override
	public int registerMember(MemberDTO member) throws SQLException {
		int result = 0;
		
		try {
			conn = ds.getConnection();
			
			String sql = " insert into tbl_member(userid, pwd, name, email, mobile, postcode, address, detailaddress, extraaddress, gender, birthday) " 
                    + " values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) "; 
			
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, member.getUserid());
			pstmt.setString(2, Sha256.encrypt(member.getPwd()));	// 암호를 SHA256 알고리즘으로 단방향 암호화 시킨다.
			pstmt.setString(3, member.getName());
			pstmt.setString(4, aes.encrypt(member.getEmail()));  // 이메일을 AES256 알고리즘으로 양방향 암호화 시킨다.
			pstmt.setString(5, aes.encrypt(member.getMobile()));
			pstmt.setString(6, member.getPostcode());
			pstmt.setString(7, member.getAddress());
			pstmt.setString(8, member.getDetailaddress());
			pstmt.setString(9, member.getExtraaddress());
			pstmt.setString(10, member.getGender());
			pstmt.setString(11, member.getBirthday());
			
			result = pstmt.executeUpdate();
			
		} catch (UnsupportedEncodingException | GeneralSecurityException e) {
			e.printStackTrace();
		} finally {
			close();
		}
		
		return result;
	}// EoP public int registerMember(MemberDTO member) throws SQLException

	
	// ID 중복검사 (tbl_member 테이블에서 userid 가 존재하면 true 를 리턴해주고, userid 가 존재하지 않으면 false 를 리턴한다) 
	@Override
	public boolean idDuplicateCheck(String userid) throws SQLException {
		boolean isExists = false;
		
		try {
			conn = ds.getConnection();
			String sql = " select userid "
					   + "from tbl_member "
					   + " where userid = ? ";
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, userid);
			
			rs = pstmt.executeQuery();
			
			isExists = rs.next();
			// 행이 있으면 true  없으면 false 로, 있을경우 중복된 ID 가 있다는거임.
		} finally {
			close();
		}
		return isExists;
	}

	@Override
	public boolean emailDuplicateCheck(String email) throws SQLException {
		boolean isExists = false;
		
		try {
			conn = ds.getConnection();
			String sql = " select email "
					   + " from tbl_member "
					   + " where email = ? ";
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, aes.encrypt(email));
			
			rs = pstmt.executeQuery();
			
			isExists = rs.next();
			// 행이 있으면 true  없으면 false 로, 있을경우 중복된 email이 있다는거임.
		} catch (UnsupportedEncodingException | GeneralSecurityException e) {
			e.printStackTrace();
		} finally {
			close();
		}
		return isExists;
	}

	
   // 로그인 처리
   @Override
   public MemberDTO login(Map<String, String> paraMap) throws SQLException {
      MemberDTO member = null;
      
      try {
         conn = ds.getConnection();
         String sql = " WITH "
                  +" M AS ( "
                  +"  SELECT userid, name, coin, point, "
                  +"      trunc( months_between(sysdate, lastpwdchangedate) ) AS pwdchangegap, "
                  +"      to_char(registerday, 'yyyy-mm-dd hh24:mi:ss') as registerday, idle, email, mobile, postcode, address, detailaddress, extraaddress "
                  +"  FROM tbl_member "
                  +"  WHERE status = 1 AND userid = ? and pwd = ? "
                  +" ) "
                  +" , H AS ( "
                  +"  select trunc( months_between(sysdate, MAX(LOGINDATE)) ) AS LAST_LOGINDATE_GAP "
                  +"  FROM tbl_loginhistory "
                  +"  where fk_userid = ? "
                  +" ) "
                  +" SELECT userid, name, coin, point, pwdchangegap, registerday, idle, email, mobile "
                  +"       ,postcode, address, detailaddress, extraaddress, LAST_LOGINDATE_GAP "
                  +" FROM M CROSS JOIN H ";
         pstmt = conn.prepareStatement(sql);
         pstmt.setString(1, paraMap.get("userid"));
         pstmt.setString(2, Sha256.encrypt(paraMap.get("pwd"))); // 암호화하여 넣어주어야 DB에서 비교가 가능! 
         pstmt.setString(3, paraMap.get("userid"));
         
         rs = pstmt.executeQuery();
         if(rs.next()) {
            member = new MemberDTO();
            member.setUserid(rs.getString("userid"));
            member.setName(rs.getString("name"));
            member.setCoin(rs.getInt("coin"));
            member.setPoint(rs.getInt("point"));

            // 마지막으로 암호를 변경한 날짜가 현재시각으로 부터 3개월이 지났으면 true
                // 마지막으로 암호를 변경한 날짜가 현재시각으로 부터 3개월이 지나지 않았으면 false
            if(rs.getInt("pwdchangegap") >= 3) {
               member.setRequirePwdChange(true); // 로그인 시 암호를 변경하라는 alert를 띄우기 위해 사용
            }
            
            member.setRegisterday(rs.getString("registerday"));
            member.setIdle(rs.getInt("idle"));
            
            member.setEmail(aes.decrypt(rs.getString("email"))); // 이메일은 암호화된 것으로 DB에 저장됐으므로 복호화하여 가져온다.
            member.setMobile(aes.decrypt(rs.getString("mobile"))); // 이메일 또한 복호화하여 DB에서 가져온다.
            
            member.setPostcode(rs.getString("postcode"));
            member.setAddress(rs.getString("address"));
            member.setDetailaddress(rs.getString("detailaddress"));
            member.setExtraaddress(rs.getString("extraaddress"));
            
            // === 휴면이 아니고, 마지막 로그인 일자가 1년 미만인 회원만 tbl_loginhistory(로그인기록) 테이블에 insert 하기 시작 === //
            if(member.getIdle() == 0 && rs.getInt("LAST_LOGINDATE_GAP") < 12) {
               sql = " insert into tbl_loginhistory(historyno, fk_userid, clientip)"
                   +"   values(seq_historyno.nextval, ?, ?) ";
               pstmt = conn.prepareStatement(sql);
               pstmt.setString(1, paraMap.get("userid"));
               pstmt.setString(2, paraMap.get("clientip"));
               
               pstmt.executeUpdate();
            } else {
               // 휴면이고, 마지막 로그인 일자가 1년 이상인 회원일 경우 휴면처리 해주기
               member.setIdle(1); //MemberDTO 값 바꿔준 것
               if(rs.getInt("idle") == 1) {
                  // DB의 Idle 값도 1로 변경해주기
                  sql = " update tbl_member set idle = 1 "
                      +"   where userid = ? ";
                  
                  pstmt = conn.prepareStatement(sql);
                  pstmt.setString(1, paraMap.get("userid"));
                  
                  pstmt.executeUpdate();
               }
            }
            // === 휴면이 아닌 회원만 tbl_loginhistory(로그인기록) 테이블에 insert 하기 시작 === //
            
         }//end of if(rs.next())-----
         
      }
      catch(GeneralSecurityException | UnsupportedEncodingException e) {e.printStackTrace();}
      finally {close();}
      
      return member;
   }//end of public MemberDTO login(Map<String, String> paraMap) throws SQLException-----

   
   
   
   // 아이디 찾기(성명, 이메일을 입력받아서 해당 사용자의 아이디를 알려준다) 
   @Override
   public String findUserid(Map<String, String> paraMap) throws SQLException {
	   String userid = null;
	   
	   try {
		   conn = ds.getConnection();
		   String sql = " select userid "
			     	  + " from tbl_member "
			   		  + " where status = 1  and name = ? and email = ? ";
		
		   pstmt = conn.prepareStatement(sql);
		   pstmt.setString(1, paraMap.get("name"));
		   pstmt.setString(2, aes.encrypt(paraMap.get("email")));
		   
		   rs = pstmt.executeQuery();
		   
		   if(rs.next()) {
			   userid = rs.getString("userid");
		   }   
	   } catch (UnsupportedEncodingException | GeneralSecurityException e) {
		   e.printStackTrace();
	   } finally {
		   close();
	   }
	   return userid;
   }//EoP public String findUserid(Map<String, String> paraMap) throws SQLException { } 

   
   
   
   // 비밀번호 찾기(아이디, 이메일을 입력받아서 해당 사용자가 존재하는지 여부를 알려준다.) 
   	@Override	
   	public boolean isUserExists(Map<String, String> paraMap) throws SQLException {
   		
   		boolean isUSerExists = false;
   		try {
   			conn = ds.getConnection();
   			String sql = " select userid "
 			     	   + " from tbl_member "
 			   		   + " where status = 1  and userid = ? and email = ? ";
 		
   			pstmt = conn.prepareStatement(sql);
   			pstmt.setString(1, paraMap.get("userid"));
   			pstmt.setString(2, aes.encrypt(paraMap.get("email")));
 		   
   			rs = pstmt.executeQuery();
 		   
   			isUSerExists = rs.next();
   			
   		} catch (UnsupportedEncodingException | GeneralSecurityException e) {
   			e.printStackTrace();
   		} finally {
   			close();
   		}
   		
   		return isUSerExists;
   	}

   	
	// 비밀번호 찾기 후 정상적인 인증 완료하였을때, 비밀번호를 새로 변경한다. 
	@Override
	public int pwdUpdate(Map<String, String> paraMap) throws SQLException {
		int result = 0;
		
		try {
			conn = ds.getConnection();
			String sql = " update tbl_member set pwd = ?, lastpwdchangedate = sysdate " 
	                   + " where userid = ? ";
			
			pstmt = conn.prepareStatement(sql);
	         
	        pstmt.setString(1, Sha256.encrypt(paraMap.get("new_pwd")) ); // 암호를 SHA256 알고리즘으로 단방향 암호화 시킨다.
	        pstmt.setString(2, paraMap.get("userid") );  
	         
	        result = pstmt.executeUpdate();
			
		} finally {
			close();
		}
		
		
		return result;
	}// EoP public int pwdUpdate(Map<String, String> paraMap) throws SQLException {}
}
