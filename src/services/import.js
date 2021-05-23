const compressing = require('compressing');
const config = require('../config')
const fs = require('fs-extra');
const { nanoid } = require('nanoid');
const { Pool } = require("pg");
const objstore = require('./objstore')

const db = new Pool(config.db)

const getLastImport = async() => {
  const sql = `SELECT max(iteration) FROM avapolos_sync WHERE instance='${config.instance}' AND operation='I'`;
  const result = (await db.query(sql)).rows[0].max;

  if (!result) return 0
  return result
}

const getNextImport = async() => {
  const lastImport = await getLastImport()
  return lastImport + 1;
}

const resolveImportName = (instance, iteration) => `${instance}.${iteration}.tgz`;

const run = async () => {
  console.log('importing')  
  const nextImport = await getNextImport()
  const importName = resolveImportName(config.instance, nextImport);
  const tmpImportPath = `${__dirname}/import.tgz`;

  // const nextImport = 50
  console.log(`next iteration: ${nextImport}`)

  if (! await objstore.has(config.minio.importsBucket, importName)) throw new Error('import archive was not found');

  await objstore.get(config.minio.importsBucket, importName, tmpImportPath);

  

}

module.exports = {
  run
};
