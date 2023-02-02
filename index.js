"use strict"

require("dotenv").config();

const  Koa =require("koa");
const {koaBody} =require("koa-body");
const  KoaLogger =require("koa-logger");
const cors =require("koa2-cors");
const router =require("./routes");

const appPort = process.env.PORT;

const app = new Koa();

app.use(cors({origin: "*"}));
app.use(koaBody());
app.use(KoaLogger());
app.use(router.routes());

const server = app.listen(appPort, ()=>{
    console.log(`Server is listening to http://localhost${appPort}`);
})

module.exports = server;