import {query} from "../db/db.js";

export const getProducts = async () => {
    const {rows} = await query('SELECT * FROM product');
    return {rows};
}

export const createProduct = async(productData) => {
    const{name, description, price_cents} = productData;
    const{rows} = await query(`INSERT INTO product (name, description, price_cents)
        VALUES ($1, $2, $3) RETURNING *`, [name, description, price_cents]
    );
    return rows[0];
}

export const updateProduct = async(productData, productId) => {
    const{name, description, price_cents} = productData;
    const{rows} = await query(`UPDATE product SET name = $1, description = $2, price_cents = $3
        WHERE id = $4 RETURNING *`, [name, description, price_cents, productId]
    );
    return rows[0];
}

export const deleteProduct = async(productId) => {
    const{rows} = await query(`DELETE FROM product WHERE id = $1 RETURNING id`, [productId]);
    return rows.length > 0;
}