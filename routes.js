"use strict"

const Router =require("koa-router");
const walletController = require("./controllers/wallet")

const router = new Router;

router.get("/health",(ctx)=> ctx.status = 200)
    .post("/wallet",walletController.addWallet)

module.exports = router;

