
class App {
    init(options) {
        this.initProviders(options);
        this.initFields();
        this.initAppEvents();
        this.initCallbackEvents();
    }

    initProviders(options) {
        this.accountService = options?.accountService;
        this.transactionService = options?.transactionService;
    }

    initFields() {
        document.getElementById('recipient-address').value = settings.recipientAddress;
    }

    initAppEvents() {
        document.getElementById("connect-button")?.addEventListener("click", this.accountService.connect?.bind(this.accountService));
        document.getElementById("send-transaction-button")?.addEventListener("click", this.transactionService?.send?.bind(this.transactionService));
    }

    initCallbackEvents() {
        document.addEventListener('metamask-account-connected', function (e) {
            let accounts = e.detail;

            settings.walletAddress = accounts.shift();

            document.getElementById('wallet-address').innerHTML = settings.walletAddress;
            document.getElementById('wallet-wrapper').style.display = '';
            document.getElementById('transaction-wrapper').style.display = '';
        }.bind(this));

        document.addEventListener('metamask-transaction-sent', function (e) {
            let transactionHash = e.detail;

            document.getElementById('transaction-information-wrapper').style.display = '';
            document.getElementById('transaction-information').innerHTML = transactionHash;

            // TODO: you should call your BE/API to verify the transaction before confirming its status
        }.bind(this));
    }
}