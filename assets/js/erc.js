const erc = {
    init: function () {
        erc.initEvents();
    },
    initEvents: function () {
        document.addEventListener('metamask-account-connected', function (e) {
            document.getElementById('config-wrapper').style.display = '';
        });

        document.addEventListener('metamask-transaction-sent', function (e) {
        });
    },
}

window.addEventListener('load', erc.init);

