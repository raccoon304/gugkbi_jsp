<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<script type="text/javascript">
	alert("${message}"); // 메시지 출력해주기
	location.href = "${loc}"; // request.setAttribute로 받아온거라 앞에 requestScope. 이 생략된거임. 
</script>