import Router from "@koa/router";

const router = new Router({
	prefix: "/alive"
});

router.get("/", (ctx) => {
	ctx.body = JSON.stringify({ message: "Hey from koa2 ✋" });
})


export default router