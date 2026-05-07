import { Router } from "express";
import { UserAdminMiddleware } from "../../middlewares/userAdminMiddleware";
import { PatchRoleController } from "../../controllers/user/patchRoleController";

export function patchUserRoleRoute(router: Router) {
    router.patch("/v1/user/:id/role", new UserAdminMiddleware().run, new PatchRoleController().run)
}
