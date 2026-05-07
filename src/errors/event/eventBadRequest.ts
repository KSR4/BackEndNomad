export class EventBadRequest extends Error {
    constructor(message: string) {
        super(message);
        this.name = "EventBadRequest";
    }
}
