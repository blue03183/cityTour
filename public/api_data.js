define({ "api": [
  {
    "type": "post",
    "url": "createCityTour",
    "title": "도시여행 계획 등록",
    "name": "도시여행_계획_등록",
    "group": "등록",
    "version": "1.0.0",
    "description": "<p>도시 여행 계획을 등록합니다.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "city_name",
            "description": "<p>도시이름</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "tour_sdate",
            "description": "<p>여행시작일 (0000-00-00 형식으로 입력해주십시오.)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "tour_edate",
            "description": "<p>여행종료일 (0000-00-00 형식으로 입력해주십시오.)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request (example): ",
          "content": "{\n\t\"city_name\": \"NEW YORK\",\n\t\"tour_sdate\": \"2021-09-05\",\n\t\"tour_edate\": \"2021-09-25\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.status",
            "description": "<p>결과</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.message",
            "description": "<p>성공 또는 실패 메세지</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "{\n    \"result\": {\n        \"status\": \"success\",\n        \"message\": \"여행계획이 정상적으로 등록되었습니다.\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "4xx": [
          {
            "group": "4xx",
            "optional": false,
            "field": "400",
            "description": "<p>필수 파라미터 누락</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error (example):",
          "content": "{\n  \"result\": {\n      \"status\": \"failure\",\n      \"message\": \"이미 여행계획이 등록된 도시 입니다. (NEW YOTK)\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/actions/createCityTour/createCityTour.doc.ts",
    "groupTitle": "등록",
    "sampleRequest": [
      {
        "url": "http://localhost:8080/api/createCityTour"
      }
    ]
  },
  {
    "type": "post",
    "url": "searchTour",
    "title": "도시여행 계획 조회",
    "name": "도시여행_계획_조회",
    "group": "조회",
    "version": "1.0.0",
    "description": "<p>도시 여행 계획을 조회합니다.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "city_name",
            "description": "<p>도시이름</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"TEAVELLING(여행중)\"",
              "\"TRAVEL_SCHEDULE(여행예정)\"",
              "\"RECENT_REGIST(최근 1일 이내 등록)\""
            ],
            "optional": true,
            "field": "search_type",
            "description": "<p>검색 조건</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request (example): ",
          "content": "{\n\t\"city_name\": \"NEW YOTK\",\n\t\"search_type\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.status",
            "description": "<p>결과</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "result.citys",
            "description": "<p>검색된 도시정보</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.citys.city_name",
            "description": "<p>도시이름</p>"
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "result.citys.wdate",
            "description": "<p>등록일</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "result.citys.sdate",
            "description": "<p>여행시작일</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "result.citys.edate",
            "description": "<p>여행종료일</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "result.message",
            "description": "<p>에러인경우 에러메세지</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "{\n    \"result\": {\n        \"status\": \"success\",\n        \"citys\": [\n            {\n                \"city_name\": \"NEW YOTK\",\n                \"wdate\": \"2021-08-31 19:14:38\",\n                \"sdate\": \"2021-09-05\",\n                \"edate\": \"2021-09-25\"\n            }\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "4xx": [
          {
            "group": "4xx",
            "optional": false,
            "field": "400",
            "description": "<p>필수 파라미터 누락</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error (example):",
          "content": "{\n    \"result\": {\n        \"status\": \"failure\",\n        \"message\": \"조회되는 여행정보가 없습니다.\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/actions/searchTour/searchTour.doc.ts",
    "groupTitle": "조회",
    "sampleRequest": [
      {
        "url": "http://localhost:8080/api/searchTour"
      }
    ]
  }
] });
