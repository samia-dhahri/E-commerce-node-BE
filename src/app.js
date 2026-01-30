import express from 'express';
import cors from'cors';
import productRoutes from './routes/productRoute.js';

export function buildApp() {
    const app = express();

    app.use(cors());
    app.use(express.json());

    app.use('/api', productRoutes);

    app.set("etag", false);
    app.use((req, res, next) => {
        res.setHeader("Cache-Control", "no-store");
        next();
    });

    return app;
}