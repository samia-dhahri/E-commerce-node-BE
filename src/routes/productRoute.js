import * as productController from '../controllers/productController.js';
import express from "express";
import { cacheMiddleware} from "../middlewares/cacheMiddleware.js";
import {cacheKeys} from "../cache/keys.js";

const router = express.Router();

router.get('/products', cacheMiddleware({ keyFn: () => cacheKeys.productsList(), ttlSeconds: 30 }), productController.getProducts);
router.post('/products', productController.createProduct);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);
export default router;