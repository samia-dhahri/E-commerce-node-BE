import express from 'express';
import cors from'cors';
import productRoutes from './routes/productRoute.js';
import * as dotenv from "dotenv";
import {closeRedis, initRedis} from "./cache/redis.js";

dotenv.config();

const  app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use('/api', productRoutes);
app.set("etag", false);
app.use((req, res, next) => {
    res.setHeader("Cache-Control", "no-store");
    next();
});

// Initialize Redis connection (cache layer)
await initRedis();

process.on("SIGINT", async () => {
    await closeRedis();
    process.exit(0);
});

process.on("SIGTERM", async () => {
    await closeRedis();
    process.exit(0);
});

app.listen(port, () => { console.log(`Server is running in port ${port}`)});
