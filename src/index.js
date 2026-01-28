import express from 'express';
import cors from'cors';
import productRoutes from './routes/productRoute.js';

const  app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use('/api', productRoutes);

app.listen(port, () => { console.log(`Server is running in port ${port}`)});
