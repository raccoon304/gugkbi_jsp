function updatePerson(seq){ //넘어온 회원번호를 가지고 POST 방식으로 보내버리는 기능 
	const frm = document.update_delete_frm;
	frm.seq.value = seq;
	
	frm.action = "personUpdate.do";
	frm.method = "post";
	frm.submit();
}// EoP function updatePerson(seq)

function deletePerson(seq, name){ //넘어온 회원번호를 가지고 POST 방식으로 보내버리는 기능 
	if(confirm("정말 회원번호"+seq+"번"+name+"님 삭제하시겠습니까?")){
		alert("회원번호"+seq+"인"+name+" 님 삭제되었습니다.")
		const frm = document.update_delete_frm;
		frm.seq.value = seq;
		frm.action = "personDelete.do";
		frm.method = "post";
		frm.submit();
	}
}// EoP function deletePerson(seq)


