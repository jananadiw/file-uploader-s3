/* eslint-disable */

const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    database: {
        "type": "mysql",
        "host": process.env.API_DB_HOST,
        "port": process.env.API_DB_PORT,
        "username": process.env.API_DB_USERNAME,
        "password": process.env.API_DB_PASSWORD,
        "database": process.env.API_DB_DATABASE,
        "entities": ["dist/**/*.entity{.ts,.js}"],
        "synchronize": true 
      }

      // aws:{}
      //auth:{}
}
