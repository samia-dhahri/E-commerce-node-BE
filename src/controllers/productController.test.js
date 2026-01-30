import { jest } from "@jest/globals";

jest.unstable_mockModule("../../../src/services/productService.js", () => ({
    getProducts: jest.fn(),
    createProducts: jest.fn(),
    updateProducts: jest.fn(),
    deleteProducts: jest.fn(),
}));

const productServcie = await import("../../../src/services/productService.js");
const controller = await import("../../../scr/controllers/productController.js");

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
    });

    describe("getProducts", () => {
        it("should return 200 with products", async () => {
            const req = {};
            const res = createRes();

            const products = [{ id: 1, name: "A"}, {id: 2, name: "B"}];
            productServcie.getProducts.mockResolvedValue(products);

            await controller.getProducts(req, res);

            expect(productServcie.getProducts).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(products);
        });

    });
    describe("createProducts", () => {});
    describe("updateProducts", () => {});
    describe("deleteProducts", () => {});
})