---- **** MyMVC 다이내믹웹프로젝트 에서 작업한 것 **** ----

-- 오라클 계정 생성을 위해서는 SYS 또는 SYSTEM 으로 연결하여 작업을 해야 합니다. [SYS 시작] --
show user;
-- USER이(가) "SYS"입니다.


-- 오라클 계정 생성시 계정명 앞에 c## 붙이지 않고 생성하도록 하겠습니다.
alter session set "_ORACLE_SCRIPT"=true;
-- Session이(가) 변경되었습니다.

-- 오라클 계정명은 MYMVC_USER 이고 암호는 gclass 인 사용자 계정을 생성합니다.
create user MYMVC_USER identified by sistsix default tablespace users; 
-- User MYMVC_USER이(가) 생성되었습니다.

-- 위에서 생성되어진 MYMVC_USER 이라는 오라클 일반사용자 계정에게 오라클 서버에 접속이 되어지고,
-- 테이블 생성 등등을 할 수 있도록 여러가지 권한을 부여해주겠습니다.
grant connect, resource, create view, unlimited tablespace to MYMVC_USER;
-- Grant을(를) 성공했습니다.

-----------------------------------------------------------------------

show user;
-- USER이(가) "MYMVC_USER"입니다.


create table tbl_main_page
(imgno        number  not null
,imgname      Nvarchar2(20) not null
,imgfilename  Nvarchar2(30) not null
,constraint   PK_tbl_main_page_imgno primary key(imgno)
);
-- Table TBL_MAIN_PAGE이(가) 생성되었습니다.

create sequence seq_main_image
start with 1
increment by 1
nomaxvalue
nominvalue
nocycle
nocache;
-- Sequence SEQ_MAIN_IMAGE이(가) 생성되었습니다.

insert into tbl_main_page(imgno, imgname, imgfilename) values(seq_main_image.nextval, '미샤', '미샤.png');      
insert into tbl_main_page(imgno, imgname, imgfilename) values(seq_main_image.nextval, '원더플레이스', '원더플레이스.png');
insert into tbl_main_page(imgno, imgname, imgfilename) values(seq_main_image.nextval, '레노보', '레노보.png');
insert into tbl_main_page(imgno, imgname, imgfilename) values(seq_main_image.nextval, '동원', '동원.png');

commit;
-- 커밋 완료.

select imgno, imgname, imgfilename
from tbl_main_page
order by imgno asc;


select * from tbl_gogek;

---------*****회원 테이블 생성*****---------
/*
    평문(plain text) ==> 암호화가 안된 문자 
    I am a boy
    
    암호화된 문장(encrypted text)
    평문(plain text) + 암호화키(key)
    I am a boy + 1 ==> J bn b cpz 
    
    
    복호화된 문장(decrypted text) ==> 해독된 문장
    
    암호화된 문장(encrypted text) + 암호화키(key)
    J bn b cpz - 1 ==> I am a boy
    
    AES256 방식 ==> 양방향 암호화 (암호화 및 복호화 가능함) , 암호화키(key)가 반드시 필요함.
    SHA256 방식 ==> 단방향 암호화 (암호화만 되어지고 복호화가 불가능함), 암호화키(key)가 없음.
*/
create table tbl_member    
(userseq            number         not null  -- 회원번호
,userid             varchar2(40)   not null  -- 회원아이디
,pwd                varchar2(200)  not null  -- 비밀번호 (SHA-256 암호화 대상)
,name               varchar2(30)   not null  -- 회원명
,email              varchar2(200)  not null  -- 이메일 (AES-256 암호화/복호화 대상)
,mobile             varchar2(200)            -- 연락처 (AES-256 암호화/복호화 대상) 
,postcode           varchar2(5)              -- 우편번호
,address            varchar2(200)            -- 주소
,detailaddress      varchar2(200)            -- 상세주소
,extraaddress       varchar2(200)            -- 참고항목
,gender             varchar2(1)              -- 성별   남자:1  / 여자:2
,birthday           varchar2(10)             -- 생년월일   
,coin               number default 0         -- 코인액
,point              number default 0         -- 포인트 
,registerday        date default sysdate     -- 가입일자 
,lastpwdchangedate  date default sysdate     -- 마지막으로 암호를 변경한 날짜  
,status             number(1) default 1 not null     -- 회원탈퇴유무   1: 사용가능(가입중) / 0:사용불능(탈퇴) 
,idle               number(1) default 0 not null     -- 휴면유무      0 : 활동중  /  1 : 휴면중 
,constraint PK_tbl_member_userid primary key(userid)
,constraint UQ_tbl_member_email  unique(email)
,constraint UQ_tbl_member_userseq unique(userseq)
,constraint CK_tbl_member_gender check( gender in('1','2') )
,constraint CK_tbl_member_status check( status in(0,1) )
,constraint CK_tbl_member_idle check( idle in(0,1) )
);
-- Table TBL_MEMBER이(가) 생성되었습니다.

select *
from tbl_member
order by registerday desc;


create table tbl_loginhistory
(historyno   number
,fk_userid   varchar2(40) not null  -- 회원아이디
,logindate   date default sysdate not null -- 로그인되어진 접속날짜및시간
,clientip    varchar2(20) not null
,constraint  PK_tbl_loginhistory primary key(historyno)
,constraint  FK_tbl_loginhistory_fk_userid foreign key(fk_userid) references tbl_member(userid)
);
-- Table TBL_LOGINHISTORY이(가) 생성되었습니다.

create sequence seq_historyno
start with 1
increment by 1
nomaxvalue
nominvalue
nocycle
nocache;
-- Sequence SEQ_HISTORYNO이(가) 생성되었습니다.


select * 
from tbl_loginhistory
order by historyno desc;


-- 로그인 처리를 위한 SQL 문 작성 -- 
update tbl_member set registerday = add_months(registerday, -14),
                    lastpwdchangedate = add_months(lastpwdchangedate, -13)
where userid = 'kangkc';
commit;

update tbl_member set registerday = add_months(registerday, -5),
                    lastpwdchangedate = add_months(lastpwdchangedate, -4)
where userid = 'leess';
commit;


SELECT userid, name, coin, point, 
    trunc( months_between(sysdate, lastpwdchangedate) ) AS pwdchangegap, 
    registerday, idle, email, mobile, postcode, address, detailaddress, extraaddress  
FROM tbl_member
WHERE status = 1 AND userid = 'sonyd' and pwd = '18006e2ca1c2129392c66d87334bd2452c572058d406b4e85f43c1f72def10f5';


-- 1219

select *
from tbl_member
where status = 1  and name = '손영대' and email = 'tOqmu3jV6wLKut4yIYx4fzUOY6CzWcnls0+u0mrGOec=';



alter table tbl_member
drop constraint UQ_TBL_MEMBER_EMAIL;
-- Table TBL_MEMBER이(가) 변경되었습니다.

select * 
from user_constraints
where table_name = 'TBL_MEMBER';

create or replace procedure pcd_member_insert
(p_userid   IN  varchar2
,p_name     IN  varchar2
,p_gender   IN  char)
is
begin
   for i in 1..100 loop
      insert into tbl_member(userid, pwd, name, email, mobile, postcode, address, detailaddress, extraaddress, gender, birthday) 
      values(p_userid||i, '18006e2ca1c2129392c66d87334bd2452c572058d406b4e85f43c1f72def10f5', p_name||i, 'tOqmu3jV6wLKut4yIYx4fzUOY6CzWcnls0+u0mrGOec=', 'O9JYIGRGgccnczBzYBEW7g==', 
            '15864', '경기 군포시 오금로 15-17', '101동 102호', ' (금정동)', p_gender, '1993-10-11'); 
   end loop;
end pcd_member_insert; 
-- Procedure PCD_MEMBER_INSERT이(가) 컴파일되었습니다.

exec pcd_member_insert('kangsora', '강소라', 2);
-- PL/SQL 프로시저가 성공적으로 완료되었습니다.
commit;

exec pcd_member_insert('choiws', '최우식', 1);
-- PL/SQL 프로시저가 성공적으로 완료되었습니다.
commit;

    
    
    
select *
from tbl_member
order by registerday desc;


select *
from tbl_member
where userid != 'admin'
and name like '%'||'손'||'%'
order by registerday desc;


DELETE FROM tbl_member
WHERE name LIKE '%강소%'
   OR name LIKE '%최우%';

COMMIT;


---------------------------------------------------------------------------------------------------------

------ *********************************************************************** ------
select userid, name, to_char(registerday, 'yyyy-mm-dd hh24:mi:ss sssssss') AS 가입일자
from tbl_member
where userid != 'admin'
order by registerday desc; 
/* 
   registerday 컬럼의 값이 같은 행이 있을 경우 
   페이징처리를 위해
   ORDER BY registerday DESC
   OFFSET (@PAGE_NO-1)*@PAGE_SIZE ROW   -- @PAGE_NO ==> 페이지 번호 , @PAGE_SIZE ==> 한 페이지에 보여줄 row 수
   FETCH NEXT @PAGE_SIZE ROW ONLY
   을 사용시 올바르게 SORT 가 안되어진다.
   그래서 회원가입시 "회원번호" 라는 컬럼을 주고 여기에는 sequence 값을 넣고 Primary Key 제약 또는 Unique 제약을 넣어주어야 한다.!!! 
*/

---> tbl_member 테이블에 userseq 라는 컬럼을 추가하고 이 컬럼에 unique 제약을 주도록 하겠다. <---
-- 먼저 백업을 해둔다.
create table tbl_member_backup
as
select * from tbl_member;
-- Table TBL_MEMBER_BACKUP이(가) 생성되었습니다.

select *
from tbl_member_backup;


-- 다음으로, tbl_member 테이블의 userseq 컬럼에 사용될 sequence 를 생성한다.
create sequence seq_userseq
start with 1
increment by 1
nomaxvalue
nominvalue
nocycle
nocache;
-- Sequence SEQ_USERSEQ이(가) 생성되었습니다.

-- 다음으로, tbl_member 테이블에 userseq 라는 컬럼을 추가한다.
alter table tbl_member
add userseq number;
-- Table TBL_MEMBER이(가) 변경되었습니다.

select userid, name, userseq
from tbl_member;

delete from tbl_member
where userid like '%'||'kangsora'||'%';
-- 100개 행 이(가) 삭제되었습니다.

delete from tbl_member
where userid like '%'||'choiws'||'%';
-- 100개 행 이(가) 삭제되었습니다.

delete from tbl_member
where userid like '%'||'iyou'||'%';
-- 100개 행 이(가) 삭제되었습니다.

delete from tbl_member
where userid in('kimyousin','youinna');
-- 2개 행 이(가) 삭제되었습니다.

delete from tbl_member
where userid in('ㄴ');

select userid, name, userseq, to_char(registerday, 'yyyy-mm-dd hh24:mi:ss') AS 가입일자
from tbl_member
order by registerday asc;

update tbl_member set userseq = seq_userseq.nextval
where userid = 'kangkc';

update tbl_member set userseq = seq_userseq.nextval
where userid = 'leess';

update tbl_member set userseq = seq_userseq.nextval
where userid = 'eomjh';

update tbl_member set userseq = seq_userseq.nextval
where userid = 'angkc';

update tbl_member set userseq = seq_userseq.nextval
where userid = 'admin';

update tbl_member set userseq = seq_userseq.nextval
where userid = 'sonyd';

select userid, name, userseq, to_char(registerday, 'yyyy-mm-dd hh24:mi:ss') AS 가입일자
from tbl_member
order by registerday asc;

commit;
-- 커밋 완료.

-- 다음으로, tbl_member 테이블의 userseq 컬럼에 unique 제약을 추가한다.
alter table tbl_member
add constraint UQ_tbl_member_userseq unique(userseq);

-- 다음으로, tbl_member 테이블의 userseq 컬럼에 not null 제약을 추가한다.
alter table tbl_member
modify userseq constraint NN_tbl_member_userseq not null;

select * from tbl_member;

create or replace procedure pcd_member_insert
(p_userid   IN  varchar2
,p_name     IN  varchar2
,p_gender   IN  char)
is
begin
   for i in 1..100 loop
      insert into tbl_member(userseq, userid, pwd, name, email, mobile, postcode, address, detailaddress, extraaddress, gender, birthday) 
      values(seq_userseq.nextval, p_userid||i, '18006e2ca1c2129392c66d87334bd2452c572058d406b4e85f43c1f72def10f5', p_name||i, 'tOqmu3jV6wLKut4yIYx4fzUOY6CzWcnls0+u0mrGOec=', 'O9JYIGRGgccnczBzYBEW7g==', 
            '15864', '경기 군포시 오금로 15-17', '101동 102호', ' (금정동)', p_gender, '1993-10-11'); 
   end loop;
end pcd_member_insert; 
-- Procedure PCD_MEMBER_INSERT이(가) 컴파일되었습니다.

exec pcd_member_insert('kangsora', '강소라', 2);
-- PL/SQL 프로시저가 성공적으로 완료되었습니다.
commit;

exec pcd_member_insert('choiws', '최우식', 1);
-- PL/SQL 프로시저가 성공적으로 완료되었습니다.
commit;

exec pcd_member_insert('iyou', '아이유', 2);
-- PL/SQL 프로시저가 성공적으로 완료되었습니다.
commit;

insert into tbl_member(userseq, userid, pwd, name, email, mobile, postcode, address, detailaddress, extraaddress, gender, birthday) 
values(seq_userseq.nextval, 'kimyousin', '18006e2ca1c2129392c66d87334bd2452c572058d406b4e85f43c1f72def10f5', '김유신', 'tOqmu3jV6wLKut4yIYx4fzUOY6CzWcnls0+u0mrGOec=', 'O9JYIGRGgccnczBzYBEW7g==', 
       '15864', '경기 군포시 오금로 15-17', '101동 102호', ' (금정동)', '1', '1984-10-11');
       
insert into tbl_member(userseq, userid, pwd, name, email, mobile, postcode, address, detailaddress, extraaddress, gender, birthday) 
values(seq_userseq.nextval, 'youinna', '18006e2ca1c2129392c66d87334bd2452c572058d406b4e85f43c1f72def10f5', '유인나', 'tOqmu3jV6wLKut4yIYx4fzUOY6CzWcnls0+u0mrGOec=', 'O9JYIGRGgccnczBzYBEW7g==', 
       '15864', '경기 군포시 오금로 15-17', '101동 102호', ' (금정동)', '2', '2001-10-11');       
            
commit;  

select userseq, userid, name, to_char(registerday, 'yyyy-mm-dd hh24:mi:ss') AS 가입일자
from tbl_member
order by userseq desc;  
-- order by registerday desc; 로 했다면 모두 order by userseq desc; 로 변경할 것!!!

------ *********************************************************************** ------





-----**** oralce 버전 12C 이후 부터 지원되어지는 OFFSET - FETCH를 사용하여 페이징 처리 하기. ****-----
select userid, name, email, gender
from tbl_member
where userid != 'admin'
and name like '%'||'최'||'%'
--and userid like '%'||'3'||'%'
--and email = 'eomjh@gmail.com'
order by userseq desc
OFFSET (1-1)*10 ROW
FETCH NEXT 10 ROW ONLY; --1페이지 
-------------------------------------------------------------------
select userid, name, email, gender
from tbl_member
where userid != 'admin'
and name like '%'||'최'||'%'
--and userid like '%'||'3'||'%'
--and email = 'eomjh@gmail.com'
order by userseq desc
OFFSET (2-1)*10 ROW
FETCH NEXT 10 ROW ONLY; --2페이지 
--------------------------------------------------------------------
select userid, name, email, gender
from tbl_member
where userid != 'admin'
and name like '%'||'최'||'%'
--and userid like '%'||'3'||'%'
--and email = 'eomjh@gmail.com'
order by userseq desc
OFFSET (3-1)*10 ROW
FETCH NEXT 10 ROW ONLY; --3페이지 


/*
>> !!문법!! <<
ORDER BY boardno desc
OFFSET (@PAGE_NO-1)*@PAGE_SIZE ROW   -- @PAGE_NO ==> 페이지 번호 , @PAGE_SIZE ==> 한 페이지에 보여줄 row 수
FETCH NEXT @PAGE_SIZE ROW ONLY

order by 로 정렬 기준 정하고
offset을 통해 페이징 할 때마다 건너뛸 행의 수 설정
fetch next에서 몇 개의 행을 가져올지 결정
*/

select * from tab;
select * from tbl_member;



select userid, name, to_char(registerday, 'yyyy-mm-dd hh24:mi:ss sssssss') AS 가입일자
from tbl_member
where userid != 'admin'
order by userseq desc;







-----------------------------------------------------------------------------------------------------------



-- 만약 조회하고자 하는 회원수(행의개수)가 306개 라면 페이지당 10 개씩 보여줬을때 페이지 번호가 몇개 까지 나와야 하는지 
select 306/10, ceil(306/10) from dual;
--30.6	31

-- 만약 조회하고자 하는 회원수(행의개수)가 306개 라면 페이지당 5 개씩 보여줬을때 페이지 번호가 몇개 까지 나와야 하는지 
select 306/5, ceil(306/5) from dual;
-- 61.2	62

-- 만약 조회하고자 하는 회원수(행의개수)가 306개 라면 페이지당 3 개씩 보여줬을때 페이지 번호가 몇개 까지 나와야 하는지 
select 306/3, ceil(306/3) from dual;
-- 102	102




-----------------------------------------------------------------------------------------------------------
select *
from tbl_member
where status =1 and name like '%'||'강'||'%'
order by userseq;






