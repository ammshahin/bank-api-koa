const WalletModel = require("../models/Wallet");

exports.addWallet = async ctx => {
  try {
    const { name, currency, initialBalance } = ctx.request.body;
    if(!name){
      throw {status: 400, message: "User name is invalid"}
    }
    const walletData = await WalletModel.addWalletToDb({
      name,
      currency,
      initialBalance
    });
    const responseData = {
      id: walletData.id,
      name: walletData.name,
      currency: walletData.currency,
      balance: walletData.balance
    };
    ctx.response.ok({
      message: `${name}'s wallet created successfully`,
      data: responseData
    });
  } catch (error) {
    ctx.response.badRequest(error);
  }
};

exports.getWalletById = async ctx => {
  try {
    const { id: walletId } = ctx.request.params;
    const wallet = await WalletModel.getWalletByWalletId(walletId);
    const responseData = {
      id: wallet.id,
      name: wallet.name,
      currency: wallet.currency,
      balance: wallet.balance,
      todayBalanceChange: wallet.todayBalanceChange,
      createdAt: wallet.createdAt
    };
    ctx.response.ok(responseData);
  } catch (error) {
    ctx.response.badRequest(error);
  }
};

exports.getWallets = async ctx => {
  try {
    const wallets = await WalletModel.getWalletsFromDB();
    const responseData = sortWallets(wallets);
    ctx.response.ok({
      data: responseData,
      message: "Wallets retrived succesfully"
    });
  } catch (error) {
    ctx.response.badRequest(error);
  }
};

const sortWallets = wallets => {
  return wallets.sort((a, b) => {
    return a.createdAt - b.createdAt;
  });
};


