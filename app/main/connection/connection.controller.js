class ConnectionController {
    constructor(GlobalApiService) {
        this._api = GlobalApiService;
        this.connectiondata = {};
    }

    connect(form) {
        if(form.$valid) {
            this._api.connectToDB(this.connectiondata).then((data) => {
                if(data.status < 400) {
                    alert('Соединение создано');
                }
            });
        }
    }
}

ConnectionController.$inject = ['GlobalApiService'];

export default ConnectionController;