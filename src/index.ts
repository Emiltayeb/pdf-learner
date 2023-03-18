import Koa from "koa";
import cors from "koa-cors"
import { errorHandler } from "./middleware/error-handling";
import aliveRoutes from "./routes/alive"
import runPdfRouter from "./routes/run-read-pdf";
import bodyParser from "koa-bodyparser";

const app = new Koa();
app.use(cors())

app.use(errorHandler).use(bodyParser())
	.use(aliveRoutes.routes())
	.use(runPdfRouter.routes())

const init = function () {
	try {
		app.listen(3000);
		console.log("Server started")
	} catch (error: any) {
		console.error("SERVER INIT ERROR", error.message)
		process.exit(1)
	}
}

init()