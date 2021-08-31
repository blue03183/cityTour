import { Process, env, id, specHelper } from "actionhero";
import * as moment from 'moment';

const actionhero = new Process();
let api: any, connection: any;

describe("searchTour Action Tests", () => {
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

  test("search by city name", async () => {
    connection.params = {
      city_name: 'NEW YORK'
    }
    const { result }: any = await specHelper.runAction("searchTour", connection);

    expect(result.status).toMatch(/success|failure/);
    if (result.status === 'success') {
      expect(result.message).toBe('');
      expect(result.citys).not.toBeNull();
      expect(result.citys[0]).toHaveProperty('city_name');
      expect(result.citys[0]).toHaveProperty('wdate');
    } else {
      expect(result.message).not.toBe('');
    }
  });

  test("check the search_type is TEAVELLING ", async () => {
    connection.params = {
      search_type: 'TEAVELLING'
    }
    const { result }: any = await specHelper.runAction("searchTour", connection);

    expect(result.status).toMatch(/success|failure/);
    if (result.status === 'success') {
      expect(result.message).toBeUndefined();
      expect(result.citys).not.toBeNull();
      expect(result.citys[0]).toHaveProperty('city_name');
      expect(result.citys[0]).toHaveProperty('wdate');
    } else {
      expect(result.message).not.toBe('');
    }
  });

  test("check the search_type is TRAVEL_SCHEDULE ", async () => {
    connection.params = {
      search_type: 'TRAVEL_SCHEDULE'
    }
    const { result }: any = await specHelper.runAction("searchTour", connection);

    expect(result.status).toMatch(/success|failure/);
    if (result.status === 'success') {
      expect(result.message).toBeUndefined();
      expect(result.citys).not.toBeNull();
      expect(result.citys[0]).toHaveProperty('city_name');
      expect(result.citys[0]).toHaveProperty('wdate');
    } else {
      expect(result.message).not.toBe('');
    }
  });

  test("check the search_type is RECENT_REGIST ", async () => {
    connection.params = {
      search_type: 'RECENT_REGIST'
    }
    const { result }: any = await specHelper.runAction("searchTour", connection);

    expect(result.status).toMatch(/success|failure/);
    if (result.status === 'success') {
      expect(result.message).toBeUndefined();
      expect(result.citys).not.toBeNull();
      expect(result.citys[0]).toHaveProperty('city_name');
      expect(result.citys[0]).toHaveProperty('wdate');
    } else {
      expect(result.message).not.toBe('');
    }
  });

  test("check the search_type is RECENT_SEARCH ", async () => {
    connection.params = {
      search_type: 'RECENT_SEARCH'
    }
    const { result }: any = await specHelper.runAction("searchTour", connection);

    expect(result.status).toMatch(/success|failure/);
    if (result.status === 'success') {
      expect(result.message).toBeUndefined();
      expect(result.citys).not.toBeNull();
      expect(result.citys[0]).toHaveProperty('city_name');
      expect(result.citys[0]).toHaveProperty('wdate');
    } else {
      expect(result.message).not.toBe('');
    }
  });
});
