import { Process, env, id, specHelper } from "actionhero";
import * as moment from 'moment';

const actionhero = new Process();
let api: any, connection: any;

describe("createCityTour Action Tests", () => {
  beforeAll(async () => {
    api = await actionhero.start();

    connection = await specHelper.buildConnection();
  });

  afterAll(async () => {
    await actionhero.stop();
  });

  test("should have booted into the test env", () => {
    expect(process.env.NODE_ENV).toEqual("test");
    expect(env).toEqual("test");
    expect(id).toBeTruthy();
  });

  test("create city tour plan", async () => {
    connection.params = {
      city_name: 'new york',
      tour_sdate: moment().add(1, 'days').format('YYYY-MM-DD'),
      tour_edate: moment().add(5, 'days').format('YYYY-MM-DD')
    }
    const { result }: any = await specHelper.runAction("createCityTour", connection);
    expect(result.status).toMatch(/success|failure/);
    expect(result.message).not.toBeNull();
    expect(result.message).not.toBe('');
  });
});
