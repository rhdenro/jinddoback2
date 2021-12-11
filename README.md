# 도서관 좌석추천 프로젝트

## About
<h4>여러분들은 도서관을 이용하다가 본인이 좋아하지도 않은 좌석에 앉아본 경험이 있으신가요?</h4>
<div>
  저희는 이러한 상황을 개선하기 위해, 자체적인 도서관 좌석 추천 시스템을 제작하였습니다.<br/>
  자체적인 구글 설문조사 결과 좌석의 형태, 위치, 좌석의 밀집도를 중시한다는 것을 알았습니다.<br/>
  따라서 이를 기반으로 좌석을 추천하는 시스템입니다.<br/>
</div>
<br/>
<div>
  메인 서버는 Node.js로 동작하며, 분류기의 경우 Django로 별도의 서버를 운영하여 해당 서버로 인공지능을 처리합니다.<br/>
  데이터베이스는 MySQL을 사용합니다.<br/>
  분류기는 Python을 기반으로 제작되었습니다.<br/>
</div>
<br/>
<div>
  분류기는 python3 기반으로 구성되어 있고, python pandas로 데이터 구조화 및 추천 알고리즘에 따른 구현이 이루어져 있습니다.<br/>
  MySQL에서 정보를 가져와 Content-Based-Fitering방식을 채용한 모듈입니다.<br/>
</div>
<br/>
<div>
  사용자 인터페이스는 JavaScript 라이브러리 중 하나인 React를 사용합니다.<br/>
  상호작용이 많은 UI를 만들 때 생기는 어려움을 줄이고, Node 서버에 렌더링을 할 수 있다는 장점이 있기에 선택하였습니다.<br/>
  대부분의 페이지 스타일링은 CSS를 사용했으며, 별점을 받아오는 부분과 추가 선택을 하는 부분은 Styled-Components 를 사용했습니다.<br/>
</div>

# Server

## Dependencies 

### OS 및 프로그램 버전(TEST완료된 버전입니다.)
 * OS - Windows 10 Edu 21H2<br>
 * Node.js - 16.13.1 LTS<br>
 * MySQL - 8.0.21<br>
 * Django - 3.2 <br>
 * Python - 3.8.11<br>
 
## FrameWork & Library(이름 -> 버전)
### Node.js
 * Express -> 4.16.1<br>
 * bcrypt -> 5.0.1<br>
 * cookie-parser -> 1.4.4<br>
 * cors -> 2.8.5<br>
 * cross-env -> 7.0.3<br>
 * debug -> 2.6.9<br>
 * dotenv -> 10.0.0<br>
 * express-mysql-session -> 2.1.7<br>
 * express-session -> 1.17.2<br>
 * http-errors -> 1.6.3<br>
 * morgan -> 1.9.1<br>
 * mysql2 -> 2.3.2<br>
 * nodemon -> 2.0.14<br>
 * request -> 2.88.2<br>
 * sequelize -> 6.7.0<br>
 * sequelize-cli -> 6.2.0<br>
### Django
 * mysqlclient -> 2.1.0<br>
 * pandas -> 1.3.4<br>
### React
 * dotenv -> 10.0.0<br>
 * react -> 17.0.2<br>
 * react-dom -> 17.0.2<br>
 * react-router-dom ->6.0.2<br>
 * react-scrips -> 2.1.7<br>
 * styled-components -> 5.3.3<br>
 # 실행 이전에 주의하실 점
 ## 모듈 및 라이브러리 설치
 ```
 Node.js
 npm install // 실행 시 모든 요구사항이 한번에 설치됩니다.
 npm install [패키지 이름] // 해당 패키지 설치
 npm install -g [패키지 이름] // 전역 패키지 설치
 npm install [패키지 이름]@버전 // 특정 버전 패키지 설치
 Django
 pip install [패키지명] // 패키지 설치
 pip install [패키지명] [버전] // 특정 버전 패키지 설치
 React
 1. yarn install [패키지명]
 2. npm install [패키지명]
 1을 권장하나 오류가 발생하거나 정상 설치 불가 시 2의 방법으로 시행할것
```
## 환경 변수 설정
- .env파일 개설 후 아래 규칙에 맞춰 파일 개설
  - MySQL_URL: MySQL Database URL
  - MySQL_ID: MySQL 계정 ID
  - MySQL_PW: MySQL 계정 비밀번호
  - MySQL_DATABASES: MySQL 데이터베이스 명
  - MySQL_PORT: MySQL 사용 포트
  - SECRET: 세션 비밀 키
  - PORT: 메인 서버 실행을 요청할 포트 번호

## 장고 서버 내부 데이터베이스 설정
- django_server 폴더로 이동 후 아래 규칙에 따라 my_settings.py 파이썬 파일 개설
   ```py
   DATABASES = {
        'default': {
              'ENGINE' : 'django.db.backends.mysql',
              'NAME' : 데이터베이스 이름,
              'USER': 계정 ID,
              'PASSWORD' : 계정 비밀번호,
              'HOST' : DB 호스트 이름,
              'PORT': 포트 번호
         }
    }
    SECRET_KEY= 기존 settings.py의 SECRET KEY 부착
    ```

# 실행 방법
```
1. cd express_server // 메인 서버로 이동
2. npm start // 메인 서버 실행
3. cd ../  // 메인 경로로 이동
4. cd django_server // 장고 서버(인공지능 서버)로 이동
5. python manage.py runserver // 장고 서버 실행
6. cd ../ // 메인 경로로 이동
7. cd seat // 프론트 경로로 이동
8. yarn start // 프론트 앱 실행
9. localhost:3000 으로 접속 후 시스템 사용
```

# 기타 사항
<h4>개발자 Email : kis89576@gmail.com(SERVER)</h4>
<h4>개발자 Email : fkdleon3@naver.com(MODEL)</h4>
<h4>개발자 Email : kmig1164@naver.com(Front-end)</h4>
<h4> LICENSE : MIT LICENSE </h4>

