const utility = {
    toWei: function (ethereumAmount) {
        return Number(ethereumAmount * 1e18).toString(16);
    }
}