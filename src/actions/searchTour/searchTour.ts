import { Action } from "actionhero";
import { Data, TourInfo } from './searchTour.types';
import * as moment from 'moment';

export class SearchTour extends Action {
  constructor() {
    super();

    this.name = "searchTour";
    this.description = "도시 여행정보를 조회합니다.";
    this.inputs = {
      city_name: { required: false },
      search_type: {
        required: false,
        validator: (param: string) => {
          if (param && !['TEAVELLING','TRAVEL_SCHEDULE','RECENT_REGIST','RECENT_SEARCH'].includes(param.toUpperCase())) {
            return {
              status: 'failure',
              message: '검색조건은 TEAVELLING(여행중), TRAVEL_SCHEDULE(여행예정), RECENT_REGIST(최근 1일 이내 등록), RECENT_SEARCH(최근 1주일 이내 조회) 만 가능합니다.'
            };
          }
        }
      }
    };
  }

  async run({ params, response }: Data ) {
    const { city_name, search_type } = params;
    const search_keys = [],
          search_values = [];
    let orderBy = 'rand()',
        limit = 'LIMIT 10';

    try {

      if (city_name) {
        search_keys.push(`c.city_name=?`);
        search_values.push(city_name);
      }

      if (search_type) {
        switch (search_type.toUpperCase()) {
          // 여행중
          case 'TEAVELLING':
            search_keys.push(`curdate() BETWEEN t.sdate AND t.edate`);
            orderBy = 't.sdate ASC';
            break;
          // 여행예정
          case 'TRAVEL_SCHEDULE':
            search_keys.push(`curdate() > t.sdate`);
            orderBy = 't.sdate ASC';
            break;
          // 최근 1일 이내 등록
          case 'RECENT_REGIST':
            search_keys.push(`c.wdate > '${moment().add(-1, 'days').format('YYYY-MM-DD HH:mm:ss')}'`);
            orderBy = 'diffTime ASC';
            break;
          // 최근 일주일 이내 조회
          case 'RECENT_SEARCH':
            search_keys.push(`c.search_date > '${moment().add(-1, 'weeks').format('YYYY-MM-DD HH:mm:ss')}'`);
            orderBy = 'c.search_date DESC';
            break;
          default:
            break;
        }
      }

      // 여행일정이 끝나지않은 여행 갯수 확인
      const reamin_cnts = await api.db.query(`SELECT COUNT(*) AS cnt from tour WHERE edate > curdate();`);

      if (reamin_cnts.length && reamin_cnts[0].cnt > 10) {
        limit = '';
      }

      const query = `
        SELECT *, TIMESTAMPDIFF(SECOND, c.wdate, CURRENT_DATE) AS diffTime FROM 
        city AS c
        INNER JOIN tour AS t ON c.city_no = t.city_no
        WHERE ${search_keys.join(' AND ')}
        ORDER BY ${orderBy} 
        ${limit};
      `;
      const rows = await api.db.query(query, search_values);

      if (!rows.length) {
        throw new Error('조회되는 여행정보가 없습니다.');
      }

      // 단건조회인경우 조회일자 업데이트
      if (city_name) {
        await api.db.query(`UPDATE city SET search_date=now() WHERE city_no=?;`, [rows[0].city_no]);
      }

      response.result = {
        status: 'success',
        citys: rows.map((o: TourInfo) => {
          return {
            city_name: o.city_name,
            wdate: o.wdate,
            sdate: o.sdate,
            edate: o.edate
          }
        })
      };
    } catch (err) {
      response.result = {
        status: 'failure',
        message: err.message || '여행 조회에 실패하였습니다.'
      };
    }
  }
}
