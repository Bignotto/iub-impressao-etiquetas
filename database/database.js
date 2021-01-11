//require('dotenv').config();
const chalk = require("chalk");
const sql = require("mssql");
const config = require("./credential");

module.exports = {
  async getConnection() {
    try {
      console.log(
        chalk.blue(`connecting to database ${config.server} ${config.database}`)
      );
      let conn = await sql.connect(config);
      return conn;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  async closeConnection() {
    try {
      await sql.close();
      return;
    } catch (error) {
      console.log("Erro no close");
      return error;
    }
  },
};
