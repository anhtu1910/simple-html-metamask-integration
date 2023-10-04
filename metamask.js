const metamask = {
    onError: function (error) {
        let message = error?.message ?? error;
        alert(message);
    },
    isExtensionInstalled: function () {
        if (typeof window.ethereum == "undefined") {
            window.open("https://metamask.io/download/", "_blank");
            return false;
        }

        return true;
    },
    connectAccount: function (callback) {
        ethereum
            .request({ method: "eth_requestAccounts" })
            .then(callback)
            .catch(metamask.onError);
    },
    sendEthereumTransaction: function (fromAddress, recipientAddress, ethereumAmount, callback) {
        ethereum
            .request({
                method: 'eth_sendTransaction',
                // The following sends an EIP-1559 transaction. Legacy transactions are also supported.
                params: [
                    {
                        from: fromAddress, // The user's active address.
                        to: recipientAddress,
                        value: utility.toWei(ethereumAmount),
                        gasLimit: '0x5028', // Customizable by the user during MetaMask confirmation.
                        maxPriorityFeePerGas: '0x3b9aca00', // Customizable by the user during MetaMask confirmation.
                        maxFeePerGas: '0x2540be400', // Customizable by the user during MetaMask confirmation.
                    },
                ],
            })
            .then(callback)
            .catch(metamask.onError);
    },

}

metamask.utility = {
    toWei: function (ethereumAmount) {
        return Number(ethereumAmount * 1e18).toString(16);
    }
}