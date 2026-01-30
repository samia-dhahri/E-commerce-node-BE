import { jest } from "@jest/globals";

jest.unstable_mockModule("../cache/cacheService.js", () =>({
    cacheGet: jest.fn(),
    cacheSet: jest.fn(),
}));

const { cacheGet, cacheSet } = await import("../cache/cacheService.js");
const { cacheMiddleware } = await import("./cacheMiddleware.js");