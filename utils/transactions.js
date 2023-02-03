const WalletModel = require("../models/Wallet");
const TransactionModel = require("../models/Transaction");

exports.validateTransaction = async ({
  sender,
  receiver,
  amount,
  currency
}) => {
  // await validateTransaction({sender, receiver});
  const senderBalance = await balanceCheck({ walletId: sender });
  if (senderBalance < amount) {
    throw { status: 400, message: "Sender doesn't have sufficient balance" };
  }
  // await txFee = calculateFee({sender, receiver});
};
const balanceCheck = async ({ walletId }) => {
  const { balance } = await WalletModel.getWalletByWalletId(walletId);
  return balance;
};
// const txFee = ({{sender, receiver}})
exports.initiateTransaction = async ({ sender, receiver, amount }) => {
  const [senderUpdatedAmount, receiverUpdatedAmount] = await Promise.all([
    amountCalculate({ walletId: sender, amount, type: "credit" }),
    amountCalculate({ walletId: receiver, amount, type: "debit" })
  ]);
  await Promise.all([
    TransactionModel.creditDebit({
      walletId: sender,
      updatedAmount: senderUpdatedAmount
    }),
    TransactionModel.creditDebit({
      walletId: receiver,
      updatedAmount: receiverUpdatedAmount
    })
  ]);
  //   await Promise.all([
//   await updateTodayBalanceChange({ sender, receiver, amount});
  // updateTodayBalanceChange({receiver,amount,type:"debit"}),
  //   ])
};

const amountCalculate = async ({ walletId, amount, type }) => {
  const balance = await balanceCheck({ walletId });
  return type === "credit" ? balance - amount : balance + amount;
};

exports.updateTodayBalanceChange = async ({ sender, receiver, amount}) => {
  const [
    { todayBalanceChange: senderTodayBalanceChange },
    { todayBalanceChange: receiverTodayBalanceChange }
  ] = await Promise.all([
    WalletModel.getWalletByWalletId(sender),
    WalletModel.getWalletByWalletId(receiver)
  ]);
//   console.log(senderTodayBalanceChange);
  await Promise.all([
      TransactionModel.updateTodayBalanceChange({walletId:sender,updatedBalance:(senderTodayBalanceChange - amount)}),
      TransactionModel.updateTodayBalanceChange({walletId:receiver,updatedBalance:(receiverTodayBalanceChange + amount)}),
  ])
};
