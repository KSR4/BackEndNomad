import { Log, LogLevel } from "../entities/log";
import { logHelper } from "../helpers/logHelper";

export class logService {
    constructor(
        private readonly helper: logHelper = new logHelper()
    ) { }

    async log(level: LogLevel, message: string, context: any = null) {
        const log = Log.create(level, message, context);
        await this.helper.save(log);
    }

    async info(message: string, context: any = null) {
        await this.log(LogLevel.INFO, message, context);
    }

    async warn(message: string, context: any = null) {
        await this.log(LogLevel.WARN, message, context);
    }

    async error(message: string, context: any = null) {
        await this.log(LogLevel.ERROR, message, context);
    }

    async debug(message: string, context: any = null) {
        await this.log(LogLevel.DEBUG, message, context);
    }

    async getAllLogs(): Promise<Log[]> {
        return await this.helper.findAll();
    }

    async getLogsByLevel(level: string): Promise<Log[]> {
        return await this.helper.findByLevel(level);
    }
}
