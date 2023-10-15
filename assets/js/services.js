
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

class ErcTransactionService extends TransactionService {
    constructor(providers) {
        super(providers);
        this.etherscanProvider = providers?.etherscanProvider;
    }

    async send() {
        let ethereumNode = settings.ethereumNode;
        let ercTokenAddress = settings.erc20TokenAddress;
        let address = document.getElementById('recipient-address')?.value;
        let amount = document.getElementById('transaction-amount')?.value;

        if (!ethereumNode || !ercTokenAddress) {
            alert('Missing configurations');
        }

        if (!address || !amount) {
            alert('Recipient Address and Amount fields are required!');
            return;
        }

        let abi = await this.etherscanProvider.getTokenABI(ercTokenAddress);
        if (!abi) {
            alert('The token contract does not exist!');
            return;
        }

        let web3 = new Web3(new Web3.providers.HttpProvider(ethereumNode));
        let contract = new web3.eth.Contract(abi, ercTokenAddress, { from: settings.walletAddress });

        this.metamaskProvider.sendErcTransaction(contract, settings.walletAddress, address, amount);
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
