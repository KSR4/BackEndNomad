import "dotenv/config"
import { DataSource } from "typeorm"

export default new DataSource({
    type: "postgres",
    host: process.env.DB_HOST as string,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER as string,
    password: process.env.DB_PASS as string,
    database: process.env.DB_NAME as string,
    entities: ["**/*.model.*"],
    migrations: ["persistence/*.js"],
    ssl: true,
    extra: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})