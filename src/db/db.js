import {Pool} from "pg";
import env from "dotenv";

env.config();
const db = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: Number(process.env.PG_PORT),
});
db.connect();

db.on('error', (err) => {
    console.error('Unexpected error on idle DB', err);
    process.exit();
});
export const query = (text, params) => db.query(text, params);
