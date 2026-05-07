import jwt from "jsonwebtoken"
import { Role } from "../entities/user"


type TokenData = {
    role: Role
    sub: string
    isVerified: boolean
}

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class TokenManager {

    static async generate(data: TokenData): Promise<string> {
        return await jwt.sign(data, "private", {
            algorithm: "HS256",
            expiresIn: "30m"
        })
    }

    static async verify(token: string): Promise<TokenData> {
        return await jwt.verify(token, "private", {
            algorithms: ["HS256"]
        }) as TokenData
    }

}