package chap05.oracle.model;

import java.sql.SQLException;
import java.util.List;

import chap05.oracle.domain.PersonDTO_02;

public interface PersonDAO_03 {
	// 개인성향을 입력(insert)해주는 추상메서드(미완성메서드)
	int personRegister(PersonDTO_02 psdto) throws SQLException;

	// tbl_person_interest테이블에 저장되어진 행(데이터)을 읽어오는(select) 추상메서드(미완성 메서드)
	List<PersonDTO_02> selectAll() throws SQLException;

	// tbl_person_interest테이블에 저장되어진 특정 1개 행만 읽어오는 select 추상메서드(미완성 메서드)
	PersonDTO_02 selectOne(String seq) throws SQLException;

	// tbl_person_interest테이블에 저장되어진 특정 1개 행을 수정 update 해주는 추상메서드(미완성 메서드)
	int updatePerson(PersonDTO_02 psdto) throws SQLException;

	int deletePerson(PersonDTO_02 dto) throws SQLException;
	
}
