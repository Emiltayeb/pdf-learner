import { Middleware } from "koa";
import { DB_CONNECTION } from "../services/db";

export const getAllUsers: Middleware = async function (ctx, next) {
	const user = (await DB_CONNECTION.raw("SELECT * FROM users"))[0]
	ctx.body = user
	ctx.status = 200
}

export const insertUser: Middleware = async function (ctx, next) {
	const userName: string = (ctx.request.body as any)["name"]
	if (!userName) {
		throw Error("Invalid user name")
	}
	const user = (await DB_CONNECTION.raw("INSERT INTO users (name) VALUES (?)", userName))[0]
	ctx.body = JSON.stringify({ message: "created", userName })
	// ctx.body = user
	// ctx.status = 200
}
