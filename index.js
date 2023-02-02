"use strict"

require("dotenv").config();

const  Koa =require("koa");
const {koaBody} =require("koa-body");
const  KoaLogger =require("koa-logger");
const cors =require("koa2-cors");
const mongoose = require("mongoose")
const router =require("./routes");
const { appPort, mongoDbSRV } = require("./variables");

mongoose.connect(mongoDbSRV,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async() => {
    console.log("Database connected!");
  })
  .catch(err => console.log(err))

const app = new Koa();

app.use(cors({origin: "*"}));
app.use(koaBody());
app.use(KoaLogger());
app.use(router.routes());

const server = app.listen(appPort, ()=>{
    console.log(`Server is listening to http://localhost:${appPort}`);
})

module.exports = server;