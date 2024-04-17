## jwt 0.9
기본적인 jwt 토큰 생성 및 password 해쉬처리


### mysql initilize

```sql
CREATE DATABASE auth;
USE DATABASE auth;
CREATE TABLE user (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    PRIMARY KEY(id)
);
```
