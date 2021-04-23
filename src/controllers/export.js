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

    for (o of exports) {
      o.path = `/${o.instance}/${o.iteration}`
    }
    
    res.json(exports)
  } catch(error) {
    res.status(500).json({ success: false, message: error.message });
    console.log(error)
  }
}

const getByInstanceAndIteration = async (req, res) => {

}

module.exports = {
  run,
  listByInstance,
};
