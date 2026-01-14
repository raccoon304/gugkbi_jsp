---- **** MyMVC �떎�씠�궡誘뱀쎒�봽濡쒖젥�듃 �뿉�꽌 �옉�뾽�븳 寃� **** ----

-- �삤�씪�겢 怨꾩젙 �깮�꽦�쓣 �쐞�빐�꽌�뒗 SYS �삉�뒗 SYSTEM �쑝濡� �뿰寃고븯�뿬 �옉�뾽�쓣 �빐�빞 �빀�땲�떎. [SYS �떆�옉] --
show user;
-- USER�씠(媛�) "SYS"�엯�땲�떎.


-- �삤�씪�겢 怨꾩젙 �깮�꽦�떆 怨꾩젙紐� �븵�뿉 c## 遺숈씠吏� �븡怨� �깮�꽦�븯�룄濡� �븯寃좎뒿�땲�떎.
alter session set "_ORACLE_SCRIPT"=true;
-- Session�씠(媛�) 蹂�寃쎈릺�뿀�뒿�땲�떎.

-- �삤�씪�겢 怨꾩젙紐낆� MYMVC_USER �씠怨� �븫�샇�뒗 gclass �씤 �궗�슜�옄 怨꾩젙�쓣 �깮�꽦�빀�땲�떎.
create user MYMVC_USER identified by sistsix default tablespace users; 
-- User MYMVC_USER�씠(媛�) �깮�꽦�릺�뿀�뒿�땲�떎.

-- �쐞�뿉�꽌 �깮�꽦�릺�뼱吏� MYMVC_USER �씠�씪�뒗 �삤�씪�겢 �씪諛섏궗�슜�옄 怨꾩젙�뿉寃� �삤�씪�겢 �꽌踰꾩뿉 �젒�냽�씠 �릺�뼱吏�怨�,
-- �뀒�씠釉� �깮�꽦 �벑�벑�쓣 �븷 �닔 �엳�룄濡� �뿬�윭媛�吏� 沅뚰븳�쓣 遺��뿬�빐二쇨쿋�뒿�땲�떎.
grant connect, resource, create view, unlimited tablespace to MYMVC_USER;
-- Grant�쓣(瑜�) �꽦怨듯뻽�뒿�땲�떎.

-----------------------------------------------------------------------

show user;
-- USER�씠(媛�) "MYMVC_USER"�엯�땲�떎.


create table tbl_main_page
(imgno        number  not null
,imgname      Nvarchar2(20) not null
,imgfilename  Nvarchar2(30) not null
,constraint   PK_tbl_main_page_imgno primary key(imgno)
);
-- Table TBL_MAIN_PAGE�씠(媛�) �깮�꽦�릺�뿀�뒿�땲�떎.

create sequence seq_main_image
start with 1
increment by 1
nomaxvalue
nominvalue
nocycle
nocache;
-- Sequence SEQ_MAIN_IMAGE�씠(媛�) �깮�꽦�릺�뿀�뒿�땲�떎.

insert into tbl_main_page(imgno, imgname, imgfilename) values(seq_main_image.nextval, '誘몄깶', '誘몄깶.png');      
insert into tbl_main_page(imgno, imgname, imgfilename) values(seq_main_image.nextval, '�썝�뜑�뵆�젅�씠�뒪', '�썝�뜑�뵆�젅�씠�뒪.png');
insert into tbl_main_page(imgno, imgname, imgfilename) values(seq_main_image.nextval, '�젅�끂蹂�', '�젅�끂蹂�.png');
insert into tbl_main_page(imgno, imgname, imgfilename) values(seq_main_image.nextval, '�룞�썝', '�룞�썝.png');

commit;
-- 而ㅻ컠 �셿猷�.

select imgno, imgname, imgfilename
from tbl_main_page
order by imgno asc;


select * from tbl_gogek;

---------*****�쉶�썝 �뀒�씠釉� �깮�꽦*****---------
/*
    �룊臾�(plain text) ==> �븫�샇�솕媛� �븞�맂 臾몄옄 
    I am a boy
    
    �븫�샇�솕�맂 臾몄옣(encrypted text)
    �룊臾�(plain text) + �븫�샇�솕�궎(key)
    I am a boy + 1 ==> J bn b cpz 
    
    
    蹂듯샇�솕�맂 臾몄옣(decrypted text) ==> �빐�룆�맂 臾몄옣
    
    �븫�샇�솕�맂 臾몄옣(encrypted text) + �븫�샇�솕�궎(key)
    J bn b cpz - 1 ==> I am a boy
    
    AES256 諛⑹떇 ==> �뼇諛⑺뼢 �븫�샇�솕 (�븫�샇�솕 諛� 蹂듯샇�솕 媛��뒫�븿) , �븫�샇�솕�궎(key)媛� 諛섎뱶�떆 �븘�슂�븿.
    SHA256 諛⑹떇 ==> �떒諛⑺뼢 �븫�샇�솕 (�븫�샇�솕留� �릺�뼱吏�怨� 蹂듯샇�솕媛� 遺덇��뒫�븿), �븫�샇�솕�궎(key)媛� �뾾�쓬.
*/
create table tbl_member    
(userseq            number         not null  -- �쉶�썝踰덊샇
,userid             varchar2(40)   not null  -- �쉶�썝�븘�씠�뵒
,pwd                varchar2(200)  not null  -- 鍮꾨�踰덊샇 (SHA-256 �븫�샇�솕 ���긽)
,name               varchar2(30)   not null  -- �쉶�썝紐�
,email              varchar2(200)  not null  -- �씠硫붿씪 (AES-256 �븫�샇�솕/蹂듯샇�솕 ���긽)
,mobile             varchar2(200)            -- �뿰�씫泥� (AES-256 �븫�샇�솕/蹂듯샇�솕 ���긽) 
,postcode           varchar2(5)              -- �슦�렪踰덊샇
,address            varchar2(200)            -- 二쇱냼
,detailaddress      varchar2(200)            -- �긽�꽭二쇱냼
,extraaddress       varchar2(200)            -- 李멸퀬�빆紐�
,gender             varchar2(1)              -- �꽦蹂�   �궓�옄:1  / �뿬�옄:2
,birthday           varchar2(10)             -- �깮�뀈�썡�씪   
,coin               number default 0         -- 肄붿씤�븸
,point              number default 0         -- �룷�씤�듃 
,registerday        date default sysdate     -- 媛��엯�씪�옄 
,lastpwdchangedate  date default sysdate     -- 留덉�留됱쑝濡� �븫�샇瑜� 蹂�寃쏀븳 �궇吏�  
,status             number(1) default 1 not null     -- �쉶�썝�깉�눜�쑀臾�   1: �궗�슜媛��뒫(媛��엯以�) / 0:�궗�슜遺덈뒫(�깉�눜) 
,idle               number(1) default 0 not null     -- �쑕硫댁쑀臾�      0 : �솢�룞以�  /  1 : �쑕硫댁쨷 
,constraint PK_tbl_member_userid primary key(userid)
,constraint UQ_tbl_member_email  unique(email)
,constraint UQ_tbl_member_userseq unique(userseq)
,constraint CK_tbl_member_gender check( gender in('1','2') )
,constraint CK_tbl_member_status check( status in(0,1) )
,constraint CK_tbl_member_idle check( idle in(0,1) )
);
-- Table TBL_MEMBER�씠(媛�) �깮�꽦�릺�뿀�뒿�땲�떎.

select *
from tbl_member
order by registerday desc;


create table tbl_loginhistory
(historyno   number
,fk_userid   varchar2(40) not null  -- �쉶�썝�븘�씠�뵒
,logindate   date default sysdate not null -- 濡쒓렇�씤�릺�뼱吏� �젒�냽�궇吏쒕컦�떆媛�
,clientip    varchar2(20) not null
,constraint  PK_tbl_loginhistory primary key(historyno)
,constraint  FK_tbl_loginhistory_fk_userid foreign key(fk_userid) references tbl_member(userid)
);
-- Table TBL_LOGINHISTORY�씠(媛�) �깮�꽦�릺�뿀�뒿�땲�떎.

create sequence seq_historyno
start with 1
increment by 1
nomaxvalue
nominvalue
nocycle
nocache;
-- Sequence SEQ_HISTORYNO�씠(媛�) �깮�꽦�릺�뿀�뒿�땲�떎.


select * 
from tbl_loginhistory
order by historyno desc;


-- 濡쒓렇�씤 泥섎━瑜� �쐞�븳 SQL 臾� �옉�꽦 -- 
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
where status = 1  and name = '�넀�쁺��' and email = 'tOqmu3jV6wLKut4yIYx4fzUOY6CzWcnls0+u0mrGOec=';



alter table tbl_member
drop constraint UQ_TBL_MEMBER_EMAIL;
-- Table TBL_MEMBER�씠(媛�) 蹂�寃쎈릺�뿀�뒿�땲�떎.

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
            '15864', '寃쎄린 援고룷�떆 �삤湲덈줈 15-17', '101�룞 102�샇', ' (湲덉젙�룞)', p_gender, '1993-10-11'); 
   end loop;
end pcd_member_insert; 
-- Procedure PCD_MEMBER_INSERT�씠(媛�) 而댄뙆�씪�릺�뿀�뒿�땲�떎.

exec pcd_member_insert('kangsora', '媛뺤냼�씪', 2);
-- PL/SQL �봽濡쒖떆��媛� �꽦怨듭쟻�쑝濡� �셿猷뚮릺�뿀�뒿�땲�떎.
commit;

exec pcd_member_insert('choiws', '理쒖슦�떇', 1);
-- PL/SQL �봽濡쒖떆��媛� �꽦怨듭쟻�쑝濡� �셿猷뚮릺�뿀�뒿�땲�떎.
commit;

    
    
    
select *
from tbl_member
order by registerday desc;


select *
from tbl_member
where userid != 'admin'
and name like '%'||'�넀'||'%'
order by registerday desc;


DELETE FROM tbl_member
WHERE name LIKE '%媛뺤냼%'
   OR name LIKE '%理쒖슦%';

COMMIT;


---------------------------------------------------------------------------------------------------------

------ *********************************************************************** ------
select userid, name, to_char(registerday, 'yyyy-mm-dd hh24:mi:ss sssssss') AS 媛��엯�씪�옄
from tbl_member
where userid != 'admin'
order by registerday desc; 
/* 
   registerday 而щ읆�쓽 媛믪씠 媛숈� �뻾�씠 �엳�쓣 寃쎌슦 
   �럹�씠吏뺤쿂由щ�� �쐞�빐
   ORDER BY registerday DESC
   OFFSET (@PAGE_NO-1)*@PAGE_SIZE ROW   -- @PAGE_NO ==> �럹�씠吏� 踰덊샇 , @PAGE_SIZE ==> �븳 �럹�씠吏��뿉 蹂댁뿬以� row �닔
   FETCH NEXT @PAGE_SIZE ROW ONLY
   �쓣 �궗�슜�떆 �삱諛붾Ⅴ寃� SORT 媛� �븞�릺�뼱吏꾨떎.
   洹몃옒�꽌 �쉶�썝媛��엯�떆 "�쉶�썝踰덊샇" �씪�뒗 而щ읆�쓣 二쇨퀬 �뿬湲곗뿉�뒗 sequence 媛믪쓣 �꽔怨� Primary Key �젣�빟 �삉�뒗 Unique �젣�빟�쓣 �꽔�뼱二쇱뼱�빞 �븳�떎.!!! 
*/

---> tbl_member �뀒�씠釉붿뿉 userseq �씪�뒗 而щ읆�쓣 異붽��븯怨� �씠 而щ읆�뿉 unique �젣�빟�쓣 二쇰룄濡� �븯寃좊떎. <---
-- 癒쇱� 諛깆뾽�쓣 �빐�몦�떎.
create table tbl_member_backup
as
select * from tbl_member;
-- Table TBL_MEMBER_BACKUP�씠(媛�) �깮�꽦�릺�뿀�뒿�땲�떎.

select *
from tbl_member_backup;


-- �떎�쓬�쑝濡�, tbl_member �뀒�씠釉붿쓽 userseq 而щ읆�뿉 �궗�슜�맆 sequence 瑜� �깮�꽦�븳�떎.
create sequence seq_userseq
start with 1
increment by 1
nomaxvalue
nominvalue
nocycle
nocache;
-- Sequence SEQ_USERSEQ�씠(媛�) �깮�꽦�릺�뿀�뒿�땲�떎.

-- �떎�쓬�쑝濡�, tbl_member �뀒�씠釉붿뿉 userseq �씪�뒗 而щ읆�쓣 異붽��븳�떎.
alter table tbl_member
add userseq number;
-- Table TBL_MEMBER�씠(媛�) 蹂�寃쎈릺�뿀�뒿�땲�떎.

select userid, name, userseq
from tbl_member;

delete from tbl_member
where userid like '%'||'kangsora'||'%';
-- 100媛� �뻾 �씠(媛�) �궘�젣�릺�뿀�뒿�땲�떎.

delete from tbl_member
where userid like '%'||'choiws'||'%';
-- 100媛� �뻾 �씠(媛�) �궘�젣�릺�뿀�뒿�땲�떎.

delete from tbl_member
where userid like '%'||'iyou'||'%';
-- 100媛� �뻾 �씠(媛�) �궘�젣�릺�뿀�뒿�땲�떎.

delete from tbl_member
where userid in('kimyousin','youinna');
-- 2媛� �뻾 �씠(媛�) �궘�젣�릺�뿀�뒿�땲�떎.

delete from tbl_member
where userid in('�꽩');

select userid, name, userseq, to_char(registerday, 'yyyy-mm-dd hh24:mi:ss') AS 媛��엯�씪�옄
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

select userid, name, userseq, to_char(registerday, 'yyyy-mm-dd hh24:mi:ss') AS 媛��엯�씪�옄
from tbl_member
order by registerday asc;

commit;
-- 而ㅻ컠 �셿猷�.

-- �떎�쓬�쑝濡�, tbl_member �뀒�씠釉붿쓽 userseq 而щ읆�뿉 unique �젣�빟�쓣 異붽��븳�떎.
alter table tbl_member
add constraint UQ_tbl_member_userseq unique(userseq);

-- �떎�쓬�쑝濡�, tbl_member �뀒�씠釉붿쓽 userseq 而щ읆�뿉 not null �젣�빟�쓣 異붽��븳�떎.
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
            '15864', '寃쎄린 援고룷�떆 �삤湲덈줈 15-17', '101�룞 102�샇', ' (湲덉젙�룞)', p_gender, '1993-10-11'); 
   end loop;
end pcd_member_insert; 
-- Procedure PCD_MEMBER_INSERT�씠(媛�) 而댄뙆�씪�릺�뿀�뒿�땲�떎.

exec pcd_member_insert('kangsora', '媛뺤냼�씪', 2);
-- PL/SQL �봽濡쒖떆��媛� �꽦怨듭쟻�쑝濡� �셿猷뚮릺�뿀�뒿�땲�떎.
commit;

exec pcd_member_insert('choiws', '理쒖슦�떇', 1);
-- PL/SQL �봽濡쒖떆��媛� �꽦怨듭쟻�쑝濡� �셿猷뚮릺�뿀�뒿�땲�떎.
commit;

exec pcd_member_insert('iyou', '�븘�씠�쑀', 2);
-- PL/SQL �봽濡쒖떆��媛� �꽦怨듭쟻�쑝濡� �셿猷뚮릺�뿀�뒿�땲�떎.
commit;

insert into tbl_member(userseq, userid, pwd, name, email, mobile, postcode, address, detailaddress, extraaddress, gender, birthday) 
values(seq_userseq.nextval, 'kimyousin', '18006e2ca1c2129392c66d87334bd2452c572058d406b4e85f43c1f72def10f5', '源��쑀�떊', 'tOqmu3jV6wLKut4yIYx4fzUOY6CzWcnls0+u0mrGOec=', 'O9JYIGRGgccnczBzYBEW7g==', 
       '15864', '寃쎄린 援고룷�떆 �삤湲덈줈 15-17', '101�룞 102�샇', ' (湲덉젙�룞)', '1', '1984-10-11');
       
insert into tbl_member(userseq, userid, pwd, name, email, mobile, postcode, address, detailaddress, extraaddress, gender, birthday) 
values(seq_userseq.nextval, 'youinna', '18006e2ca1c2129392c66d87334bd2452c572058d406b4e85f43c1f72def10f5', '�쑀�씤�굹', 'tOqmu3jV6wLKut4yIYx4fzUOY6CzWcnls0+u0mrGOec=', 'O9JYIGRGgccnczBzYBEW7g==', 
       '15864', '寃쎄린 援고룷�떆 �삤湲덈줈 15-17', '101�룞 102�샇', ' (湲덉젙�룞)', '2', '2001-10-11');       
            
commit;  

select userseq, userid, name, to_char(registerday, 'yyyy-mm-dd hh24:mi:ss') AS 媛��엯�씪�옄
from tbl_member
order by userseq desc;  
-- order by registerday desc; 濡� �뻽�떎硫� 紐⑤몢 order by userseq desc; 濡� 蹂�寃쏀븷 寃�!!!

------ *********************************************************************** ------





-----**** oralce 踰꾩쟾 12C �씠�썑 遺��꽣 吏��썝�릺�뼱吏��뒗 OFFSET - FETCH瑜� �궗�슜�븯�뿬 �럹�씠吏� 泥섎━ �븯湲�. ****-----
select userid, name, email, gender
from tbl_member
where userid != 'admin'
and name like '%'||'理�'||'%'
--and userid like '%'||'3'||'%'
--and email = 'eomjh@gmail.com'
order by userseq desc
OFFSET (1-1)*10 ROW
FETCH NEXT 10 ROW ONLY; --1�럹�씠吏� 
-------------------------------------------------------------------
select userid, name, email, gender
from tbl_member
where userid != 'admin'
and name like '%'||'理�'||'%'
--and userid like '%'||'3'||'%'
--and email = 'eomjh@gmail.com'
order by userseq desc
OFFSET (2-1)*10 ROW
FETCH NEXT 10 ROW ONLY; --2�럹�씠吏� 
--------------------------------------------------------------------
select userid, name, email, gender
from tbl_member
where userid != 'admin'
and name like '%'||'理�'||'%'
--and userid like '%'||'3'||'%'
--and email = 'eomjh@gmail.com'
order by userseq desc
OFFSET (3-1)*10 ROW
FETCH NEXT 10 ROW ONLY; --3�럹�씠吏� 


/*
>> !!臾몃쾿!! <<
ORDER BY boardno desc
OFFSET (@PAGE_NO-1)*@PAGE_SIZE ROW   -- @PAGE_NO ==> �럹�씠吏� 踰덊샇 , @PAGE_SIZE ==> �븳 �럹�씠吏��뿉 蹂댁뿬以� row �닔
FETCH NEXT @PAGE_SIZE ROW ONLY

order by 濡� �젙�젹 湲곗� �젙�븯怨�
offset�쓣 �넻�빐 �럹�씠吏� �븷 �븣留덈떎 嫄대꼫�쎑 �뻾�쓽 �닔 �꽕�젙
fetch next�뿉�꽌 紐� 媛쒖쓽 �뻾�쓣 媛��졇�삱吏� 寃곗젙
*/

select * from tab;
select * from tbl_member;



select userid, name, to_char(registerday, 'yyyy-mm-dd hh24:mi:ss sssssss') AS 媛��엯�씪�옄
from tbl_member
where userid != 'admin'
order by userseq desc;







-----------------------------------------------------------------------------------------------------------



-- 留뚯빟 議고쉶�븯怨좎옄 �븯�뒗 �쉶�썝�닔(�뻾�쓽媛쒖닔)媛� 306媛� �씪硫� �럹�씠吏��떦 10 媛쒖뵫 蹂댁뿬以ъ쓣�븣 �럹�씠吏� 踰덊샇媛� 紐뉕컻 源뚯� �굹���빞 �븯�뒗吏� 
select 306/10, ceil(306/10) from dual;
--30.6	31

-- 留뚯빟 議고쉶�븯怨좎옄 �븯�뒗 �쉶�썝�닔(�뻾�쓽媛쒖닔)媛� 306媛� �씪硫� �럹�씠吏��떦 5 媛쒖뵫 蹂댁뿬以ъ쓣�븣 �럹�씠吏� 踰덊샇媛� 紐뉕컻 源뚯� �굹���빞 �븯�뒗吏� 
select 306/5, ceil(306/5) from dual;
-- 61.2	62

-- 留뚯빟 議고쉶�븯怨좎옄 �븯�뒗 �쉶�썝�닔(�뻾�쓽媛쒖닔)媛� 306媛� �씪硫� �럹�씠吏��떦 3 媛쒖뵫 蹂댁뿬以ъ쓣�븣 �럹�씠吏� 踰덊샇媛� 紐뉕컻 源뚯� �굹���빞 �븯�뒗吏� 
select 306/3, ceil(306/3) from dual;
-- 102	102




-----------------------------------------------------------------------------------------------------------
select *
from tbl_member
where status =1 and name like '%'||'媛�'||'%'
order by userseq;



-----------------------------------------------------------------------------------------------------------



--------------------------------------------------------------------------



/*
   移댄뀒怨좊━ �뀒�씠釉붾챸 : tbl_category 

   而щ읆�젙�쓽 
     -- 移댄뀒怨좊━ ��遺꾨쪟 踰덊샇  : �떆���뒪(seq_category_cnum)濡� 利앷��븿.(Primary Key)
     -- 移댄뀒怨좊━ 肄붾뱶(unique) : ex) �쟾�옄�젣�뭹  '100000'
                                  �쓽瑜�  '200000'
                                  �룄�꽌  '300000' 
     -- 移댄뀒怨좊━紐�(not null)  : �쟾�옄�젣�뭹, �쓽瑜�, �룄�꽌           
  
*/ 
-- drop table tbl_category purge; 
create table tbl_category
(cnum    number(8)     not null  -- 移댄뀒怨좊━ ��遺꾨쪟 踰덊샇
,code    varchar2(20)  not null  -- 移댄뀒怨좊━ 肄붾뱶
,cname   varchar2(100) not null  -- 移댄뀒怨좊━紐�
,constraint PK_tbl_category_cnum primary key(cnum)
,constraint UQ_tbl_category_code unique(code)
);

-- drop sequence seq_category_cnum;
create sequence seq_category_cnum 
start with 1
increment by 1
nomaxvalue
nominvalue
nocycle
nocache;

insert into tbl_category(cnum, code, cname) values(seq_category_cnum.nextval, '100000', '�쟾�옄�젣�뭹');
insert into tbl_category(cnum, code, cname) values(seq_category_cnum.nextval, '200000', '�쓽瑜�');
insert into tbl_category(cnum, code, cname) values(seq_category_cnum.nextval, '300000', '�룄�꽌');
commit;

-- �굹以묒뿉 �꽔�뒿�땲�떎.
-- insert into tbl_category(cnum, code, cname) values(seq_category_cnum.nextval, '400000', '�떇�뭹');
-- commit;

-- insert into tbl_category(cnum, code, cname) values(seq_category_cnum.nextval, '500000', '�떊諛�');
-- commit;

/*
delete from tbl_category
where code = '500000';

delete from tbl_category
where code = '400000';

commit;
*/

select cnum, code, cname
from tbl_category
order by cnum asc;



-- drop table tbl_spec purge;
create table tbl_spec
(snum    number(8)     not null  -- �뒪�럺踰덊샇       
,sname   varchar2(100) not null  -- �뒪�럺紐�         
,constraint PK_tbl_spec_snum primary key(snum)
,constraint UQ_tbl_spec_sname unique(sname)
);

-- drop sequence seq_spec_snum;
create sequence seq_spec_snum
start with 1
increment by 1
nomaxvalue
nominvalue
nocycle
nocache;

insert into tbl_spec(snum, sname) values(seq_spec_snum.nextval, 'HIT');
insert into tbl_spec(snum, sname) values(seq_spec_snum.nextval, 'NEW');
insert into tbl_spec(snum, sname) values(seq_spec_snum.nextval, 'BEST');

commit;

select snum, sname
from tbl_spec
order by snum asc;


---- *** �젣�뭹 �뀒�씠釉� : tbl_product *** ----
-- drop table tbl_product purge; 
create table tbl_product
(pnum           number(8) not null       -- �젣�뭹踰덊샇(Primary Key)
,pname          varchar2(100) not null   -- �젣�뭹紐�
,fk_cnum        number(8)                -- 移댄뀒怨좊━肄붾뱶(Foreign Key)�쓽 �떆���뒪踰덊샇 李몄“
,pcompany       varchar2(50)             -- �젣議고쉶�궗紐�
,pimage1        varchar2(100) default 'noimage.png' -- �젣�뭹�씠誘몄�1   �씠誘몄��뙆�씪紐�
,pimage2        varchar2(100) default 'noimage.png' -- �젣�뭹�씠誘몄�2   �씠誘몄��뙆�씪紐� 
,prdmanual_systemFileName varchar2(200)             -- �뙆�씪�꽌踰꾩뿉 �뾽濡쒕뱶�릺�뼱吏��뒗 �떎�젣 �젣�뭹�꽕紐낆꽌 �뙆�씪紐� (以묐났�맂 �뙆�씪紐낆쓣 諛⑹��븯湲곗쐞�빐 �뙆�씪紐낅뮘�뿉 �궇吏쒖떆媛꾨굹�끂珥덈�� 遺숈뿬�꽌 留뚮뱺�떎) 
,prdmanual_orginFileName  varchar2(200)             -- �쎒�겢�씪�씠�뼵�듃�쓽 �쎒釉뚮씪�슦���뿉�꽌 �뙆�씪�쓣 �뾽濡쒕뱶 �븷�븣 �삱由щ뒗 �젣�뭹�꽕紐낆꽌 �뙆�씪紐� 
,pqty           number(8) default 0      -- �젣�뭹 �옱怨좊웾
,price          number(8) default 0      -- �젣�뭹 �젙媛�
,saleprice      number(8) default 0      -- �젣�뭹 �뙋留ㅺ�(�븷�씤�빐�꽌 �뙏 寃껋씠誘�濡�)
,fk_snum        number(8)                -- 'HIT', 'NEW', 'BEST' �뿉 ���븳 �뒪�럺踰덊샇�씤 �떆���뒪踰덊샇瑜� 李몄“
,pcontent       varchar2(4000)           -- �젣�뭹�꽕紐�  varchar2�뒗 varchar2(4000) 理쒕�媛믪씠誘�濡�
                                         --          4000 byte 瑜� 珥덇낵�븯�뒗 寃쎌슦 clob 瑜� �궗�슜�븳�떎.
                                         --          clob �뒗 理쒕� 4GB 源뚯� 吏��썝�븳�떎.
                                         
,point          number(8) default 0      -- �룷�씤�듃 �젏�닔                                         
,pinputdate     date default sysdate     -- �젣�뭹�엯怨좎씪�옄
,constraint  PK_tbl_product_pnum primary key(pnum)
,constraint  FK_tbl_product_fk_cnum foreign key(fk_cnum) references tbl_category(cnum)
,constraint  FK_tbl_product_fk_snum foreign key(fk_snum) references tbl_spec(snum)
);

-- drop sequence seq_tbl_product_pnum;
create sequence seq_tbl_product_pnum
start with 1
increment by 1
nomaxvalue
nominvalue
nocycle
nocache;


-- �븘�옒�뒗 fk_snum 而щ읆�쓽 媛믪씠 1 �씤 'HIT' �긽�뭹留� �엯�젰�븳 寃껋엫. 
insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '�뒪留덊듃TV', 1, '�궪�꽦', 'tv_samsung_h450_1.png','tv_samsung_h450_2.png', 100,1200000,800000, 1,'42�씤移� �뒪留덊듃 TV. 湲곕뒫 吏�!!', 50);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '�끂�듃遺�', 1, '�뿕吏�', 'notebook_lg_gt50k_1.png','notebook_lg_gt50k_2.png', 150,900000,750000, 1,'�끂�듃遺�. 湲곕뒫 吏�!!', 30);  

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '諛붿�', 2, 'S�궗', 'cloth_canmart_1.png','cloth_canmart_2.png', 20,12000,10000, 1,'�삁六먯슂!!', 5);       

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '�궓諛�', 2, '踰꾩뭅猷�', 'cloth_buckaroo_1.png','cloth_buckaroo_2.png', 50,15000,13000, 1,'硫뗭졇�슂!!', 10);       
       
insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '蹂대Ъ李얘린�떆由ъ쫰', 3, '�븘�씠�꽭��', 'book_bomul_1.png','book_bomul_2.png', 100,35000,33000, 1,'留뚰솕濡� 蹂대뒗 �꽭怨꾩뿬�뻾', 20);       
       
insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '留뚰솕�븳援��궗', 3, '�끃�깋吏��뙜�씠', 'book_koreahistory_1.png','book_koreahistory_2.png', 80,130000,120000, 1,'留뚰솕濡� 蹂대뒗 �씠�빞湲� �븳援��궗 �쟾吏�', 60);
       
commit;







-- �븘�옒�뒗 fk_cnum 而щ읆�쓽 媛믪씠 1 �씤 '�쟾�옄�젣�뭹' 以� fk_snum 而щ읆�쓽 媛믪씠 1 �씤 'HIT' �긽�뭹留� �엯�젰�븳 寃껋엫. 
insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '�끂�듃遺�1', 1, 'DELL', '1.jpg','2.jpg', 100,1200000,1000000,1,'1踰� �끂�듃遺�', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '�끂�듃遺�2', 1, '�뿉�씠�꽌','3.jpg','4.jpg',100,1200000,1000000,1,'2踰� �끂�듃遺�', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '�끂�듃遺�3', 1, 'LG�쟾�옄','5.jpg','6.jpg',100,1200000,1000000,1,'3踰� �끂�듃遺�', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '�끂�듃遺�4', 1, '�젅�끂踰�','7.jpg','8.jpg',100,1200000,1000000,1,'4踰� �끂�듃遺�', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '�끂�듃遺�5', 1, '�궪�꽦�쟾�옄','9.jpg','10.jpg',100,1200000,1000000,1,'5踰� �끂�듃遺�', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '�끂�듃遺�6', 1, 'HP','11.jpg','12.jpg',100,1200000,1000000,1,'6踰� �끂�듃遺�', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '�끂�듃遺�7', 1, '�젅�끂踰�','13.jpg','14.jpg',100,1200000,1000000,1,'7踰� �끂�듃遺�', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '�끂�듃遺�8', 1, 'LG�쟾�옄','15.jpg','16.jpg',100,1200000,1000000,1,'8踰� �끂�듃遺�', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '�끂�듃遺�9', 1, '�븳�꽦而댄벂�꽣','17.jpg','18.jpg',100,1200000,1000000,1,'9踰� �끂�듃遺�', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '�끂�듃遺�10', 1, 'MSI','19.jpg','20.jpg',100,1200000,1000000,1,'10踰� �끂�듃遺�', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '�끂�듃遺�11', 1, 'LG�쟾�옄','21.jpg','22.jpg',100,1200000,1000000,1,'11踰� �끂�듃遺�', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '�끂�듃遺�12', 1, 'HP','23.jpg','24.jpg',100,1200000,1000000,1,'12踰� �끂�듃遺�', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '�끂�듃遺�13', 1, '�젅�끂踰�','25.jpg','26.jpg',100,1200000,1000000,1,'13踰� �끂�듃遺�', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '�끂�듃遺�14', 1, '�젅�끂踰�','27.jpg','28.jpg',100,1200000,1000000,1,'14踰� �끂�듃遺�', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '�끂�듃遺�15', 1, '�븳�꽦而댄벂�꽣','29.jpg','30.jpg',100,1200000,1000000,1,'15踰� �끂�듃遺�', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '�끂�듃遺�16', 1, '�븳�꽦而댄벂�꽣','31.jpg','32.jpg',100,1200000,1000000,1,'16踰� �끂�듃遺�', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '�끂�듃遺�17', 1, '�젅�끂踰�','33.jpg','34.jpg',100,1200000,1000000,1,'17踰� �끂�듃遺�', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '�끂�듃遺�18', 1, '�젅�끂踰�','35.jpg','36.jpg',100,1200000,1000000,1,'18踰� �끂�듃遺�', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '�끂�듃遺�19', 1, 'LG�쟾�옄','37.jpg','38.jpg',100,1200000,1000000,1,'19踰� �끂�듃遺�', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '�끂�듃遺�20', 1, 'LG�쟾�옄','39.jpg','40.jpg',100,1200000,1000000,1,'20踰� �끂�듃遺�', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '�끂�듃遺�21', 1, '�븳�꽦而댄벂�꽣','41.jpg','42.jpg',100,1200000,1000000,1,'21踰� �끂�듃遺�', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '�끂�듃遺�22', 1, '�뿉�씠�꽌','43.jpg','44.jpg',100,1200000,1000000,1,'22踰� �끂�듃遺�', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '�끂�듃遺�23', 1, 'DELL','45.jpg','46.jpg',100,1200000,1000000,1,'23踰� �끂�듃遺�', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '�끂�듃遺�24', 1, '�븳�꽦而댄벂�꽣','47.jpg','48.jpg',100,1200000,1000000,1,'24踰� �끂�듃遺�', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '�끂�듃遺�25', 1, '�궪�꽦�쟾�옄','49.jpg','50.jpg',100,1200000,1000000,1,'25踰� �끂�듃遺�', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '�끂�듃遺�26', 1, 'MSI','51.jpg','52.jpg',100,1200000,1000000,1,'26踰� �끂�듃遺�', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '�끂�듃遺�27', 1, '�븷�뵆','53.jpg','54.jpg',100,1200000,1000000,1,'27踰� �끂�듃遺�', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '�끂�듃遺�28', 1, '�븘�닔�뒪','55.jpg','56.jpg',100,1200000,1000000,1,'28踰� �끂�듃遺�', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '�끂�듃遺�29', 1, '�젅�끂踰�','57.jpg','58.jpg',100,1200000,1000000,1,'29踰� �끂�듃遺�', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '�끂�듃遺�30', 1, '�궪�꽦�쟾�옄','59.jpg','60.jpg',100,1200000,1000000,1,'30踰� �끂�듃遺�', 60);

commit;





-- �븘�옒�뒗 fk_cnum 而щ읆�쓽 媛믪씠 1 �씤 '�쟾�옄�젣�뭹' 以� fk_snum 而щ읆�쓽 媛믪씠 2 �씤 'NEW' �긽�뭹留� �엯�젰�븳 寃껋엫. 
insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '�끂�듃遺�31', 1, 'MSI','61.jpg','62.jpg',100,1200000,1000000,2,'31踰� �끂�듃遺�', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '�끂�듃遺�32', 1, '�궪�꽦�쟾�옄','63.jpg','64.jpg',100,1200000,1000000,2,'32踰� �끂�듃遺�', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '�끂�듃遺�33', 1, '�븳�꽦而댄벂�꽣','65.jpg','66.jpg',100,1200000,1000000,2,'33踰� �끂�듃遺�', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '�끂�듃遺�34', 1, 'HP','67.jpg','68.jpg',100,1200000,1000000,2,'34踰� �끂�듃遺�', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '�끂�듃遺�35', 1, 'LG�쟾�옄','69.jpg','70.jpg',100,1200000,1000000,2,'35踰� �끂�듃遺�', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '�끂�듃遺�36', 1, '�븳�꽦而댄벂�꽣','71.jpg','72.jpg',100,1200000,1000000,2,'36踰� �끂�듃遺�', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '�끂�듃遺�37', 1, '�궪�꽦�쟾�옄','73.jpg','74.jpg',100,1200000,1000000,2,'37踰� �끂�듃遺�', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '�끂�듃遺�38', 1, '�젅�끂踰�','75.jpg','76.jpg',100,1200000,1000000,2,'38踰� �끂�듃遺�', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '�끂�듃遺�39', 1, 'MSI','77.jpg','78.jpg',100,1200000,1000000,2,'39踰� �끂�듃遺�', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '�끂�듃遺�40', 1, '�젅�끂踰�','79.jpg','80.jpg',100,1200000,1000000,2,'40踰� �끂�듃遺�', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '�끂�듃遺�41', 1, '�젅�끂踰�','81.jpg','82.jpg',100,1200000,1000000,2,'41踰� �끂�듃遺�', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '�끂�듃遺�42', 1, '�젅�끂踰�','83.jpg','84.jpg',100,1200000,1000000,2,'42踰� �끂�듃遺�', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '�끂�듃遺�43', 1, 'MSI','85.jpg','86.jpg',100,1200000,1000000,2,'43踰� �끂�듃遺�', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '�끂�듃遺�44', 1, '�븳�꽦而댄벂�꽣','87.jpg','88.jpg',100,1200000,1000000,2,'44踰� �끂�듃遺�', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '�끂�듃遺�45', 1, '�븷�뵆','89.jpg','90.jpg',100,1200000,1000000,2,'45踰� �끂�듃遺�', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '�끂�듃遺�46', 1, '�븘�닔�뒪','91.jpg','92.jpg',100,1200000,1000000,2,'46踰� �끂�듃遺�', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '�끂�듃遺�47', 1, '�궪�꽦�쟾�옄','93.jpg','94.jpg',100,1200000,1000000,2,'47踰� �끂�듃遺�', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '�끂�듃遺�48', 1, 'LG�쟾�옄','95.jpg','96.jpg',100,1200000,1000000,2,'48踰� �끂�듃遺�', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '�끂�듃遺�49', 1, '�븳�꽦而댄벂�꽣','97.jpg','98.jpg',100,1200000,1000000,2,'49踰� �끂�듃遺�', 60);

insert into tbl_product(pnum, pname, fk_cnum, pcompany, pimage1, pimage2, pqty, price, saleprice, fk_snum, pcontent, point)
values(seq_tbl_product_pnum.nextval, '�끂�듃遺�50', 1, '�젅�끂踰�','99.jpg','100.jpg',100,1200000,1000000,2,'50踰� �끂�듃遺�', 60);

commit;        


select *
from tbl_product
order by pnum desc;


select count(*)
from tbl_product
where fk_snum = '1'; -- HIT (36)

select count(*)
from tbl_product
where fk_snum = '2'; -- NEW (20)

select count(*)
from tbl_product
where fk_snum = '3'; -- BEST (0)

select *
from tbl_product;

select cnum, code, cname
from tbl_category;

select snum, sname
from tbl_spec;








--- *** �뜑蹂닿린 諛⑹떇(�럹�씠吏뺤쿂由�)�쑝濡� �긽�뭹�젙蹂대�� 8媛쒖뵫 �옒�씪�꽌(start ~ end) 議고쉶�빐�삤湲� *** ---
---     Oracle 12c �씠�긽�뿉�꽌 �궗�슜�릺�뒗 OFFSET FETCH 瑜� �궗�슜�븯�뿬 援ы븯湲� 
/* >> !! ORACLE 12C �씠�썑 遺��꽣 吏��썝�릺�뼱吏��뒗 OFFSET - FETCH �쓣 �궗�슜�븯�뿬 �럹�씠吏� 泥섎━ !! <<
           
   ORDER BY pnum DESC 
   OFFSET (@PAGE_NO-1)*@PAGE_SIZE ROW   -- @PAGE_NO ==> �럹�씠吏� 踰덊샇 , @PAGE_SIZE ==> �븳 �럹�씠吏��뿉 蹂댁뿬以� row �닔
   FETCH NEXT @PAGE_SIZE ROW ONLY

   order by 濡� �젙�젹 湲곗� �젙�븯怨�
   offset�쓣 �넻�빐 �럹�씠吏� �븷 �븣留덈떎 嫄대꼫�쎑 �뻾�쓽 �닔 �꽕�젙
   fetch next�뿉�꽌 紐� 媛쒖쓽 �뻾�쓣 媛��졇�삱吏� 寃곗젙
*/ 

SELECT pnum, pname, C.cname, pcompany, pimage1, pimage2, pqty, price, saleprice, S.sname, pcontent, point 
     , to_char(pinputdate, 'yyyy-mm-dd') AS pinputdate
FROM tbl_product P JOIN tbl_category C 
ON P.fk_cnum = C.cnum 
JOIN tbl_spec S
ON P.fk_snum = S.snum 
WHERE S.sname = 'HIT'
ORDER BY pnum DESC 
OFFSET (8 /(8 - 1 + 1)-1)*(8 - 1 + 1) ROW
FETCH NEXT (8 - 1 + 1) ROW ONLY; -- 泥ル쾲吏� �뜑蹂닿린(1�럹�씠吏�)
/*
    @PAGE_NO = end /(end - start + 1)
    @PAGE_SIZE = end - start + 1
    
    @PAGE_NO = 8 /(8 - 1 + 1)
    @PAGE_SIZE = (8 - 1 + 1)
*/


SELECT pnum, pname, C.cname, pcompany, pimage1, pimage2, pqty, price, saleprice, S.sname, pcontent, point 
     , to_char(pinputdate, 'yyyy-mm-dd') AS pinputdate
FROM tbl_product P JOIN tbl_category C 
ON P.fk_cnum = C.cnum 
JOIN tbl_spec S
ON P.fk_snum = S.snum 
WHERE S.sname = 'HIT'
ORDER BY pnum DESC 
OFFSET (16 /(16 - 9 + 1)-1)*(16 - 9 + 1) ROW
FETCH NEXT (16 - 9 + 1) ROW ONLY; -- �몢踰덉㎏ �뜑蹂닿린(2�럹�씠吏�)==> 9遺��꽣 16源뚯� 
/*
    @PAGE_NO = end /(end - start + 1)
    @PAGE_SIZE = end - start + 1
    
    @PAGE_NO = 16 /(16 - 9 + 1)
    @PAGE_SIZE = 16 - 9 + 1
*/



-- HIT 상품의 전체개수를 알아온다 
SELECT count (*)
FROM tbl_product
WHERE fk_snum = 1;
-- 36 




insert into tbl_category(cnum, code, cname) values(seq_category_cnum.nextval, '400000', '식품');
commit;

delete from tbl_category
where code = '400000';
commit;

select *
from tbl_spec;


-- insert into tbl_category(cnum, code, cname) values(seq_category_cnum.nextval, '500000', '�떊諛�');
-- commit;




----- >>> 하나의 제품속에 여러개의 이미지 파일 넣어주기 <<< ------ 
create table tbl_product_imagefile
(imgfileno     number         not null   -- 시퀀스로 입력받음.
,fk_pnum       number(8)      not null   -- 제품번호(foreign key)
,imgfilename   varchar2(100)  not null   -- 제품이미지파일명
,constraint PK_tbl_product_imagefile primary key(imgfileno)
,constraint FK_tbl_product_imagefile foreign key(fk_pnum) references tbl_product(pnum) on delete cascade 
);
-- Table TBL_PRODUCT_IMAGEFILE이(가) 생성되었습니다.

create sequence seqImgfileno
start with 1
increment by 1
nomaxvalue
nominvalue
nocycle
nocache;
-- Sequence SEQIMGFILENO이(가) 생성되었습니다.

select imgfileno, fk_pnum, imgfilename
from tbl_product_imagefile
order by imgfileno desc;


SELECT sname, pnum, pname, pcompany, price, saleprice, point, pqty, pcontent, pimage1, pimage2, prdmanual_systemFileName, NVL(prdmanual_orginFileName, '없음') AS prdmanual_orginFileName 
FROM 
( select fk_snum, pnum, pname, pcompany, price, saleprice, point, pqty, pcontent, pimage1, pimage2, prdmanual_systemFileName, prdmanual_orginFileName 
  from tbl_product 
  where pnum = to_number(2) 
) P 
JOIN tbl_spec S 
ON P.fk_snum = S.snum;



select imgfilename
from tbl_product_imagefile
where fk_pnum = to_number('57')
order by imgfileno desc;



-------- **** 장바구니 테이블 생성하기 **** ----------
 desc tbl_member;
 desc tbl_product;

 create table tbl_cart
 (cartno        number               not null   --  장바구니 번호             
 ,fk_userid     varchar2(20)         not null   --  사용자ID            
 ,fk_pnum       number(8)            not null   --  제품번호                
 ,oqty          number(8) default 0  not null   --  주문량                   
 ,registerday   date default sysdate            --  장바구니 입력날짜
 ,constraint PK_shopping_cart_cartno primary key(cartno)
 ,constraint FK_shopping_cart_fk_userid foreign key(fk_userid) references tbl_member(userid) 
 ,constraint FK_shopping_cart_fk_pnum foreign key(fk_pnum) references tbl_product(pnum)
 );
 -- Table TBL_CART이(가) 생성되었습니다.

 create sequence seq_tbl_cart_cartno
 start with 1
 increment by 1
 nomaxvalue
 nominvalue
 nocycle
 nocache;


select cartno, fk_userid, fk_pnum, oqty, registerday 
 from tbl_cart
 order by cartno asc;



SELECT C.cartno, C.fk_userid, C.fk_pnum, C.oqty, P.pname, P.pimage1, P.saleprice, P.point, P.pqty 
 FROM 
 (select cartno, fk_userid, fk_pnum, oqty, registerday 
  from tbl_cart
  where fk_userid = 'sonyd') C
 JOIN tbl_product P
 ON C.fk_pnum = P.pnum 
 ORDER BY C.cartno DESC;
 
 
 
 
SELECT NVL(SUM(C.oqty * P.saleprice),0)AS SUMTOTALPRICE
       , NVL(SUM(C.oqty * P.point),0) AS SUMTOTALPOINT
FROM 
    (select fk_pnum, oqty 
     from tbl_cart 
     where fk_userid = 'sonyd') C 
JOIN tbl_product P
ON C.fk_pnum = P.pnum;





select * from tab;
select * from tbl_cart;







 ------------------ >>> 주문관련 테이블 <<< -----------------------------
-- [1] 주문 테이블    : tbl_order
-- [2] 주문상세 테이블 : tbl_orderdetail


-- *** "주문" 테이블 *** --
create table tbl_order
(odrcode        varchar2(20) not null          -- 주문코드(명세서번호)  주문코드 형식 : s+날짜+sequence ==> s20250103-1 , s20250103-2 , s20250103-3
                                               --                                                     s20250104-4 , s20250104-5 , s20250104-6
,fk_userid      varchar2(20) not null          -- 사용자ID
,odrtotalPrice  number       not null          -- 주문총액
,odrtotalPoint  number       not null          -- 주문총포인트
,odrdate        date default sysdate not null  -- 주문일자
,constraint PK_tbl_order_odrcode primary key(odrcode)
,constraint FK_tbl_order_fk_userid foreign key(fk_userid) references tbl_member(userid)
);
-- Table TBL_ORDER이(가) 생성되었습니다.

-- "주문코드(명세서번호) 시퀀스" 생성
create sequence seq_tbl_order
start with 1
increment by 1
nomaxvalue
nominvalue
nocycle
nocache;
-- Sequence SEQ_TBL_ORDER이(가) 생성되었습니다.

select 's'||to_char(sysdate,'yyyymmdd')||'-'||seq_tbl_order.nextval AS odrcode
from dual;
-- s20250103-1 

select odrcode, fk_userid, 
       odrtotalPrice, odrtotalPoint,
       to_char(odrdate, 'yyyy-mm-dd hh24:mi:ss') as odrdate
from tbl_order
order by odrcode desc;


-- *** "주문상세" 테이블 *** --
create table tbl_orderdetail
(odrseqnum      number               not null   -- 주문상세 일련번호
,fk_odrcode     varchar2(20)         not null   -- 주문코드(명세서번호)
,fk_pnum        number(8)            not null   -- 제품번호
,oqty           number               not null   -- 주문량
,odrprice       number               not null   -- "주문할 그때 그당시의 실제 판매가격" ==> insert 시 tbl_product 테이블에서 해당제품의 saleprice 컬럼값을 읽어다가 넣어주어야 한다.
,deliverStatus  number(1) default 1  not null   -- 배송상태( 1 : 주문만 받음,  2 : 배송중,  3 : 배송완료)
,deliverDate    date                            -- 배송완료일자  default 는 null 로 함.
,constraint PK_tbl_orderdetail_odrseqnum  primary key(odrseqnum)
,constraint FK_tbl_orderdetail_fk_odrcode foreign key(fk_odrcode) references tbl_order(odrcode) on delete cascade
,constraint FK_tbl_orderdetail_fk_pnum foreign key(fk_pnum) references tbl_product(pnum)
,constraint CK_tbl_orderdetail check( deliverStatus in(1, 2, 3) )
);
-- Table TBL_ORDERDETAIL이(가) 생성되었습니다.


-- "주문상세 일련번호 시퀀스" 생성
create sequence seq_tbl_orderdetail
start with 1
increment by 1
nomaxvalue
nominvalue
nocycle
nocache;
-- Sequence SEQ_TBL_ORDERDETAIL이(가) 생성되었습니다.

-----------------------------------------------------------------
select *
from tbl_order
order by odrdate desc; 
 
select *
from tbl_orderdetail
order by odrseqnum desc;



select * from tbl_member
where userid ='sonyd';

update tbl_member set point = 100000
where userid = 'sonyd';

commit;