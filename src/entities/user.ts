import { Entity } from "./entity"

export enum Role {
    ADMIN = "ADMIN",
    USER = "USER",
    OWNER = "OWNER"
}

export class User implements Entity {
    constructor(
        readonly id: string,
        readonly username: string,
        readonly email: string,
        readonly password: string,
        readonly role: Role,
        readonly avatar: string | null,
        readonly isVerified: boolean,
        readonly verificationToken: string | null,
        readonly verificationTokenExpires: Date | null,
        readonly resetPasswordToken: string | null = null,
        readonly resetPasswordExpires: Date | null = null
    ) { }

    getPrimitive() {
        return {
            id: this.id,
            username: this.username,
            email: this.email,
            password: this.password,
            role: this.role,
            avatar: this.avatar,
            isVerified: this.isVerified,
            verificationToken: this.verificationToken,
            verificationTokenExpires: this.verificationTokenExpires,
            resetPasswordToken: this.resetPasswordToken,
            resetPasswordExpires: this.resetPasswordExpires
        }
    }

    static create(id: string, username: string, email: string, password: string): User {
        return new User(id, username, email, password, Role.USER, null, false, null, null, null, null)
    }

    updateRole(role: Role): User {
        return new User(
            this.id,
            this.username,
            this.email,
            this.password,
            role,
            this.avatar,
            this.isVerified,
            this.verificationToken,
            this.verificationTokenExpires,
            this.resetPasswordToken,
            this.resetPasswordExpires
        )
    }

    updateUsername(username: string): User {
        return new User(
            this.id,
            username,
            this.email,
            this.password,
            this.role,
            this.avatar,
            this.isVerified,
            this.verificationToken,
            this.verificationTokenExpires,
            this.resetPasswordToken,
            this.resetPasswordExpires
        )
    }

    updateEmail(email: string): User {
        return new User(
            this.id,
            this.username,
            email,
            this.password,
            this.role,
            this.avatar,
            this.isVerified,
            this.verificationToken,
            this.verificationTokenExpires,
            this.resetPasswordToken,
            this.resetPasswordExpires
        )
    }

    updatePassword(password: string): User {
        return new User(
            this.id,
            this.username,
            this.email,
            password,
            this.role,
            this.avatar,
            this.isVerified,
            this.verificationToken,
            this.verificationTokenExpires,
            this.resetPasswordToken,
            this.resetPasswordExpires
        )
    }

    updateAvatar(avatar: string): User {
        return new User(
            this.id,
            this.username,
            this.email,
            this.password,
            this.role,
            avatar,
            this.isVerified,
            this.verificationToken,
            this.verificationTokenExpires,
            this.resetPasswordToken,
            this.resetPasswordExpires
        )
    }

    setResetToken(token: string | null, expires: Date | null): User {
        return new User(
            this.id,
            this.username,
            this.email,
            this.password,
            this.role,
            this.avatar,
            this.isVerified,
            this.verificationToken,
            this.verificationTokenExpires,
            token,
            expires
        )
    }

    setVerificationToken(token: string | null, expires: Date | null): User {
        return new User(
            this.id,
            this.username,
            this.email,
            this.password,
            this.role,
            this.avatar,
            this.isVerified,
            token,
            expires,
            this.resetPasswordToken,
            this.resetPasswordExpires
        )
    }

    verifyUser(): User {
        return new User(
            this.id,
            this.username,
            this.email,
            this.password,
            this.role,
            this.avatar,
            true,
            null,
            null,
            this.resetPasswordToken,
            this.resetPasswordExpires
        )
    }
}