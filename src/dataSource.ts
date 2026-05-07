import "dotenv/config"
import { DataSource } from "typeorm"

import { join } from "path"

export default new DataSource({
    type: "postgres",
    host: process.env.DB_HOST as string,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER as string,
    password: process.env.DB_PASS as string,
    database: process.env.DB_NAME as string,
    entities: [join(__dirname, "model", "*.model.{js,ts}")],
    migrations: ["persistence/*.js"],
    ssl: true,
    extra: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})