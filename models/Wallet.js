const { v4: uuid } = require("uuid");
const WalletModel = require("./WalletSchema");

exports.addWalletToDb = async ({ name, currency, initialBalance }) => {
  const walletId = uuid();
  const newWallet = new WalletModel({
    id: walletId,
    name,
    currency,
    balance: initialBalance,
    todayBalanceChange: 0 //initial balance change
  });
  try {
    const createData = await newWallet.save();
    return createData;
  } catch (error) {
    throw error;
  }
};

exports.getWalletByWalletId = async walletId => {
  try {
    const wallet = await WalletModel.findOne({ id: walletId });
    if (!wallet) {
      throw { status: 404, message: `Wallet of ${walletId} not found` };
    } else {
      return wallet;
    }
  } catch (error) {
    throw error;
  }
};

exports.getWalletsFromDB = async () => {
  try {
    const wallets = await WalletModel.find({});
    return wallets;
  } catch (error) {
    throw { status: 404, message: "Wallets no found" };
  }
};

exports.batchWalletsUpdate = async () => {
  try {
    const wallets = await this.getWalletsFromDB();
    wallets.map(async wallet => {
      await WalletModel.findByIdAndUpdate(wallet._id, {
        $set: { todayBalanceChange: 0 }
      });
    });
    console.log("todayBalanceChange reset done for all wallets");
  } catch (error) {
    console.log(error);
  }
};
