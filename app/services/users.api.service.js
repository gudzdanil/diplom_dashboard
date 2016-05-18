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

    register(data) {
        return this._http.post(this._baseUrl + 'register/', data);
    }
}

UsersApiService.$inject = ['$http', '$q', 'API_URL'];

export default UsersApiService;