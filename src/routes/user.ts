import Router from "@koa/router";
import * as userController from "../controllers/user";

const router = new Router({
	prefix: "/user"
});

router.get("/", userController.getAllUsers)
router.post("/", userController.insertUser)


export default router