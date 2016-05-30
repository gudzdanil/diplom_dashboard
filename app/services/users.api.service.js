class UsersApiService {
    constructor($http, $q, API_URL) {
        this._http = $http;
        this._q = $q;
        this._baseUrl = API_URL + 'auth/';
    }

    current() {
        return this._http.get(this._baseUrl + 'me/');
    }

    login(data) {
        return this._http.post(this._baseUrl + 'login/', data);
    }

    logout() {
        return this._http.post(this._baseUrl + 'logout/');
    }

    addUser(user) {
        return this._http.post(this._baseUrl + 'users/', user);
    }

    editUser(user) {
        return this._http.patch(this._baseUrl + 'users/' + user.id + '/', user);
    }

    getUsers() {
        return this._http.get(this._baseUrl + 'users/');
    }

    removeUser(id) {
        return this._http.delete(this._baseUrl + 'users/' + id + "/");
    }
}

UsersApiService.$inject = ['$http', '$q', 'API_URL'];

export default UsersApiService;