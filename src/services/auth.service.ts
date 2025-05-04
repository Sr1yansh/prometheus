import { generateToken } from '../utils/jwt';
import bcrypt from 'bcryptjs';
import User from '../database/models/user';

export const registerUserService = async (name: string, email: string, password: string) => {
  const existing = await User.findOne({ where: { email } });
  if (existing) throw new Error('Email already in use');

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });

  const token = generateToken({ id: user.id, email: user.email });
  return { user, token };
};

export const loginUserService = async (email: string, password: string) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error('Invalid email or password');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid email or password');

  const token = generateToken({ id: user.id, email: user.email });
  return { user, token };
};
