import cors from "cors"
import express, { Express } from "express"
import { registerRoutes } from "./routes"
import { json } from "body-parser"
import { rateLimit } from "express-rate-limit"


export class Server {
    private app: Express = express()

    init(port: number) {
        this.registerMiddlewares()
        this.registerRoutes()

        this.app.listen(port, () => {
            console.log(`Listening port ${port}`)
        })
    }

    private registerRoutes() {
        this.app.use(registerRoutes())
    }

    private registerMiddlewares() {
        this.app.use(cors())
        this.app.use(json())

        // Global 100 por requests por min
        this.app.use(rateLimit({
            windowMs: 60 * 1000,
            max: 100,
            message: "Too many requests from this IP, please try again after a minute",
            standardHeaders: true,
            legacyHeaders: false,
        }))

        // Login 5 requests por 15 minutes
        this.app.use("/v1/login", rateLimit({
            windowMs: 15 * 60 * 1000,
            max: 5,
            message: "Too many login attempts, please try again after 15 minutes",
            standardHeaders: true,
            legacyHeaders: false,
        }))

        // Reenviar email de verificación 1 request por 5 minutes
        this.app.use("/v1/user/resend-verification", rateLimit({
            windowMs: 5 * 60 * 1000,
            max: 1,
            message: "Too many requests, please try again after 5 minutes",
            standardHeaders: true,
            legacyHeaders: false,
        }))
    }
}