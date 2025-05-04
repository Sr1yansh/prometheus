import { Request, Response } from 'express';
import dotenv from 'dotenv';
import { registerUserService, loginUserService } from '../services/auth.service';
dotenv.config();


export const register = async (req: Request, res: Response) => {
    const {name, email, password} = req.body;
    try{
        const {user, token} = await registerUserService(name, email, password);
        res.status(201).json({message : "User Registered", user, token})
    } catch (err: any) {
        res.status(500).json({error : 'Registration failed'});
    }
}

export const login = async (req: Request, res: Response) => {
    const {email, password} = req.body;
    try{
        const {user, token} = await loginUserService(email, password);
        res.status(201).json({message : "User Logged In", user, token})
    } catch(err: any) {
        res.status(500).json({error : "Login Failed"});
    }
}
