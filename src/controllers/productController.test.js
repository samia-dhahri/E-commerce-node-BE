import { jest } from "@jest/globals";

jest.unstable_mockModule("../services/productService.js", () => ({
    getProducts: jest.fn(),
    createProducts: jest.fn(),
    updateProducts: jest.fn(),
    deleteProducts: jest.fn(),
}));

const productServcie = await import("../services/productService.js");
const controller = await import("../controllers/productController.js");

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
        it("should return 500 if service throws", async () => {
            const req = {};
            const res = createRes();

            productServcie.getProducts.mockRejectedValue(new Error("Error test getProducts !"));
            await controller.getProducts(req, res);

            expect(productServcie.getProducts).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({message: "Internal server error"});
        })
    });
    describe("createProducts", () => {
        it("Should return 201 with created product", async () => {

        });

        it("Should return 500 in fail case", async () => {

        });
    });
    describe("updateProducts", () => {
        it("Should return 200 with updated product", async () => {

        });

        it("Should return 404: case not found product", async () => {

        });

        it("Should return 500: case it fails", async () => {

        });
    });
    describe("deleteProducts", () => {
        it("Should return 204 with deleted product successfully", async () => {

        });

        it("Should return 404: case not found product", async () => {

        });

        it("Should return 500 if it fails", async () => {

        });
    });
})