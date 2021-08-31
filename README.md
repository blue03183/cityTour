# 도시 조회 API 입니다.

> 해당 api 는 nodejs 기반의 actionhero 프레임워크를 사용하여 만들어졌습니다.

> https://www.actionherojs.com/

-----

### 기능
1. 여행 등록 및 조회가 가능합니다. (도시정보, 여행시작일, 여행종료일)
 - 하나의 도시에는 하나의 여행만 입력 가능합니다.
 - 여행은 미래에 시작하는 여행만 등록 가능합니다.

2. 도시이름을 포함한 도시정보의 등록 및 조회가 가능합니다.
 - 도시의 조회는 단건조회와 아래 조건에 따른 도시리스트 조회가 가능합니다.
 -  도시리스트 조회 시 다음과 같은 조건을 만족해야합니다.
 ```
  정렬순서
    a. 여행중인 도시(여행시작일 <= 오늘 <= 여행종료일)
      ■ 여행 시작일이 빠른 순으로 정렬합니다.
    b. 아직 시작하지 않은 여행 중 여행시작일이 가까운 도시
      ■ 여행 시작일이 가까운 순으로 정렬합니다. c. 최근1일이내에등록된도시
      ■ 등록일시가 현재에 가까운 순으로 정렬합니다.
    d. 최근 1주일 이내에 조회한 도시
      ■ 조회일시는 단건조회를 기준으로 합니다.
      ■ 최근에 조회한 순으로 정렬합니다.
    e. 위 조건에 해당되지 않는 도시들은 랜덤으로 배열합니다.
```
- 위 순서대로 정렬했을 때 최초 10개의 도시 리스트만 결과로 보여줍니다.
- 등록된 여행이 끝나지 않은 도시가 10개가 넘을 경우에는 예외적으로 여행 일정이 있는
도시들을 위 순서에 따라 모두 보여줍니다.

### DB
- mysql 을 사용합니다.
- 테이블 생성 스크립트는 아래와 같습니다.
- database 이름은 다음을 사용합니다 : `travel`

`city`
```
CREATE TABLE `city` (
  `city_no` mediumint unsigned NOT NULL AUTO_INCREMENT,
  `city_name` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `wdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `search_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`city_no`),
  UNIQUE KEY `city_name` (`city_name`) USING BTREE,
  KEY `wdate` (`wdate`) USING BTREE,
  KEY `search_date` (`search_date`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```
`tour`
```
CREATE TABLE `tour` (
  `tour_no` mediumint unsigned NOT NULL AUTO_INCREMENT,
  `sdate` date DEFAULT NULL,
  `edate` date DEFAULT NULL,
  `city_no` mediumint unsigned NOT NULL,
  PRIMARY KEY (`tour_no`),
  KEY `city_no` (`city_no`),
  KEY `sdate` (`sdate`) USING BTREE,
  KEY `edate` (`edate`) USING BTREE,
  CONSTRAINT `tour_ibfk_1` FOREIGN KEY (`city_no`) REFERENCES `city` (`city_no`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```


### ACTION
- 도시 여행계획 생성
  [post] http://localhost:8080/api/createCityTour
- 도시여행계획 조회
  [post] http://localhost:8080/api/searchTour


### API 문서
- 서버 실행후 http://localhost:8080 호출을 통해 api 문서를 확인할 수 있습니다.


### 테스트
- 테스트는 아래의 명령어를 통해 실행 가능합니다.
- `npm run test:create`: 도시여행 등록 테스트
- `npm run test:search`: 도시여행 조회 테스트