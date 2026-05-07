import { v4 as uuidv4 } from "uuid";
import { ticketHelper } from "../helpers/ticket.helper";
import { Ticket } from "../entities/ticket";
import { TicketNotFound } from "../errors/ticket/ticketNotFound";
import { TicketBadRequest } from "../errors/ticket/ticketBadRequest";

import { userService } from "./userService";
import { userHelper } from "../helpers/userHelper";
import { notificationService } from "./notificationService";
import { notificationHelper } from "../helpers/notification.helper";

export class ticketService {

    constructor ( private readonly helper: ticketHelper ) {}

    async findUserNameByTicketId (id: string): Promise<string> {
        
        const ticket = await this.helper.findTicketById(id)

        if (!ticket) {
            throw new TicketNotFound(`The ticket with id ${id} can't be reach`)
        }

        const userSrv = new userService(new userHelper())
        const user = await userSrv.findUserById(ticket.userId)

        return user.username
    }

    async create(userId: string, shopName: string, message: string, latitude: number, longitude: number) {
        if (!message || !userId) {
            throw new TicketBadRequest("Message and userId are required");
        }

        const ticket = Ticket.create(uuidv4(), userId, shopName, message, latitude, longitude); 
        await this.helper.save(ticket);
    }

    async findAll(): Promise<Ticket[]> {
    
        const ticket = await this.helper.findAll()
    
        if (ticket == null) {
            throw new TicketNotFound(`There's no tickets`)
        }
    
        return ticket
    }

    async findAllWithUserInfo(): Promise<any[]> {
        const tickets = await this.findAll()
        const userSrv = new userService(new userHelper())
        const enrichedTickets = await Promise.all(tickets.map(async (ticket) => {
            const user = await userSrv.findUserById(ticket.userId)
            return {
                ...ticket.getPrimitive(),
                username: user.username,
                avatar: user.avatar
            }
        }))
        return enrichedTickets
    }

    async updateAccepted(id: string, accepted: boolean) {
        if (accepted === undefined || accepted === null || typeof accepted !== "boolean") {
            throw new TicketBadRequest("Accepted must be a boolean");
        }

        const ticket = await this.helper.findTicketById(id);

        if (!ticket) {
            throw new TicketNotFound(`The ticket with id: ${id} can't be reach`);
        }

        const ticketUpdated = ticket.updateAccepted(accepted);
        await this.helper.save(ticketUpdated);

        // Notificación automática al usuario
        const notifService = new notificationService(new notificationHelper());

        if (accepted) {
            await notifService.create(
                "¡Solicitud de tienda aceptada!",
                `Tu solicitud para crear la tienda "${ticket.shopName}" ha sido aceptada. ¡Ahora eres propietario!`,
                ticket.userId
            );
        } else {
            await notifService.create(
                "Solicitud de tienda rechazada",
                `Tu solicitud para crear la tienda "${ticket.shopName}" ha sido rechazada por un administrador.`,
                ticket.userId
            );
        }
    }
}