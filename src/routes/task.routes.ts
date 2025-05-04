import express from 'express';
import { authenticateToken } from '../middleware/auth.middleware';
import { createTask, getTasks, getTaskById, updateTaskById } from '../controllers/task.controller'
import { createTaskValidator, updateTaskValidator } from '../validators/task.validator';
import { validate } from '../middleware/validate.middleware';
const router = express.Router();

router.post('/', authenticateToken, createTaskValidator, validate, createTask);
router.get('/', authenticateToken, getTasks);
router.get('/:id', authenticateToken, getTaskById);
router.put('/:id', authenticateToken, updateTaskValidator, validate, updateTaskById);


export default router;