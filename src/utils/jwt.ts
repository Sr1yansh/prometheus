import jwt, { SignOptions } from 'jsonwebtoken';
import { JWTPayload } from '../types/jwt';

if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
}

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = '1h';

export const generateToken = (
  payload: JWTPayload,
  expiresIn = JWT_EXPIRES_IN,
  jwtSecret = JWT_SECRET
): string => {
  return jwt.sign(payload, jwtSecret, { expiresIn } as SignOptions);
};

export const verifyToken = (token: string, jwtSecret = JWT_SECRET): JWTPayload => {
  return jwt.verify(token, jwtSecret) as JWTPayload;
};

export const decodeToken = (token: string) => {
  return jwt.decode(token);
};
