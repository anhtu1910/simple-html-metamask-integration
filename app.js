
const app = {
    walletAddress: null,
    web3: null,
    init: function () {
        document.getElementById("connect-button").addEventListener("click", app.connectAccount);
        document.getElementById("send-transaction-button").addEventListener("click", app.sendTransaction);
    },
    connectAccount: function () {
        if (!metamask.isExtensionInstalled()) {
            return;
        };

        metamask.connectAccount(function (account) {
            app.walletAddress = account.shift();

            document.getElementById('wallet-address').innerHTML = app.walletAddress;
            document.getElementById('wallet-wrapper').style.display = '';
            document.getElementById('transaction-wrapper').style.display = '';
        });
    },
    sendTransaction: function () {
        let address = document.getElementById('recipient-address')?.value;
        let amount = document.getElementById('transaction-amount')?.value;
        if (!address || !amount) {
            alert('Recipient Address and Amount fields are required!');
            return;
        }

        metamask.sendEthereumTransaction(app.walletAddress, address, amount, function (transactionHash) {
            document.getElementById('transaction-information-wrapper').style.display = '';
            document.getElementById('transaction-information').innerHTML = transactionHash;

            // TODO: you should call your BE/API to verify the transaction before confirming its status
        });
    }
}

window.addEventListener('load', app.init);
