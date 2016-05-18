class InfoGraphCtrl {
    constructor(GlobalApiService, $uibModal) {
        this._api = GlobalApiService;
        this._modal = $uibModal;

        this.graphs = [];

        this._api.getGraphs().then((data) => {
            this.graphs = data.data.results;
        });
        
        this._api.getGraphTypes().then((data) => {
            this.types = data.data;
        });
    }

    add() {
        this._modal.open({
            animation: true,
            template: require('./add.modal.html'),
            controller: 'GraphAddCtrl',
            controllerAs: 'vmAdd',
            resolve: {
                types: () => this.types,
                graph: () => { return {}; },
                saveMethod: () => angular.bind(this._api, this._api.addGraph)
            },
            size: 'md'
        }).result.then((data) => {
            this.graphs.push(data);
        });
    }

    edit(index) {
        this._modal.open({
            animation: true,
            template: require('./add.modal.html'),
            controller: 'GraphAddCtrl',
            controllerAs: 'vmAdd',
            resolve: {
                types: () => this.types,
                graph: () => this.graphs[index],
                saveMethod: () => angular.bind(this._api, this._api.editGraph)
            },
            size: 'md'
        }).result.then((data) => {
            this.graphs.splice(index, 1, data);
        });
    }
    
}

InfoGraphCtrl.$inject = ['GlobalApiService', '$uibModal'];

export default InfoGraphCtrl;