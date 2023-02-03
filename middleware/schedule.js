const cron = require("node-cron");
const WalletModel = require("../models/Wallet")

exports.scheduleUpdate = async (ctx, next) => {
  cron.schedule("0 0 * * *", () => {
     WalletModel.batchWalletsUpdate();
  });
  await next();
};
