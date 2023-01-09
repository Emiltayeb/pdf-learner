import Koa from "koa";
import cors from "koa-cors"
import gracefulShutdown from "http-graceful-shutdown"
import { checkDbConnection } from "./middleware/db";
import { errorHandler } from "./middleware/error-handling";
import { DB_CONNECTION } from "./services/db";
import userRoutes from "./routes/user"
import aliveRoutes from "./routes/alive"
import bodyParser from "koa-bodyparser";

const app = new Koa();



app.use(cors())

app.use(errorHandler).use(bodyParser())
	.use(aliveRoutes.routes())
// .use(userRoutes.routes())


const init = async function () {
	try {
		// await checkDbConnection()
		// gracefulShutdown(app, {
		// 	signals: "SIGINT SIGTERM", timeout: 60000, development: false,
		// 	finally: () => console.log("The server is stopped! (SIGINT SIGTERM)")
		// });
		app.listen(3000);
	} catch (error: any) {
		console.error("SERVER INIT ERROR", error.message)
		process.exit(1)
	}
}

init()