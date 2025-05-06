import { Request, Response } from 'express';
import { registerUserService, loginUserService } from '../services/auth.service';
import { generateToken, verifyToken } from '../utils/jwt';
import { findUserById } from '../services/user.service';
import { AuthError } from '../utils/errors';
import { logger } from '../utils/logger';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;

export const register = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;
  try {
    const { user, token } = await registerUserService(name, email, password, role);
    res.status(201).json({ message: 'User Registered', user, token });
  } catch (err: any) {
    logger.error(`Registration failed: ${err.message}`);
    if (err instanceof AuthError) {
      return res.status(err.statusCode).json({ error: err.message });
    }
    res.status(500).json({ error: 'Registration failed' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const { user, accessToken, refreshToken } = await loginUserService(email, password);
    res.cookie('refreshToken', refreshToken, { httpOnly: true, path: '/auth/refresh-token' });
    res.status(200).json({ message: 'User Logged In', user, accessToken });
  } catch (err: any) {
    if (err instanceof AuthError) {
      return res.status(err.statusCode).json({ error: err.message });
    }
    res.status(500).json({ error: 'Login Failed' });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.sendStatus(401);

    const payload = verifyToken(token, JWT_REFRESH_SECRET);
    const user = await findUserById(payload.id);
    if (!user) return res.sendStatus(403);

    const accessToken = generateToken(payload);
    return res.json({ accessToken });
  } catch (err) {
    logger.error(`Refresh token failed: ${err}`);
    return res.sendStatus(403);
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.sendStatus(204); 

    const payload = verifyToken(token, JWT_REFRESH_SECRET);
    const user = await findUserById(payload.id);
    if (!user) return res.sendStatus(403);

    user.refreshToken = null;
    await user.save();

    res.clearCookie('refreshToken');
    res.sendStatus(204);
  } catch (err) {
    logger.error(`Logout failed: ${err}`);
    res.sendStatus(500);
  }
};
