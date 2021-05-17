const service = require('../services/export');

/**
 * @param  {import('express').Request} req
 * @param  {import('express').Response} res
 */
const run = async (req, res) => {
  await service.run();
  res.sendStatus(200);
}

/**
 * @param  {import('express').Request} req
 * @param  {import('express').Response} res
 */
const listByInstance = async (req, res) => {
  const instance = req.params.instance;

  if (instance != "IES" && instance != "POLO") {
    return res.status(400).json({
      success: false,
      message: "Instância incorreta!"
    })
  }

  try {
    const exports = await service.listByInstance(instance)
    res.json(exports)
  } catch(error) {
    res.status(500).json({ success: false, message: error.message });
    console.log(error)
  }
}

const getDownloadURLFromInstanceAndIteration = async (req, res) => {
  const instance = req.params.instance;
  const iteration = req.params.iteration;
  
  const url = await service.getDownloadURLFromInstanceAndIteration(instance, iteration);

  res.json({ success: true, url });
}

module.exports = {
  run,
  listByInstance,
  getDownloadURLFromInstanceAndIteration,
};
