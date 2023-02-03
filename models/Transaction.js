const WalletModel = require("./WalletSchema");

exports.creditDebit = async({walletId, updatedAmount})=>{
    try {
        const query = {id:walletId};
        await WalletModel.findOneAndUpdate(query,{balance:updatedAmount})
    } catch (error) {
        throw error;
    }
}

exports.updateTodayBalanceChange = async({walletId,updatedBalance})=>{
    try {
        const query = {id:walletId};
        await WalletModel.findOneAndUpdate(query,{todayBalanceChange:updatedBalance});
    } catch (error) {
        throw error;
    }
}