/**
 * @api {post} createCityTour 도시여행 계획 등록
 * @apiName 도시여행 계획 등록
 * @apiGroup 등록
 * @apiVersion 1.0.0
 * @apiDescription 도시 여행 계획을 등록합니다.
 * 
 * @apiParam {String} city_name 도시이름
 * @apiParam {String} tour_sdate 여행시작일 (0000-00-00 형식으로 입력해주십시오.)
 * @apiParam {String} tour_edate 여행종료일 (0000-00-00 형식으로 입력해주십시오.)
 * 
 * @apiParamExample {json} Request (example): 
{
	"city_name": "NEW YORK",
	"tour_sdate": "2021-09-05",
	"tour_edate": "2021-09-25"
}
 * 
 * @apiSuccess {Object} result 
 * @apiSuccess {String} result.status 결과
 * @apiSuccess {String} result.message 성공 또는 실패 메세지
 * @apiSuccessExample {json} Response (example):
{
    "result": {
        "status": "success",
        "message": "여행계획이 정상적으로 등록되었습니다."
    }
}
 * 
 * @apiError (4xx) 400  필수 파라미터 누락
 * @apiErrorExample {json} Error (example):
{
  "result": {
      "status": "failure",
      "message": "이미 여행계획이 등록된 도시 입니다. (NEW YOTK)"
  }
}
 * 
 */