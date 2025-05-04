import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { NextFunction } from 'express';
import { TUser } from '../database/models/user';

dotenv.config();

declare global {
    namespace Express {
        interface Request {
            user?: TUser;
        }
    }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: "Access Denied" });
        return;
    }

    try {
        const secret = process.env.JWT_SECRET as string;
        const decoded = jwt.verify(token, secret) as TUser;
        req.user = decoded;
        next();
    } catch (err) {
        console.log(err)
        res.status(403).json({ message: 'Invalid Token' });
    }
}

