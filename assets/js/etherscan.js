class Etherscan {
    constructor(apiUrl, apiKey) {
        this.apiUrl = apiUrl;
        this.apiKey = apiKey;
    }

    async getTokenABI(contractAddress) {
        let response = await helper.request.get(this.apiUrl, {
            'module': 'contract',
            'action': 'getabi',
            'address': contractAddress,
            'apikey': this.apiKey,
        });

        return JSON.parse(response.result);
    }
}

