
const transactionHelper = require("../utils/transactions");
const { Worker } = require("worker_threads");
const path = require("path");


exports.transaction = async ctx => {
    try {
      const { from, to, amount, currency } = ctx.request.body;
      await transactionHelper.validateTransaction({
        sender: from,
        receiver: to,
        amount,
        currency
      });
      await transactionHelper.initiateTransaction({
        sender: from,
        receiver: to,
        amount
      });
      
      new Worker(path.resolve(__dirname, "../workers/tx.worker.js"), {
        workerData: {
          sender: from,
          receiver: to,
          amount
        }
      });
      ctx.response.ok({message:"Transaction Successfull"})
    } catch (error) {
      ctx.response.badRequest(error);
    }
  };
  