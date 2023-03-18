import Router from "@koa/router";
import * as pdfCtrl from "../controllers/pdf"
const router = new Router({
	prefix: "/run"
});

router.get("/", async (ctx) => {
	await pdfCtrl.parsePdf()
	ctx.body = JSON.stringify({ message: "finished" })
})


export default router