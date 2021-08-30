import { Action } from "actionhero";
import { DATA } from './searchTour.types';
import * as moment from 'moment';

export class CreateCityTour extends Action {
  constructor() {
    super();

    this.name = "createCityTour";
    this.description = "도시 여행정보를 조회합니다.";
    this.inputs = {
      city_name: { required: false },
      search_type: {
        required: false,
        validator: (param: string) => {
          if (!['travelling','travel_schedule','recent_regist','recent_search'].includes(param)) {
            return {
              status: 'failure',
              message: '검색조건은 travelling(여행중), travel_schedule(여행예정), recent_regist(최근 1일 이내 등록), recent_search(최근 1주일 이내 조회) 만 가능합니다.'
            };
          }
        }
      }
    };
  }

  async run({ params, response }: DATA ) {
    const { city_name, search_type } = params;
    const wheres = [],
          values = [];
    let orderBy = 'rand()',
        limit = 10;

    try {

      if (city_name) {
        wheres.push(`c.city_name=?`);
        values.push(city_name);
      }

      switch (search_type.toUpperCase()) {
        // 여행중
        case 'TEAVELLING':
          wheres.push(`curdate() BETWEEN t.sdate AND t.edate`);
          orderBy = 't.sdate ASC';
          break;
        // 여행예정
        case 'TRAVEL_SCHEDULE':
          wheres.push(`curdate() > t.sdate`);
          orderBy = 't.sdate ASC';
          break;
        // 최근 1일 이내 등록
        case 'RECENT_REGIST':
          wheres.push(`curdate() > t.sdate`);
          break;
        // 최근 일주일 이내 조회
        case 'RECENT_SEARCH':
          wheres.push(`curdate() > t.sdate`);
          break;
        default:
          break;
      }

      const query = `
        SELECT * FROM 
        city AS c
        INNER JOIN tour AS t ON c.city_no = t.city_no
        WHERE ${wheres.join(' AND ')}
        ${orderBy} ${limit};
      `;
    } catch (err) {

      response.result = {
        status: 'failure',
        message: err.message || '여행 조회에 실패하였습니다.'
      };
    }
  }
}
