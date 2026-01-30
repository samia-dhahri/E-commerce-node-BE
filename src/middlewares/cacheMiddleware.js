import { cacheGet, cacheSet } from "../cache/cacheService.js";

export function cacheMiddleware({ keyFn, ttlSec = 30, jitterSec = 5}){
    return async function (req, res, next){
        if(req.headers["x-cache-bypass"] === "1") {
            res.setHeader("X-Cache", "BYPASS");
            return next();
        }

        const key = keyFn(req);
        if(!key) return next();

        try{
            const cached = await cacheGet(key);
            if(cached != null){
                res.setHeader("X-Cache", "HIT");
                return res.status(200).json(cached);
            }
        }catch (e) {
            console.log("cache read error: ", e);
        }

        const originalJson = res.json.bind(res);
        res.json = (body) => {
            const status = res.statusCode;
            if( status >= 200 && status < 300){
                const jitter = Math.floor(Math.random() * (jitterSec + 1));
                const ttl = Math.max(1, ttlSec + jitter);
                cacheSet(key, body, ttl).catch((e) => console.error("cache write error:", e));
                res.setHeader("X-Cache", "MISS");
            }
            return originalJson(body);
        };
        return next();
    };
}