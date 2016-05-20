class UsersController {
    constructor() {
        this.users = [];

        this.getUsers();
        this.getDashboards();
    }

    getUsers() {
        this.users = [{
            username: 'user1',
            email: 'user1@gmail.com',
            permissions: [1]
        },{
            username: 'user2',
            email: 'user2@gmail.com',
            permissions: [1,2]
        }];
    }

    getDashboardsList(user) {
        let list = [];
        for(let i = 0 ; i < user.permissions.length; i++) {
            list.push(this.dashboards.filter((d) => user.permissions[i] == d.id)[0].title);
        }
        return list.join(', ');
    }

    getDashboards() {
        this.dashboards = [{
            title: 'Главный',
            id: 1
        },{
            title: 'Второй',
            id: 2
        }];
    }
}

UsersController.$inject = [];

export default UsersController;