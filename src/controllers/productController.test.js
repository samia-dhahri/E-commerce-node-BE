import { jest } from "@jest/globals";

jest.unstable_mockModule("../services/productService.js", () => ({
    getProducts: jest.fn(),
    createProduct: jest.fn(),
    updateProduct: jest.fn(),
    deleteProduct: jest.fn(),
}));

const productService = await import("../services/productService.js");
const productController = await import("./productController.js");

function  createRes(){
    const res= {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
}

describe("productController", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(console, "error").mockImplementation(() => {});
    });

    afterEach(() => {
        console.error.mockRestore();
    });

    describe("getProducts", () => {
        it("should return 200 with products", async () => {
            const req = {};
            const res = createRes();

            const products = [{ id: 1, name: "A"}, {id: 2, name: "B"}];
            productService.getProducts.mockResolvedValue(products);

            await productController.getProducts(req, res);

            expect(productService.getProducts).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(products);
        });
        it("should return 500 if service throws", async () => {
            const req = {};
            const res = createRes();

            productService.getProducts.mockRejectedValue(new Error("Error fetching product:"));
            await productController.getProducts(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({message: "Internal server error"});
        })
    });

    describe("createProduct", () => {
        it("Should return 201 with created product", async () => {
            const req = {body: {name:"new", price: 10}};
            const res = createRes();
            const created = {id: 123, name: "testName", price: 0};

            productService.createProduct.mockResolvedValue(created);

            await productController.createProduct(req, res);

            expect(productService.createProduct).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(created);
        });

    });

    describe("updateProduct", () => {
        it("Should return 200 with updated product", async () => {
            const req = {body: {name:"oldName", price: 10}, params: {id: 123}};
            const res = createRes();
            const updated = {id: 123, name: "newName", price: 0};

            productService.updateProduct.mockResolvedValue(updated);

            await productController.updateProduct(req, res);

            expect(productService.updateProduct).toHaveBeenCalledWith(req.body, req.params.id);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(updated);
        });

        it("Should return 404: case not found product", async () => {
            const req = {body: {name:"oldName", price: 10}, params: {id: 123}};
            const res = createRes();

            productService.updateProduct.mockResolvedValue(null);

            await productController.updateProduct(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({message: "Product not found!"});
        });

    });

    describe("deleteProduct", () => {
        it("Should return 204 with deleted product successfully", async () => {
            const req = { params: {id: "123"}};
            const res = createRes();

            productService.deleteProduct.mockResolvedValue(true);

            await productController.deleteProduct(req, res);
            expect(productService.deleteProduct).toHaveBeenCalledWith(req.params.id);
            expect(res.status).toHaveBeenCalledWith(204);
            expect(res.send).toHaveBeenCalledTimes(1);
        });

        it("Should return 404: case not found product", async () => {
            const req = { params: { id: "123" } };
            const res = createRes();

            productService.deleteProduct.mockResolvedValue(false);

            await productController.deleteProduct(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "Product not found!" });
        });

    });
})