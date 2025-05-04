import express from 'express';
import dotenv from 'dotenv';
import routes from './routes';

dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT || 3000;

app.use(express.json());
app.use('/api', routes);

app.get('/', (_req,res)=>{
    res.send('Server is running')
})

app.listen(PORT, () => {
    console.log(`Server running on  http://localhost:${PORT}`);
})