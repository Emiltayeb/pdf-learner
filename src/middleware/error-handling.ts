import { Middleware } from "koa";

export const errorHandler: Middleware = async function (ctx, next) {
	try {
		await next();
	} catch (err: any) {
		console.log("errorHandler middleware request:", {
			origin: ctx.headers.origin,
			method: ctx.method,
			route: ctx.originalUrl,
			contentType: ctx.request.type || undefined,
		});
		err.status = err.statusCode || err.status || 500;
		throw err;
	}
}