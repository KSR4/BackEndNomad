import { Helper } from "./helper";
import { UserModel } from "../model/user.model";
import { EntitySchema } from "typeorm";
import { User } from "../entities/user";


export class userHelper extends Helper<User> {

    getEntitySchema(): EntitySchema<User> {
        return UserModel
    }

    async findUserById(id: string): Promise<User | null> {
        return (await this.getRepository()).findOneBy({ id })
    }

    async delete(id: string) {
        return (await this.getRepository()).delete(id)
    }

    async register(user: User) {
        return (await this.getRepository()).save(user)
    }

    async login(email: string, password: string): Promise<User | null> {
        return (await this.getRepository()).findOneBy({ email, password })
    }

    async findUserByEmail(email: string): Promise<User | null> {
        return (await this.getRepository()).findOneBy({ email })
    }

    async findUserByToken(token: string): Promise<User | null> {
        return (await this.getRepository()).findOneBy({ resetPasswordToken: token })
    }

    async findUserByVerificationToken(token: string): Promise<User | null> {
        return (await this.getRepository()).findOneBy({ verificationToken: token })
    }

    async findAll(): Promise<User[]> {
        return (await this.getRepository()).find()
    }
}