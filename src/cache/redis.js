import {createClient} from "redis";

const REDIS_URL = process.env.REDIS_URL;

export const redis = createClient({ url: REDIS_URL});
let initialized = false;

export async function initRedis(){
    if(initialized) return redis;

    redis.on("error", (error) => {
        console.log("Redis client error: ", error);
    });

    await redis.connect();
    initialized = true;
    console.log("Redis Connected");
    return redis;
}

export async function closeRedis(){
    if(!initialized) return;
    try{
        await redis.quit();
    } catch (e){
        console.log("Error quit Redis: ", e);
    }
}
