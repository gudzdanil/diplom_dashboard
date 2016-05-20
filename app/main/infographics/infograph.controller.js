class InfoGraphCtrl {
    constructor(GlobalApiService, $uibModal, $timeout) {
        this._api = GlobalApiService;
        this._modal = $uibModal;
        this.activeDashBoard = 1;
        this._timeout = $timeout;

        this.getDashboards();

        
        this._api.getGraphTypes().then((data) => {
            this.types = data.data;
        });
    }

    getDashboards() {
        this.dashboards = [];
        this.createDashboard('Главный', true);

        this._api.getGraphs().then((data) => {
            this.dashboards[0].graphs = data.data.results;
        });
        this.activeDashBoard = 1;
    }

    addDashboard() {
        this.activeDashBoard = this.dashboards.length;
        let name = prompt("Введите имя нового дашборда: ");
        this.createDashboard(name);

        this._timeout(() => {
            this.activeDashBoard = this.dashboards.length;
        });
    }

    createDashboard(name, active) {
        if(name) {
            this.dashboards.push({
                title: name,
                id: this.dashboards.length + 1,
                graphs: [],
                active: !!active
            });
        }
        return !!name;
    }

    add(dashboardIndex) {
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
            this.dashboards[dashboardIndex].graphs.push(data);
        });
    }

    edit(dashBoardIndex, index) {
        this._modal.open({
            animation: true,
            template: require('./add.modal.html'),
            controller: 'GraphAddCtrl',
            controllerAs: 'vmAdd',
            resolve: {
                types: () => this.types,
                graph: () => this.dashboards[dashBoardIndex].graphs[index],
                saveMethod: () => angular.bind(this._api, this._api.editGraph)
            },
            size: 'md'
        }).result.then((data) => {
            this.dashboards[dashBoardIndex].graphs.splice(index, 1, data);
        });
    }
    
}

InfoGraphCtrl.$inject = ['GlobalApiService', '$uibModal', '$timeout'];

export default InfoGraphCtrl;