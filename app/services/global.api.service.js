class GlobalApiService {
    constructor($http, $q, API_URL) {
        this._http = $http;
        this._q = $q;
        this._baseUrl = API_URL;
    }
    
    connectToDB(data) {
        return this._http.post(this._baseUrl + 'remote-db/', data)
    }

    getGraphs() {
        return this._http.get(this._baseUrl + 'widgets/');
    }

    addGraph(data) {
        return this._http.post(this._baseUrl + 'widgets/', data);
    }

    editGraph(data) {
        return this._http.put(this._baseUrl + 'widgets/' + data.id, data);
    }

    getGraphTypes() {
        return this._http.get(this._baseUrl + 'api/diagram-types');
    }
}

GlobalApiService.$inject = ['$http', '$q', 'API_URL'];

export default GlobalApiService;