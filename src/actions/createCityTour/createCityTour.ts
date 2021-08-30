import { Action } from "actionhero";
import { DATA } from './createCityTour.types';
import * as moment from 'moment';

export class CreateCityTour extends Action {
  constructor() {
    super();

    this.name = "createCityTour";
    this.description = "도시 여행정보를 등록합니다.";
    this.inputs = {
      city_name: { required: true },
      tour_sdate: { 
        required: true,
        validator: (param: string) => {
          const checkRegex = /^\d{4}-\d{2}-\d{2}$/;
          if (!checkRegex.test(param)) {
            return {
              status: 'failure',
              message: '여행 시작일은 0000-00-00 형식으로 입력해주십시오.'
            };
          }
        }
      },
      tour_edate: { 
        required: true,
        validator: (param: string) => {
          const checkRegex = /^\d{4}-\d{2}-\d{2}$/;
          if (!checkRegex.test(param)) {
            return {
              status: 'failure',
              message: '여행 종료일은 0000-00-00 형식으로 입력해주십시오.'
            };
          }
        }
      }
    };
  }

  async run({ params, response }: DATA ) {

    const { city_name, tour_sdate, tour_edate } = params;
    let conn;

    try {
      // 여행시작일은 현재날짜보다 커야 하고 
      // 여행 종료일은 현재날짜 및 여행 시작일보다 커야 함.
      if (moment() >= moment(tour_sdate) || moment() >= moment(tour_edate)) {
        throw Error('여행시작일 및 종료일은 현재날짜보다 커야 합니다.');
      } else if (moment(tour_edate) <= moment(tour_sdate)) {
        throw Error('여행 종료일은 여행시작일보다 커야 합니다.');
      }

      conn = await api.db.getConnection();
      await conn.beginTransaction();

      // 도시 등록
      // 도시이름은 유니크이기 때문에 등록이 되지않으면 중복 도시로 본다.
      const { insertId } = await conn.query('INSERT IGNORE INTO city SET ?;', { city_name });

      if (!insertId) {
        throw Error(`이미 여행계획이 등록된 도시 입니다. (${city_name})`);
      }
      const res = await conn.query('INSERT INTO tour SET ?;', {
        city_no: insertId,
        sdate: tour_sdate,
        edate: tour_edate
      });
      
      if (res.insertId) {      
        response.result = {
          status: 'success',
          message: "여행계획이 정상적으로 등록되었습니다."
        };
      } else {
        throw Error('여행계획 등록에 실패하였습니다.');
      }

      await conn.commit();
    } catch (err) {
      if (conn) {
        await conn.rollback();
      }

      response.result = {
        status: 'failure',
        message: err.message || '여행계획 등록에 실패하였습니다.'
      };
    } finally {
      if (conn) {
        conn.release();
      }
    }
  }
}
