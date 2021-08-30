export const DEFAULT = {
  mysql: () => {
    const MAX_CONNECTION_LENGTH = 4000;
    const ECS_CONTAINER_LENGTH = 20;

    return {
      host: 'localhost',
      user: 'root',
      password: '1234',
      database: 'cityTour',
      charset: 'utf8_general_ci',
      timezone: 'local',
      connectTimeout: 10000,
      insecureAuth: false,
      dateStrings: true,
      decimalNumbers: true,
      debug: false,
      trace: false,
      multipleStatements: true,
      waitForConnections: true,
      connectionLimit: MAX_CONNECTION_LENGTH * (70 / 100) / ECS_CONTAINER_LENGTH / 2 / 2,
      queueLimit: 1000
    }
  }
};