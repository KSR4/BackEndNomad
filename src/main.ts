import "dotenv/config"
import { Server } from "./server"

const PORT = Number(process.env.PORT) || 3000;

(async () => {
    await new Server().init(PORT)
})()