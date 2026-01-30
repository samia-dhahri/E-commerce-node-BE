import {redis} from "./redis.js";

export async function cacheGet(key){
    const raw = await redis.get(key);
    if(!raw) return null;
    try{
        return JSON.parse(raw);
    }catch (e){
        console.log("an error has occured: ", e);
        return null;
    }
}

export async function cacheSet(key, value, ttlSec){
    const payload = JSON.stringify(value);
    await redis.set(key, payload, { EX: ttlSec });
}

export async function cacheDel(...keys){
    const flat = keys.flat().filter(Boolean);
    if(flat.length === 0) return;
    await redis.del(flat);
}