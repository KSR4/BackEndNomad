
import { v4 as uuidv4 } from "uuid";
import { locationLogHelper } from "../helpers/locationLogHelper";
import { LocationLog } from "../entities/locationLog";
import { LocationLogNotFound } from "../errors/locationLog/locationLogNotFound";
import { LocationLogBadRequest } from "../errors/locationLog/locationLogBadRequest";

export class LocationLogService {

    constructor ( private readonly helper: locationLogHelper ) {}

    async findLocationLogById (id: string): Promise<LocationLog> {

        const locationLog = await this.helper.findLocationLogById(id)

        if (!locationLog) {
            throw new LocationLogNotFound(`The Location log with id ${id} can't be reach`)
        }
        return locationLog
    }

    async findAll(): Promise<LocationLog[]> {

        const locationLogs = await this.helper.findAll()

        if (locationLogs == null) {
            throw new LocationLogNotFound(`There's no locationLogs`)
        }

        return locationLogs
    }

    async create(userId: string, latitude: number, longitude: number ) {
            if (!userId || !latitude || !longitude) {
                throw new LocationLogBadRequest("All parameters are required");
            }
    
            const locationLog = LocationLog.create(uuidv4(), userId, latitude, longitude); 
            await this.helper.create(locationLog);
    }

    
}