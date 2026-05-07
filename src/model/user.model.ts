import { EntitySchema } from "typeorm"
import { User } from "../entities/user"

export const UserModel = new EntitySchema<User>({
    name: "User",
    tableName: "user",
    target: User,
    columns: {
        id: {
            type: String,
            primary: true
        },
        username: {
            type: String
        },
        email: {
            type: String
        },
        password: {
            type: String
        },
        role: {
            type: String
        },
        avatar: {
            type: String,
            nullable: true
        },
        resetPasswordToken: {
            type: String,
            nullable: true
        },
        resetPasswordExpires: {
            type: "timestamp",
            nullable: true
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        verificationToken: {
            type: String,
            nullable: true
        },
        verificationTokenExpires: {
            type: "timestamp",
            nullable: true
        }

    }
})