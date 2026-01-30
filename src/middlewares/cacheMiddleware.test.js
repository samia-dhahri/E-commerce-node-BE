import { jest } from "@jest/globals";

jest.unstable_mockModule("../cache/cacheService.js", () =>({
    cacheGet: jest.fn(),
    cacheSet: jest.fn(),
}));

const { cacheGet, cacheSet } = await import("../cache/cacheService.js");
const { cacheMiddleware } = await import("./cacheMiddleware.js");

function createRes(){
    const res = {};
    res.headers = {};
    res.statusCode = 200;

    res.setHeader = jest.fn((k, v) => {
        res.headers[k] = v;
    });

    res.status = jest.fn((code) => {
        res.statusCode = code;
        return res;
    });

    res.json = jest.fn((body) => body);
    return res;
}

describe("cacheMiddleware", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(console, "error").mockImplementation(()=>{});
        jest.spyOn(console, "log").mockImplementation(()=>{});
    });

    afterEach(() =>{
        console.error.mockRestore();
        console.log.mockRestore();
    });

    it("BYPASS cache x-cache-bypass=1", async () =>{
        const mw = cacheMiddleware({keyFn: () => "k"});
        const req = {headers: {"x-cache-bypass": "1"}};
        const res = createRes();
        const next = jest.fn();

        await mw(req, res, next);
        expect(res.setHeader).toHaveBeenCalledWith("X-Cache", "BYPASS");
        expect(cacheGet).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalledTimes(1);
    });

    it("call next when keyFen returns false", async () =>{
        const mw = cacheMiddleware({keyFn: () => null});
        const req = {headers: {}};
        const res = createRes();
        const next = jest.fn();

        await mw(req, res, next);
        expect(cacheGet).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalledTimes(1);
    });

    it("should return HIT when cacheGet returns value", async () => {
        const mw = cacheMiddleware({ keyFn: () => "product:1" });
        const req = { headers: {} };
        const res = createRes();
        const next = jest.fn();

        const cachedValue = { id: 1, name: "A" };
        cacheGet.mockResolvedValue(cachedValue);

        await mw(req, res, next);

        expect(cacheGet).toHaveBeenCalledWith("product:1");
        expect(res.setHeader).toHaveBeenCalledWith("X-Cache", "HIT");
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(cachedValue);

        // On doit avoir répondu, donc pas de next()
        expect(next).not.toHaveBeenCalled();
    });
});