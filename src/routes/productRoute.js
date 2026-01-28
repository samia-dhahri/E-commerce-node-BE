import * as productController from '../controllers/productController.js';
import express from "express";

const router = express.Router();

router.get('/products', productController.getProducts);
router.post('/products', productController.createProduct);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);
export default router;