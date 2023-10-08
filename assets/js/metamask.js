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
    connectAccount: function () {
        ethereum
            .request({ method: "eth_requestAccounts" })
            .then((accounts) => document.dispatchEvent(new CustomEvent('metamask-account-connected', {
                detail: accounts
            })))
            .catch(metamask.onError);
    },
    sendEthereumTransaction: function (fromAddress, recipientAddress, ethereumAmount) {
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
            .then((transactionHash) => document.dispatchEvent(new CustomEvent('metamask-transaction-sent', {
                detail: transactionHash
            })))
            .catch(metamask.onError);
    },
}