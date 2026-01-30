import { jest } from "@jest/globals";

jest.unstable_mockModule("../db/db.js", () => ({
    query: jest.fn(),
}));

const { query } = await import("../db/db.js");
const productService = await import("./productService.js");

describe("productService", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("getProducts", () => {

        it("should return rows from database", async () => {
            const fakeRows = [{ id: 1 }, { id: 2 }];
            query.mockResolvedValue({ rows: fakeRows });

            const result = await productService.getProducts();

            expect(query).toHaveBeenCalledWith("SELECT * FROM product");
            expect(result).toEqual({ rows: fakeRows });
        });

        it("should throw if query fails", async () => {
            query.mockRejectedValue(new Error("DB error"));

            await expect(productService.getProducts()).rejects.toThrow("DB error");
        });

    });

    describe("createProduct", () => {

        it("should insert product and return created row", async () => {
            const input = { name: "A", description: "desc", price_cents: 100 };
            const dbRow = { id: 1, ...input };

            query.mockResolvedValue({ rows: [dbRow] });

            const result = await productService.createProduct(input);

            expect(query).toHaveBeenCalled();
            expect(result).toEqual(dbRow);
        });

        it("should throw if query fails", async () => {
            query.mockRejectedValue(new Error("DB error"));

            await expect(
                productService.createProduct({ name: "A" })
            ).rejects.toThrow("DB error");
        });
    });

    describe("updateProduct", () => {

        it("should return updated row", async () => {
            const dbRow = { id: 1, name: "Updated" };
            query.mockResolvedValue({ rows: [dbRow] });

            const result = await productService.updateProduct(
                { name: "Updated" },
                1
            );

            expect(result).toEqual(dbRow);
        });

        it("should return undefined if no rows updated", async () => {
            query.mockResolvedValue({ rows: [] });

            const result = await productService.updateProduct({ name: "X" }, 999);

            expect(result).toBeUndefined();
        });
    });

    describe("deleteProduct", () => {
        
        it("should return true if a row is deleted", async () => {
            query.mockResolvedValue({ rows: [{ id: 1 }] });

            const result = await productService.deleteProduct(1);

            expect(result).toBe(true);
        });

        it("should return false if no row is deleted", async () => {
            query.mockResolvedValue({ rows: [] });

            const result = await productService.deleteProduct(999);

            expect(result).toBe(false);
        });
    });
});