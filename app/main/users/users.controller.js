class UsersController {
    constructor($uibModal, GlobalApiService) {
        this._modal = $uibModal;
        this._api = GlobalApiService;
        this.users = [];

        this.getUsers();
        this.getDashboards();
    }

    getUsers() {
        this._api.getUsers().then((data) => {
            this.users = data.data.results;
        });
    }

    getDashboardsList(user) {
        if(user.permissions && this.dashboards && this.dashboards.length) {
            let list = [];
            for (var i = 0; i < user.permissions.length; i++) {
                let dashboards = this.dashboards.filter((d) => user.permissions[i] == d.id);
                if(dashboards.length) {
                    list.push(dashboards[0].name);
                }
            }
            return list.join(', ');
        }
        return '';
    }

    getDashboards() {
        return this._api.getDashboards().then(data => {
            return (this.dashboards = data.data.results);
        });
    }

    add() {
        this._modal.open({
            animation: true,
            template: require('./add.modal.html'),
            controller: 'UserAddCtrl',
            controllerAs: 'vmAdd',
            resolve: {
                dashboards: angular.bind(this, this.getDashboards),
                user: () => { return {}; },
                saveMethod: () => angular.bind(this._api, this._api.addUser)
            },
            size: 'md'
        }).result.then((data) => {
            this.users.push(data);
        });
    }
    edit(index) {
        this._modal.open({
            animation: true,
            template: require('./add.modal.html'),
            controller: 'UserAddCtrl',
            controllerAs: 'vmAdd',
            resolve: {
                dashboards: angular.bind(this, this.getDashboards),
                user: () => { return this.users[index]; },
                saveMethod: () => angular.bind(this._api, this._api.editUser)
            },
            size: 'md'
        }).result.then((data) => {
            this.users.splice(index, 1, data);
        });
    }
}

UsersController.$inject = ['$uibModal', 'GlobalApiService'];

export default UsersController;