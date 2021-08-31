const { Initializer, api, config } = require('actionhero');
const mysql = require('mysql2');

class Base {
  target: any;
  promiseTarget: any;

  constructor (target: string) {
    this.target = target;
    this.promiseTarget = `promise${target.charAt(0).toUpperCase()}${target.slice(1)}`;
  }

  async query (sql: string, args: any) {
    if (process.env.NODE_ENV === 'test' && sql.toUpperCase().includes('INSERT')) {
      return {
        insertId: 999
      }
    } else if (process.env.NODE_ENV === 'test' && (sql.toUpperCase().includes('UPDATE') || sql.toUpperCase().includes('DELETE'))) {
      return {
        affectedRows: 999
      }
    } else {
      const returnData = await this[this.promiseTarget].query(sql, args)
      .catch((err: any) => {
        if (err.message.includes('connection')) {
          console.log(`POOL QUERY connection: ${err}`);

          return this[this.promiseTarget].query(sql, args);
        } else {
          throw err;
        }
      });

    return returnData[0];
    }
  }

  async execute (sql: string, args: any) {
    return (await this[this.promiseTarget].execute(sql, args))[0];
  }
}

class Pool extends Base {
  pool: any;
  promisePool: any;

  constructor (pool) {
    super('pool');

    this.pool = pool;
    this.promisePool = pool.promise();
  }

  getConnection () {
    return new Promise((resolve, reject) => {
      this.pool.getConnection((err, conn) => {
        if (err) {
          reject(err);
        }

        resolve(new Connection(conn));
      });
    });
  }
}

class Connection extends Base {
  connection: any;
  promiseConnection: any;

  constructor (connection) {
    super('connection');

    this.connection = connection;
    this.promiseConnection = connection.promise();
  }

  async beginTransaction () {
    return await this.promiseConnection.beginTransaction();
  }

  async commit () {
    await this.promiseConnection.commit();
  }

  async rollback () {
    await this.promiseConnection.rollback();
  }

  release () {
    this.promiseConnection.release();
  }

  destroy () {
    this.promiseConnection.destroy();
  }
}

module.exports = class MysqlInit extends Initializer {
  constructor () {
    super();

    this.loadPriority = 100;
    this.startPriority = 100;
    this.stopPriority = 100;
    this.name = 'MysqlInit';
  }

  createPool() {
    return new Promise((res) => {
      const pool = mysql.createPool(config.mysql);

      if (typeof pool === 'undefined') {
        setTimeout(() => res(mysql.createPool(config.mysql)), 3000);
      } else {
        res(pool);
      }
    });
  }

  async initialize () {
    try {      
      api.db = new Pool(await this.createPool());
    } catch (err) {
      console.log('------------------ err ------------------');
      console.log(`Get Pool Error: ${err}`);
    }
  }
};