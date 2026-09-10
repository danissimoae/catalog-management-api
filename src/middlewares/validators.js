const { body, param, query, validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: 'Ошибка валидации',
      details: errors.array()
    });
  }
  next();
};

const productValidators = {
  create: [
    body('name').trim().notEmpty().withMessage('Название обязательно')
      .isLength({ max: 100 }).withMessage('Название слишком длинное'),
    body('description').trim().notEmpty().withMessage('Описание обязательно')
      .isLength({ max: 500 }).withMessage('Описание слишком длинное'),
    body('price').isFloat({ min: 0 }).withMessage('Цена должна быть положительным числом'),
    body('category').isIn(['electronics', 'clothing', 'food', 'books', 'other'])
      .withMessage('Некорректная категория'),
    body('stock').isInt({ min: 0 }).withMessage('Количество должно быть неотрицательным целым числом'),
    validate
  ],
  update: [
    param('id').isInt({ min: 1 }).withMessage('Некорректный ID'),
    body('name').optional().trim().isLength({ max: 100 }).withMessage('Название слишком длинное'),
    body('description').optional().trim().isLength({ max: 500 }).withMessage('Описание слишком длинное'),
    body('price').optional().isFloat({ min: 0 }).withMessage('Цена должна быть положительным числом'),
    body('category').optional().isIn(['electronics', 'clothing', 'food', 'books', 'other'])
      .withMessage('Некорректная категория'),
    body('stock').optional().isInt({ min: 0 }).withMessage('Количество должно быть неотрицательным целым числом'),
    validate
  ],
  getById: [
    param('id').isInt({ min: 1 }).withMessage('Некорректный ID'),
    validate
  ],
  list: [
    query('page').optional().isInt({ min: 1 }).withMessage('Номер страницы должен быть положительным числом'),
    query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Лимит должен быть от 1 до 100'),
    query('minPrice').optional().isFloat({ min: 0 }).withMessage('Минимальная цена должна быть неотрицательной'),
    query('maxPrice').optional().isFloat({ min: 0 }).withMessage('Максимальная цена должна быть неотрицательной'),
    validate
  ]
};

module.exports = productValidators;
