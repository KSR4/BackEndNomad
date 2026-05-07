import { Router } from "express"
import { getHealthRoute } from "./health"
import { getMeRoute } from "./getMe"
import { registerRoute } from "./user/postRegister"
import { postUserLoginRoute } from "./user/postLogin"
import { postDishRoute } from "./dish/postDish"
import { putDishRoute } from "./dish/putDish"
import { deleteDishRoute } from "./dish/deleteDish"
import { getShopMenuRoute } from "./shop/getShopMenu"
import { getShopsRoute } from "./shop/getShops"
import { getShopRoute } from "./shop/getShop"
import { getSelfShopsRoute } from "./shop/getSelfShops"
import { putShopRoute } from "./shop/putShop"
import { postShopRoute } from "./shop/postShop"
import { patchShopNameRoute } from "./shop/patchShopName"
import { patchShopStateRoute } from "./shop/patchShopState"
import { patchShopLocationRoute } from "./shop/patchShopLocation"
import { patchShopScheduleRoute } from "./shop/patchShopSchedule"
import { postOrderRoute } from "./order/postOrder"
import { getEventRoute } from "./event/getEvent"
import { getEventsRoute } from "./event/getEvents"
import { postEventRoute } from "./event/postEvent"
import { putEventRoute } from "./event/putEvent"
import { deleteEventRoute } from "./event/deleteEvent"
import { postShopEventRoute } from "./shopEvent/postShopEvent"
import { deleteShopEventRoute } from "./shopEvent/deleteShopEvent"
import { putOrderRoute } from "./order/putOrder"
import { getSelfOrdersRoute } from "./order/getSelfOrders"
import { getShopOrdersRoute } from "./order/getShopOrders"
import { getTicketsRoute } from "./ticket/getTickets"
import { getTicketRoute } from "./ticket/getTicket"
import { postTicketRoute } from "./ticket/postTicket"
import { patchTicketAcceptedRoute } from "./ticket/patchTicketAccepted"
import { patchUserAvatarRoute } from "./user/patchUserAvatar"
import { patchUserEmailRoute } from "./user/patchUserEmail"
import { patchUserPasswordRoute } from "./user/patchUserPassword"
import { patchUserUsernameRoute } from "./user/patchUserUsername"
import { patchUserRoleRoute } from "./user/patchUserRole"
import { getSelfReviewsRoute } from "./review/getSelfReviews"
import { postReviewRoute } from "./review/postReview"
import { getShopReviewsRoute } from "./review/getShopReviews"
import { getUsersRoute } from "./user/getUsers"
import { postForgotPasswordRoute } from "./user/postForgotPassword"
import { postResetPasswordRoute } from "./user/postResetPassword"
import { postVerifyEmailRoute } from "./user/postVerifyEmail"
import { postResendVerificationEmailRoute } from "./user/postResendVerificationEmail"
import { postChangePasswordRoute } from "./user/postChangePassword"
import { deleteUserRoute } from "./user/deleteUser"
import { postNotificationRoute } from "./notification/postNotification"
import { getNotificationsRoute } from "./notification/getNotifications"
import { getAllNotificationsRoute } from "./notification/getAllNotifications"
import { patchNotificationReadRoute } from "./notification/patchNotificationRead"
import { postSupportTicketRoute } from "./supportTicket/postSupportTicket"
import { getSupportTicketsRoute } from "./supportTicket/getSupportTickets"
import { getSelfSupportTicketsRoute } from "./supportTicket/getSelfSupportTickets"
import { patchSupportTicketStatusRoute } from "./supportTicket/patchSupportTicketStatus"

export function registerRoutes(): Router {
    const router = Router()

    // USER
    postUserLoginRoute(router)
    registerRoute(router)
    patchUserAvatarRoute(router)
    patchUserEmailRoute(router)
    patchUserPasswordRoute(router)
    patchUserUsernameRoute(router)
    patchUserRoleRoute(router)
    getUsersRoute(router)
    postForgotPasswordRoute(router)
    postResetPasswordRoute(router)
    postVerifyEmailRoute(router)
    postResendVerificationEmailRoute(router)
    postChangePasswordRoute(router)
    deleteUserRoute(router)

    // EVENT
    getEventRoute(router)
    getEventsRoute(router)
    postEventRoute(router)
    putEventRoute(router)
    deleteEventRoute(router)
    postShopEventRoute(router)
    deleteShopEventRoute(router)

    // SHOP
    getShopMenuRoute(router)
    getSelfShopsRoute(router)
    getShopRoute(router)
    getShopsRoute(router)
    putShopRoute(router)
    postShopRoute(router)
    patchShopNameRoute(router)
    patchShopStateRoute(router)
    patchShopLocationRoute(router)
    patchShopScheduleRoute(router)

    // TICKET
    getTicketsRoute(router)
    getTicketRoute(router)
    postTicketRoute(router)
    patchTicketAcceptedRoute(router)

    // ORDER
    postOrderRoute(router)
    putOrderRoute(router)
    getSelfOrdersRoute(router)
    getShopOrdersRoute(router)

    // DISH
    postDishRoute(router)
    putDishRoute(router)
    deleteDishRoute(router)

    // REVIEW
    getSelfReviewsRoute(router)
    getShopReviewsRoute(router)
    postReviewRoute(router)

    // NOTIFICATION
    getAllNotificationsRoute(router)
    getNotificationsRoute(router)
    postNotificationRoute(router)
    patchNotificationReadRoute(router)

    // SUPPORT TICKET
    getSelfSupportTicketsRoute(router)
    getSupportTicketsRoute(router)
    postSupportTicketRoute(router)
    patchSupportTicketStatusRoute(router)

    // SYSTEM
    getHealthRoute(router)
    getMeRoute(router)

    return router
}