"use strict"

const Router =require("koa-router");
const walletController = require("./controllers/wallet");
const transactionController = require("./controllers/transaction")

const router = new Router;

router.get("/health",(ctx)=> ctx.status = 200)
    .post("/wallet",walletController.addWallet)
    .get("/wallet/:id", walletController.getWalletById)
    .get("/wallets",walletController.getWallets)
    .post("/tx", transactionController.transaction)

module.exports = router;

