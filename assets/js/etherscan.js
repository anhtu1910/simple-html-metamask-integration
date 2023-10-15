class Etherscan {
    constructor(apiUrl, apiKey) {
        this.apiUrl = apiUrl;
        this.apiKey = apiKey;
    }

    async getTokenABI(contractAddress) {
        try {
            let response = await helper.request.get(this.apiUrl, {
                'module': 'contract',
                'action': 'getabi',
                'address': contractAddress,
                'apikey': this.apiKey,
            });

            return JSON.parse(response.result);
        } catch (e) {
            alert('Failed to get the contract ABI.');
            console.log(e);
        }
    }
}

