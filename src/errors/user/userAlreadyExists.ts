export class UserAlreadyExists extends Error {
    constructor(message: string) {
        super(message);
        this.name = "UserAlreadyExists";
    }
}
