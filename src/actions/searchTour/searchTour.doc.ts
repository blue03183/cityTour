/**
 * @api {post} searchTour 도시여행 계획 조회
 * @apiName 도시여행 계획 조회
 * @apiGroup 조회
 * @apiVersion 1.0.0
 * @apiDescription 도시 여행 계획을 조회합니다.
 * 
 * @apiParam {String} [city_name] 도시이름
 * @apiParam {String="TEAVELLING(여행중)", "TRAVEL_SCHEDULE(여행예정)", "RECENT_REGIST(최근 1일 이내 등록)"} [search_type] 검색 조건
 * 
 * @apiParamExample {json} Request (example): 
{
	"city_name": "NEW YOTK",
	"search_type": ""
}
 * 
 * @apiSuccess {Object} result 
 * @apiSuccess {String} result.status 결과
 * @apiSuccess {Object} result.citys 검색된 도시정보
 * @apiSuccess {String} result.citys.city_name 도시이름
 * @apiSuccess {DateTime} result.citys.wdate 등록일
 * @apiSuccess {Date} result.citys.sdate 여행시작일
 * @apiSuccess {Date} result.citys.edate 여행종료일
 * @apiSuccess {String} result.message 에러인경우 에러메세지
 * @apiSuccessExample {json} Response (example):
{
    "result": {
        "status": "success",
        "citys": [
            {
                "city_name": "NEW YOTK",
                "wdate": "2021-08-31 19:14:38",
                "sdate": "2021-09-05",
                "edate": "2021-09-25"
            }
        ]
    }
}
 * 
 * @apiError (4xx) 400  필수 파라미터 누락
 * @apiErrorExample {json} Error (example):
{
    "result": {
        "status": "failure",
        "message": "조회되는 여행정보가 없습니다."
    }
}
 * 
 */