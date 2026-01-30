import * as dotenv from "dotenv";
import {closeRedis, initRedis} from "./cache/redis.js";
import  { buildApp } from "./app.js"

dotenv.config();

const  app = buildApp();
const port = 3000;

// Initialize Redis connection (cache layer)
await initRedis();

process.on("SIGINT", async () => {
    await closeRedis();
    process.exit(0);
});

process.on("SIGTERM", async () => {
    await closeRedis();
    process.exit(0);
});

app.listen(port, () => { console.log(`Server is running in port ${port}`)});
