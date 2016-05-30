class UsersController {
    constructor($uibModal, GlobalApiService, UsersApiService) {
        this._modal = $uibModal;
        this._api = GlobalApiService;
        this._apiUsers = UsersApiService;
        this.users = [];

        this.getUsers();
        this.getDashboards();
    }

    getUsers() {
        this._apiUsers.getUsers().then((data) => {
            this.users = data.data.results;
        });
    }

    getDashboardsList(user) {
        if(user.dashboards && this.dashboards && this.dashboards.length) {
            let list = [];
            for (var i = 0; i < user.dashboards.length; i++) {
                let dashboards = this.dashboards.filter((d) => user.dashboards[i] == d.id);
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
                saveMethod: () => angular.bind(this._apiUsers, this._apiUsers.addUser)
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
                saveMethod: () => angular.bind(this._apiUsers, this._apiUsers.editUser)
            },
            size: 'md'
        }).result.then((data) => {
            this.users.splice(index, 1, data);
        });
    }

    remove(index) {
        let id = this.users[index].id;
        if(confirm("Вы уверены что хотите удалить пользователя " + this.users[index].username + "?")) {
            this._apiUsers.removeUser(id).then(() => {
                this.users.splice(index, 1);
            });
        }
    }
}

UsersController.$inject = ['$uibModal', 'GlobalApiService', 'UsersApiService'];

export default UsersController;