const { Pool } = require("pg");

const config = require('../config');

const db = new Pool(config.db)

const init = async () => {
  const sql = `
  CREATE TABLE IF NOT EXISTS avapolos_sync (
    id serial not null PRIMARY KEY,
    createdat timestamptz not null DEFAULT NOW(),
    instance char(4) not null,
    iteration int not null,
    operation char(1) not null
  );
  `;

  try {
    await db.query(sql);
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  client: db,
  init,
};
