import * as productService from "../services/productService.js";

export const getProducts = async (req, res) => {
    try {
        const products = await productService.getProducts();
        res.status(200).json(products);
    }catch (e) {
        console.error('Error fetching product:', e.error);
        res.status(500).json({ message: 'Internal server Error'});
    }
}

export const createProduct = async(req, res) => {
    try{
        const productData = req.body;
        const newProduct = await productService.createProduct(productData);
        res.status(201).json(newProduct);
    }catch (e) {
        console.error('Error creating product:', e);
    }
}

export const updateProduct = async(req, res) => {
    try{
        const productData = req.body;
        const productId = req.params.id;
        const updatedProduct = await productService.updateProduct(productData, productId);
        if(!updatedProduct){
            return res.status(404).json({message: 'Product not found!'})
        }
        res.status(200).json(updatedProduct);
    }catch (e) {
        console.error('Error updating product:', e);
    }
}

export const deleteProduct = async(req, res) => {
    try{
        const productId = req.params.id;
        const deletedProduct = await productService.deleteProduct(productId);
        if(!deletedProduct){
            return res.status(404).json({message: 'Product not found!'})
        }
        res.status(204).send();
    }catch (e) {
        console.error('Error deleting product:', e);
    }
}


