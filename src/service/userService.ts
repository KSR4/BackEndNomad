import { Role, User } from "../entities/user";
import { UserNotFound } from "../errors/user/userNotFound";
import { userHelper } from "../helpers/userHelper";
import { v4 as uuidv4 } from "uuid";
import { InvalidCredentials } from "../errors/user/invalidCredentials";
import { UserBadRequest } from "../errors/user/userBadRequest";
import { createHmac } from "crypto";
import { InvalidName } from "../errors/user/invalidName";
import { UserNotVerified } from "../errors/user/userNotVerified";

import { EmailService } from "./emailService";
import { logService } from "./logService";
import { LogLevel } from "../entities/log";

import { UserAlreadyExists } from "../errors/user/userAlreadyExists";

export class userService {

    constructor(
        private readonly helper: userHelper,
        private readonly emailService: EmailService = new EmailService(),
        private readonly logger: logService = new logService()
    ) { }

    async findUserById(id: string): Promise<User> {

        const user = await this.helper.findUserById(id)

        if (!user) {
            throw new UserNotFound(`The user with id ${id} can't be reach`)
        }
        return user
    }

    async findAll(): Promise<User[]> {
        return await this.helper.findAll()
    }

    async delete(id: string) {
        if (!id) {
            throw new UserBadRequest("Id is required");
        }
        await this.helper.delete(id);
        await this.logger.info(`User with id ${id} deleted`);
    }

    async register(username: string, email: string, password: string) {
        if (!email || !password || !username) {
            throw new UserBadRequest("Name, email and password are required");
        }

        const existingUser = await this.helper.findUserByEmail(email);
        if (existingUser) {
            throw new UserAlreadyExists(`The email ${email} is already registered`);
        }

        if (username.length < 3) throw new InvalidName(`The name ${username} length is shorter than 3`)

        const hashGenerator = createHmac('sha-512', 'salt')
        const hash = hashGenerator.update(password).digest('hex')

        const verificationToken = uuidv4();
        const expires = new Date();
        expires.setHours(expires.getHours() + 24); // Token válido por 24 horas

        const user = new User(
            uuidv4(),
            username,
            email,
            hash,
            Role.USER,
            null,
            false,
            verificationToken,
            expires
        );

        await this.helper.register(user);
        await this.logger.info(`New user registered: ${username} (${email})`, { userId: user.id });
        await this.emailService.sendVerificationEmail(email, verificationToken);
    }

    async login(email: string, password: string): Promise<User> {
        if (!email || !password) {
            throw new UserBadRequest("Email and password are required");
        }

        const hashGenerator = createHmac('sha-512', 'salt')
        const hash = hashGenerator.update(password).digest('hex')

        const user = await this.helper.login(email, hash)

        if (!user) {
            await this.logger.warn(`Failed login attempt for email: ${email}`);
            throw new InvalidCredentials("Email or Password not correct")
        }

        await this.logger.info(`User logged in: ${user.username}`, { userId: user.id });

        return user
    }

    async updateUsername(id: string, username: string) {
        if (!username || !id) {
            throw new UserBadRequest("Id and username are required");
        }

        const user = await this.helper.findUserById(id);

        if (!user) {
            throw new UserNotFound(`The user with id: ${id} can't be reach`);
        }

        const userUpdated = user.updateUsername(username)

        await this.helper.register(userUpdated)
    }

    async updatePassword(id: string, password: string) {
        if (!password || !id) {
            throw new UserBadRequest("Id and password are required");
        }

        const user = await this.helper.findUserById(id);

        if (!user) {
            throw new UserNotFound(`The user with id: ${id} can't be reach`);
        }

        const hashGenerator = createHmac('sha-512', 'salt')
        const hash = hashGenerator.update(password).digest('hex')

        const userUpdated = user.updatePassword(hash)

        await this.helper.register(userUpdated)
        await this.emailService.sendPasswordResetConfirmationEmail(userUpdated.email);
    }

    async changePassword(id: string, currentPassword: string, newPassword: string) {
        if (!id || !currentPassword || !newPassword) {
            throw new UserBadRequest("Id and passwords are required");
        }

        const user = await this.helper.findUserById(id);

        if (!user) {
            throw new UserNotFound(`The user with id: ${id} can't be reach`);
        }

        const currentHashGenerator = createHmac('sha-512', 'salt')
        const currentHash = currentHashGenerator.update(currentPassword).digest('hex')

        if (currentHash !== user.password) {
            throw new InvalidCredentials("Current password is not correct")
        }

        const hashGenerator = createHmac('sha-512', 'salt')
        const hash = hashGenerator.update(newPassword).digest('hex')

        const userUpdated = user.updatePassword(hash)

        await this.helper.register(userUpdated)
        await this.emailService.sendPasswordResetConfirmationEmail(userUpdated.email);
    }

    async updateEmail(id: string, email: string) {
        if (!email || !id) {
            throw new UserBadRequest("Id and email are required");
        }

        const user = await this.helper.findUserById(id);

        if (!user) {
            throw new UserNotFound(`The user with id: ${id} can't be reach`);
        }

        const userUpdated = user.updateEmail(email)

        await this.helper.register(userUpdated)
    }

    async updateRole(id: string, role: string) {
        if (!role || !id) {
            throw new UserBadRequest("Id and role are required");
        }

        let newRole = Role.USER || Role.OWNER

        if (role === "USER") {
            newRole = Role.USER
        } else if (role === "OWNER") {
            newRole = Role.OWNER
        } else {
            throw new UserBadRequest("Role must be USER or OWNER")
        }

        const user = await this.helper.findUserById(id);

        if (!user) {
            throw new UserNotFound(`The user with id: ${id} can't be reach`);
        }

        const userUpdated = user.updateRole(newRole)

        await this.helper.register(userUpdated)
    }

    async updateAvatar(id: string, avatar: string) {
        if (!avatar || !id) {
            throw new UserBadRequest("Id and avatar are required");
        }

        const user = await this.helper.findUserById(id);

        if (!user) {
            throw new UserNotFound(`The user with id: ${id} can't be reach`);
        }

        const userUpdated = user.updateAvatar(avatar)

        await this.helper.register(userUpdated)
    }

    async forgotPassword(email: string): Promise<void> {
        if (!email) {
            throw new UserBadRequest("Email is required");
        }

        const user = await this.helper.findUserByEmail(email);

        if (!user) {
            return;
        }

        const token = uuidv4();
        const expires = new Date();
        expires.setMinutes(expires.getHours() + 15); // Token 15mins

        const userWithToken = user.setResetToken(token, expires);
        await this.helper.register(userWithToken);

        await this.emailService.sendPasswordResetEmail(email, token);
    }

    async resetPassword(token: string, newPassword: string): Promise<void> {
        if (!token || !newPassword) {
            throw new UserBadRequest("Token and new password are required");
        }

        const user = await this.helper.findUserByToken(token);

        if (!user || !user.resetPasswordToken) {
            throw new UserBadRequest("Invalid token");
        }

        if (user.resetPasswordExpires && user.resetPasswordExpires < new Date()) {
            throw new UserBadRequest("Token has expired");
        }

        const hashGenerator = createHmac('sha-512', 'salt')
        const hash = hashGenerator.update(newPassword).digest('hex')

        const updatedUser = user.updatePassword(hash).setResetToken(null, null);

        await this.helper.register(updatedUser);
        await this.emailService.sendPasswordResetConfirmationEmail(updatedUser.email);
    }

    async verifyEmail(token: string): Promise<void> {
        if (!token) {
            throw new UserBadRequest("Token is required");
        }

        const user = await this.helper.findUserByVerificationToken(token);

        if (!user || !user.verificationToken) {
            throw new UserBadRequest("Invalid verification token");
        }

        if (user.verificationTokenExpires && user.verificationTokenExpires < new Date()) {
            throw new UserBadRequest("Verification token has expired");
        }

        const verifiedUser = user.verifyUser();
        await this.helper.register(verifiedUser);
    }

    async resendVerificationEmail(id: string): Promise<void> {
        if (!id) {
            throw new UserBadRequest("Id is required");
        }

        const user = await this.helper.findUserById(id);

        if (!user) {
            throw new UserNotFound(`The user with id: ${id} can't be reach`);
        }

        if (user.isVerified) {
            throw new UserBadRequest("User is already verified");
        }

        const expires = new Date();
        expires.setHours(expires.getHours() + 24); // Token válido por 24 horas desde el reenvío

        const verificationToken = user.verificationToken || uuidv4();
        const updatedUser = user.setVerificationToken(verificationToken, expires);

        await this.helper.register(updatedUser);
        await this.emailService.sendVerificationEmail(updatedUser.email, verificationToken);
    }
}