package chap05.oracle.model;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import chap05.oracle.domain.PersonDTO_02;

public class PersonDAO_imple_04 implements PersonDAO_03 {
	
	private Connection conn = MyDBConnection_05.getConn();
	private PreparedStatement pstmt;
	private ResultSet rs;
	
	private void close() {
      try {
         if(rs != null)      {rs.close(); rs=null;}
         if(pstmt != null) {pstmt.close(); pstmt=null;}
      } catch(SQLException e) {
         e.printStackTrace();
      }
   }// end of private void close()-------------------------
	
	
	// 개인성향을 입력(insert)하게 해주는 메서드 
	@Override
	public int personRegister(PersonDTO_02 psdto) throws SQLException {
		
		int n = 0;
		try {
			String sql = " insert into tbl_person_interest(seq, name, school, color, food)"
					+ " values(person_seq.nextval,?,?,?,?) ";
			
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, psdto.getName());
			pstmt.setString(2, psdto.getSchool());
			pstmt.setString(3, psdto.getColor());
			
			if(psdto.getFood() != null) {
				pstmt.setString(4, String.join(",", psdto.getFood()));
			}
			else {
				pstmt.setString(4, null);
			}
			
			n = pstmt.executeUpdate();
			
			
		} catch (Exception e) {
			close();
		}
		
		return n;
	}// ===== EoP public int personRegister =====


	@Override
	public List<PersonDTO_02> selectAll() {
		
		List<PersonDTO_02> personList = new ArrayList<>();
		
		try {
			String sql =  " select seq, name, school, color, food "
						+ "     , to_char(registerday, 'yyyy-mm-dd hh24:mi:ss') AS registerday "
						+ "     , NVL(to_char(updateday, 'yyyy-mm-dd hh24:mi:ss'), ' ') AS updateday "
						+ " from tbl_person_interest "
						+ " order by seq";
			
			pstmt = conn.prepareStatement(sql);
			rs = pstmt.executeQuery();
			
			while(rs.next()) {
				PersonDTO_02 psdto = new PersonDTO_02();
				psdto.setSeq(rs.getInt("seq"));
				psdto.setName(rs.getString("name"));
				psdto.setSchool(rs.getString("school"));
				psdto.setColor(rs.getString("color"));
				
				String foodes = rs.getString("food");				
				
				if(foodes != null ) {
					psdto.setFood(foodes.split("\\,"));
				}
				else {
					psdto.setFood(null);
				}
					
				psdto.setRegisterday(rs.getString("registerday"));
				psdto.setUpdateday(rs.getString("updateday"));
				
				personList.add(psdto);
					
				
			}// EoP while 
			
			
		} catch (Exception e) {
			
		}finally {
			close();
		}
		
		
		return personList;
	}//EoP public List<PersonDTO_02> selectAll()


	// tbl_person_interest테이블에 저장되어진 특정 1개 행만 읽어오는 select 추상메서드(미완성 메서드)
	@Override
	public PersonDTO_02 selectOne(String seq) throws SQLException{
		
		PersonDTO_02 psdto = null;

		try {
			String sql =  " select seq, name, school, color, food "
						+ "     , to_char(registerday, 'yyyy-mm-dd hh24:mi:ss') AS registerday "
						+ "     , NVL(to_char(updateday, 'yyyy-mm-dd hh24:mi:ss'), ' ') AS updateday "
						+ " from tbl_person_interest "
						+ " where seq = to_number(?) ";
			
			
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, seq);
			
			rs = pstmt.executeQuery();
			
			if(rs.next()) {
				
				psdto = new PersonDTO_02();
				psdto.setSeq(rs.getInt("seq"));
				psdto.setName(rs.getString("name"));
				psdto.setSchool(rs.getString("school"));
				psdto.setColor(rs.getString("color"));
				
				String foodes = rs.getString("food");				
				
				if(foodes != null ) {
					psdto.setFood(foodes.split("\\,"));
				}
				else {
					psdto.setFood(null);
				}
					
				psdto.setRegisterday(rs.getString("registerday"));
				psdto.setUpdateday(rs.getString("updateday"));
				
			}// EoP if
		} finally {
			close();
		}
		return psdto;
	}

	/* tbl_person_interest테이블에 저장되어진 특정 1개 행을 수정 update 해주는 메서드 */
	@Override
	public int updatePerson(PersonDTO_02 psdto) throws SQLException {
		
		int n = 0;
		
		try {
			String sql = " update tbl_person_interest set name=? , school=?, color=?, food=?, updateday=sysdate"
					+ " where seq = ? ";
			
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, psdto.getName());
			pstmt.setString(2, psdto.getSchool());
			pstmt.setString(3, psdto.getColor());
			
			if(psdto.getFood() != null) {
				pstmt.setString(4, String.join(",", psdto.getFood()));
			}
			else {
				pstmt.setString(4, null);
			}
			
			pstmt.setInt(5, psdto.getSeq());
			
			n = pstmt.executeUpdate();
			
			
		} catch (Exception e) {
			close();
		}
		return n;
	}// EoP public int updatePerson(PersonDTO_02 psdto) throws SQLException


	@Override
	public int deletePerson(PersonDTO_02 dto) throws SQLException {
		int n = 0;
		
		try {
			String sql = " delete from tbl_person_interest "
					+ " where seq = ? ";
			
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1, dto.getSeq());
			
			n = pstmt.executeUpdate();
			
		} catch (Exception e) {
			close();
		}
		return n;
	}
}
