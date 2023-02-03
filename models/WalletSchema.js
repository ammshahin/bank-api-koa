const mongoose = require("mongoose");

const WalletSchema = new mongoose.Schema({
    id:String,
    name: String,
    currency: String,
    balance: Number,
    todayBalanceChange: Number
})

WalletSchema.set("timestamps", true);

module.exports = mongoose.model("wallet",WalletSchema,"wallets");