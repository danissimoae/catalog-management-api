const logger = require('../config/logger');

const errorHandler = (err, req, res, next) => {
  logger.error(err.message, { error: err.stack });

  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Внутренняя ошибка сервера'
  });
};

module.exports = errorHandler;
