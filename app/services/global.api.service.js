class GlobalApiService {
    constructor($http, $q, API_URL) {
        this._http = $http;
        this._q = $q;
        this._baseUrl = API_URL;
    }

    addUser(user) {
        // return this._q.resolve({data: user});
        return this._http.post(this._baseUrl + 'auth/users/', user);
    }

    editUser(user) {
        return this._q.resolve({data: user});
        //return this._http.put(this._baseUrl + 'auth/users/' + user.id + '/', user);
    }

    getUsers() {
        // return this._q.resolve({
        //     data: {
        //         results: [{
        //             username: 'user1',
        //             email: 'user1@gmail.com',
        //             permissions: [1]
        //         }, {
        //             username: 'user2',
        //             email: 'user2@gmail.com',
        //             permissions: [1, 3]
        //         }]
        //     }
        // });
        return this._http.get(this._baseUrl + 'auth/users/');
    }

    getConnections() {
        return this._http.get(this._baseUrl + 'remote-db/');
    }

    connectToDB(data) {
        return this._http.post(this._baseUrl + 'remote-db/', data)
    }

    editConnection(data) {
        return this._http.put(this._baseUrl + 'remote-db/' + data.id + '/', data)
    }

    getDashboards() {
        return this._http.get(this._baseUrl + 'api/dashboard/');
    }

    addDashboard(dashboard) {
        return this._http.post(this._baseUrl + 'api/dashboard/', dashboard);
    }

    editDashboard(dashboard) {
        return this._http.put(this._baseUrl + 'api/dashboard/' + dashboard.id + '/', dashboard);
    }

    removeDashboard(data) {
        return this._http.delete(this._baseUrl + 'api/dashboard/' + data.id + '/');
    }

    getWidgets(dashboardId) {
        return this._http.get(this._baseUrl + 'api/dashboard/' + dashboardId + '/widget/');
    }

    addWidget(data, dashboardId) {
        // return this._q.resolve({data: _.assign({id: Math.floor(Math.random() * 10000)}, _.clone(data))});
        return this._http.post(this._baseUrl + 'api/dashboard/' + dashboardId + '/widget/', data);
    }

    editWidget(data) {
        // return this._q.resolve({data: data});
        return this._http.put(this._baseUrl + 'api/dashboard/widget/' + data.id, data);
    }

    removeWidget(data) {
        // return this._q.resolve({data: data});
        return this._http.delete(this._baseUrl + 'api/dashboard/widget/' + data.id);
    }

    getGraphTypes() {
        return this._http.get(this._baseUrl + 'api/diagram-types/');
    }

    getDashboardData(dashboardId) {
        return this._q((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    data: {
                        results: [{
                            labels: ["January", "February", "March", "April", "May", "June", "July"],
                            series: ['Series A', 'Series B'],
                            data: [
                                [65, 59, 80, 81, 56, 55, 40],
                                [28, 48, 40, 19, 86, 27, 90]
                            ]
                        // }, {
                        //     labels: ["Download Sales", "In-Store Sales", "Mail-Order Sales"],
                        //     data: [300, 500, 100]
                        // }, {
                        //     labels: ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"],
                        //     data: [300, 500, 100, 40, 120]
                        }, {
                            labels: ["January", "February", "March", "April", "May", "June", "July"],
                            series: ['Series A', 'Series B'],
                            data: [
                                [65, 59, 80, 81, 56, 55, 40],
                                [28, 48, 40, 19, 86, 27, 90]
                            ]
                        }]
                    }
                });
            }, 1000);
        });
        //this._http.get(this._baseUrl + 'api/dashboard/' + dashboardId + '/data/')
    }
}

GlobalApiService.$inject = ['$http', '$q', 'API_URL'];

export default GlobalApiService;