class InfoGraphCtrl {
    constructor(GlobalApiService, $uibModal, $timeout) {
        this._api = GlobalApiService;
        this._modal = $uibModal;
        this.activeDashBoard = 1;
        this._timeout = $timeout;

        this.dashboards = [];
        this.widgets = [];

        this.getDashboards();

        this._api.getGraphTypes().then((data) => {
            this.types = data.data;
        });
    }

    getDashboards() {
        this.widgets = [];
        this.activeDashBoard = 1;
        this.loading = true;
        this._api.getDashboards().then((data) => {
            this.dashboards = data.data.results;
            return this.updateWidgetList(this.dashboards[0].id);
        }).finally(() => {
            this.loading = false;
        });
    }

    updateWidgetList(dashboardId) {
        this.widgets = [];
        this._api.getWidgets(this.dashboards[this.activeDashBoard-1].id).then((data) => {
            this.widgets = data.data.results;
        });
    }

    addDashboard() {
        this.activeDashBoard = this.dashboards.length;
        let name = prompt("Введите имя нового дашборда: ");
        this.createDashboard(name);
    }

    createDashboard(name) {
        this.widgets = [];
        if(name) {
            this._api.addDashboard({name: name}).then(data => {
                this.dashboards.push(data.data);
                this.updateWidgetList(data.data.id);
                this._timeout(() => {
                    this.activeDashBoard = this.dashboards.length;
                });
            });
        }
        return !!name;
    }

    removeDashboard(index) {
        this._api.removeDashboard(this.dashboards[index]).then(() => {
            this.dashboards.splice(index, 1);
        });
    }

    editDashboard(index) {
        let name = prompt("Введите новое имя дашборда");
        if(name) {
            this._api.editDashboard(_.assign(_.clone(this.dashboards[index]), {name: name})).then((data) => {
                this.dashboards.splice(index, 1, data.data);
            });
        }
    }

    add() {
        let id = this.dashboards[this.activeDashBoard - 1].id;
        this._modal.open({
            animation: true,
            template: require('./add.modal.html'),
            controller: 'GraphAddCtrl',
            controllerAs: 'vmAdd',
            resolve: {
                types: () => this.types,
                graph: () => { return {}; },
                saveMethod: () => (data) => this._api.addWidget(data, id)
            },
            size: 'md'
        }).result.then((data) => {
            this.widgets.push(data);
        });
    }

    edit(dashboardIndex, index) {
        let id = this.dashboards[dashboardIndex].id;
        this._modal.open({
            animation: true,
            template: require('./add.modal.html'),
            controller: 'GraphAddCtrl',
            controllerAs: 'vmAdd',
            resolve: {
                types: () => this.types,
                graph: () => this.widgets[index],
                saveMethod: () => (data) => this._api.editWidget(data, id)
            },
            size: 'md'
        }).result.then((data) => {
            this.widgets.splice(index, 1, data);
        });
    }

    remove(index) {
        this._api.removeWidget(this.widgets[index]).then(() => {
            this.widgets.splice(index, 1);
        });
    }
    
}

InfoGraphCtrl.$inject = ['GlobalApiService', '$uibModal', '$timeout'];

export default InfoGraphCtrl;