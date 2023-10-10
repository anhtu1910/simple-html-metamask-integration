
class Service {
    constructor(providers) {
        this.metamaskProvider = providers?.metamaskProvider;
    }
}

class TransactionService extends Service {
    send() {
        alert('This method should not be called without being defined in the concrete class.');
    }
}

class AccountService extends Service {
    connect() {
        alert('This method should not be called without being defined in the concrete class.');
    }
}

class EthereumTransactionService extends TransactionService {
    send() {
        let address = document.getElementById('recipient-address')?.value;
        let amount = document.getElementById('transaction-amount')?.value;
        if (!address || !amount) {
            alert('Recipient Address and Amount fields are required!');
            return;
        }

        this.metamaskProvider.sendEthereumTransaction(settings.walletAddress, address, amount);
    }
}

class ConnectService extends AccountService {
    connect() {
        if (!this.metamaskProvider.isExtensionInstalled()) {
            return;
        };

        this.metamaskProvider.connectAccount();
    }
}
