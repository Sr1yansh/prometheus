import { body } from 'express-validator';

export const createTaskValidator = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().isString(),
  body('isCompleted')
    .optional()
    .isBoolean()
];

export const updateTaskValidator = [
  body('title').optional().isString(),
  body('description').optional().isString(),
  body('isCompleted')
    .optional()
    .isBoolean()
];
