import express from 'express';
const {register, login, refreshToken} =  require('../controllers/auth.controller')

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh-token', refreshToken);
export default router;