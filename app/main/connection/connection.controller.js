class ConnectionController {
    constructor(GlobalApiService) {
        this._api = GlobalApiService;
        this.connectiondata = {};

        this.hasConnection = false;
        this.loading = true;

        this.getConnection();
    }

    getConnection() {
        this._api.getConnections().then((response) => {
            if(response.data.results && response.data.results.length) {
                this.connectiondata = response.data.results[0];
                this.hasConnection = true;
            }
            else {
                this.connectiondata = {};
                this.hasConnection = false;
            }
        }).finally(() => {
            this.loading = false;
        });
    }

    connect(form) {
        if(form.$valid) {
            this._api[this.hasConnection ? 'editConnection' : 'connectToDB'](this.connectiondata).then((data) => {
                if(data.status < 400) {
                    alert('Соединение сохранено');
                }
            }, (err) => {
                alert('Ошибка соединения');
            });
        }
    }
}

ConnectionController.$inject = ['GlobalApiService'];

export default ConnectionController;