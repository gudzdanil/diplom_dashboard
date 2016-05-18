function config(ChartJsProvider, $httpProvider, AUTH, $q) {
    ChartJsProvider.setOptions({colours: ['#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360']});

    $httpProvider.interceptors.push(['$rootScope', '$q', function($rootScope, $q) {
        return {
            request: function(config) {
                if(AUTH.token) {
                    config.headers['Authorization'] = 'Token ' + AUTH.token;
                }
                return config;
            },
            responseError: function(response) {
                if(response.status === 401) {
                    AUTH.token = null;
                    $rootScope.$broadcast('logout');
                }
                return $q.reject(response);
            }
        };
    }]);
}

config.$inject = ['ChartJsProvider', '$httpProvider', 'AUTH'];

export default config;

