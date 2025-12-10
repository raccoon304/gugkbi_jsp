package chap05.oracle.model;

import java.sql.SQLException;

import chap05.oracle.domain.PersonDTO_02;

public interface PersonDAO_03 {
	// 개인성향을 입력(insert)해주는 추상메서드(미완성메서드)
	int personRegister(PersonDTO_02 psdto) throws SQLException;
	
}
