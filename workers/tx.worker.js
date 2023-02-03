const { workerData } = require("worker_threads");
const transactionHelper = require("../utils/transactions");
const TransactionModel = require("../models/Transaction");
const mongoose = require("mongoose");
const { mongoDbSRV } = require("../variables");

mongoose.set("strictQuery", false);
mongoose
  .connect(mongoDbSRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Worker Database connected!"))
  .catch(err => console.log(err));

(async () => {
  console.log("Starting to update wallets today balance change");
  const { sender, receiver, amount } = workerData;
  await transactionHelper.updateTodayBalanceChange({
    sender: sender,
    receiver: receiver,
    amount: amount
  });
  console.log("Update wallets today balance change ended");
})();
