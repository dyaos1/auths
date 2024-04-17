## jwt 1.0

이전 버전은 DDL 쿼리를 직접 입력해서 DB 생성, table 생성 등의 세팅을 해야 했음.
deploy 하자마자 바로 사용가능한 인증시스템을 구현하기 위해 ORM을 쓰는게 낫다는 생각이 들었고 
그래서 이번에는 mongoose를 이용하여 mongoDB를 사용, docker compose로 명령어 한번에 사용가능 하도록


### note
 - 동적 환경변수 설정 node index.js 앞에 설정해야 한다. window는 안되므로 cross-env를 설치해야함
 - 로컬에서 개발할때 127.0.0.1 또는 localhost로 입력하던 것을 docker compose에서는 service명 으로 대체한다.


### usage
 - .http 참조