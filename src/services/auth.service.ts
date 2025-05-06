import { generateToken } from '../utils/jwt';
import bcrypt from 'bcryptjs';
import { UserRole } from '../database/models/user';
import { findUserByEmail, createUser } from './user.service';
import { AuthError } from '../utils/errors';
import { JWTPayload } from '../types/jwt';

const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;

export const registerUserService = async (
  name: string,
  email: string,
  password: string,
  role: UserRole
) => {
  const existing = await findUserByEmail(email);
  if (existing) throw new AuthError('Email already in use', 409);

  const user = await createUser(name, email, password, role);

  const { password: _, ...safeUser } = user.toJSON();
  const payload: JWTPayload = { id: user.id, email: user.email, role: user.role as UserRole };
  const token = generateToken(payload);

  return { user: safeUser, token };
};

export const loginUserService = async (email: string, password: string) => {
  const user = await findUserByEmail(email);
  if (!user) throw new AuthError('Invalid email or password', 401);

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new AuthError('Invalid email or password', 401);

  const payload: JWTPayload = { id: user.id, email: user.email, role: user.role as UserRole };
  const accessToken = generateToken(payload);
  const refreshToken = generateToken(payload, '7d', JWT_REFRESH_SECRET);

  user.refreshToken = refreshToken;
  await user.save();

  const { password: _, refreshToken: __, ...safeUser } = user.toJSON();
  return { user: safeUser, accessToken, refreshToken };
};
