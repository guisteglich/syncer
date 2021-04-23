const compressing = require('compressing');
const config = require('../config')
const fs = require('fs-extra');
const { nanoid } = require('nanoid');
const { Pool } = require("pg");
const objstore = require('./objstore')

const db = new Pool(config.db)


const getNextImport = async() => {
  const lastImport = await getLastImport()
  return lastImport + 1;
}

const getLastImport = async() => {
  const sql = `SELECT max(iteration) FROM avapolos_sync WHERE instance='${config.instance}' AND operation='I'`;
  const result = (await db.query(sql)).rows[0].max;

  if (!result) return 0
  return result
}

const run = async () => {
  console.log('importing')  
  // const nextImport = await getNextImport()
  const nextImport = 50
  console.log(`next iteration: ${nextImport}`)

  try {
    await objstore.get('exports', `${config.instance}.${nextImport}.tgz`, `${__dirname}/import.tgz`)
  } catch (error) {
    if (error.message == "Not Found") {
      console.log('sync packet not found, aborting import.')
    } else {
      throw error
    }
  }

  // atualizar db sync com o database do pacote de sincronização

  // rsync moodledata filedir


}

module.exports = {
  run
};
