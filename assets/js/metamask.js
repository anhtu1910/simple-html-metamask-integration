class Metamask {
    onError(error) {
        let message = error?.message ?? error;
        alert(message);
    }

    isExtensionInstalled() {
        if (typeof window.ethereum == "undefined") {
            window.open("https://metamask.io/download/", "_blank");
            return false;
        }

        return true;
    }

    connectAccount() {
        ethereum
            .request({ method: "eth_requestAccounts" })
            .then((accounts) => document.dispatchEvent(new CustomEvent('metamask-account-connected', {
                detail: accounts
            })))
            .catch(this.onError);
    }

    sendEthereumTransaction(fromAddress, recipientAddress, ethereumAmount) {
        ethereum
            .request({
                method: 'eth_sendTransaction',
                // The following sends an EIP-1559 transaction. Legacy transactions are also supported.
                params: [
                    {
                        from: fromAddress, // The user's active address.
                        to: recipientAddress,
                        value: helper.toWei(ethereumAmount),
                        gasLimit: '0x5028', // Customizable by the user during MetaMask confirmation.
                        maxPriorityFeePerGas: '0x3b9aca00', // Customizable by the user during MetaMask confirmation.
                        maxFeePerGas: '0x2540be400', // Customizable by the user during MetaMask confirmation.
                    },
                ],
            })
            .then((transactionHash) => document.dispatchEvent(new CustomEvent('metamask-transaction-sent', {
                detail: transactionHash
            })))
            .catch(this.onError);
    }

    sendErcTransaction(contract, fromAddress, recipientAddress, ethereumAmount) {
        ethereum
            .request({
                method: 'eth_sendTransaction',
                // The following sends an EIP-1559 transaction. Legacy transactions are also supported.
                params: [
                    {
                        from: fromAddress, // The user's active address.
                        to: recipientAddress,
                        data: contract.methods.transfer(recipientAddress, ethereumAmount).encodeABI(),
                        gasLimit: '0x5028', // Customizable by the user during MetaMask confirmation.
                        maxPriorityFeePerGas: '0x3b9aca00', // Customizable by the user during MetaMask confirmation.
                        maxFeePerGas: '0x2540be400', // Customizable by the user during MetaMask confirmation.
                    },
                ],
            })
            .then((transactionHash) => document.dispatchEvent(new CustomEvent('metamask-erc-transaction-sent', {
                detail: transactionHash
            })))
            .catch(this.onError);
    }
}