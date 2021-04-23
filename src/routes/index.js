const express = require('express');

const exportRoutes = require('./export');

const rootRouter = express();

rootRouter.use('/export', exportRoutes);

module.exports = rootRouter;
