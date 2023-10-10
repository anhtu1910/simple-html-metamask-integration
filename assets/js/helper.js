const helper = {
    toWei: function (ethereumAmount) {
        return Number(ethereumAmount * 1e18).toString(16);
    },
    request: {
        post: async function (url, data) {
            return await helper.request.send(url, 'POST', {
                "Content-Type": "application/json",
            }, JSON.stringify(data))
        },
        get: async function (url, data) {
            let query = Object.keys(data)
                .map((key) => key.concat('=', data[key]))
                .join('&');

            url = url.concat('?', query);

            return await helper.request.send(url, 'GET', {
                "Content-Type": "application/json",
            });
        },
        send: async function (url, method, headers, body) {
            let request = {
                method: method, // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "same-origin", // include, *same-origin, omit
                headers: headers,
                redirect: "follow", // manual, *follow, error
                referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            };

            if (method == 'POST') {
                request.body = body; // body data type must match "Content-Type" header
            }

            return (await fetch(url, request)).json();
        }
    }
}