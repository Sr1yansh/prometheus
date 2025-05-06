import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cookieParser from 'cookie-parser';
import routes from './routes';
import { apiLimiter } from './middleware/rateLimiter.middleware';

if (!process.env.JWT_SECRET || !process.env.JWT_REFRESH_SECRET) {
    throw new Error('Required environment variables are not defined');
}

const app = express();
const PORT = process.env.SERVER_PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use('/api', apiLimiter);
app.use('/api', routes);

app.get('/', (_req,res)=>{
    res.send('Server is running')
})

app.listen(PORT, () => {
    console.log(`Server running on  http://localhost:${PORT}`);
})