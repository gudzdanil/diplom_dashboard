/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _router = __webpack_require__(1);

	var _router2 = _interopRequireDefault(_router);

	var _config = __webpack_require__(8);

	var _config2 = _interopRequireDefault(_config);

	var _usersApi = __webpack_require__(9);

	var _usersApi2 = _interopRequireDefault(_usersApi);

	var _users = __webpack_require__(10);

	var _users2 = _interopRequireDefault(_users);

	var _globalApi = __webpack_require__(11);

	var _globalApi2 = _interopRequireDefault(_globalApi);

	var _login = __webpack_require__(12);

	var _login2 = _interopRequireDefault(_login);

	var _global = __webpack_require__(13);

	var _global2 = _interopRequireDefault(_global);

	var _home = __webpack_require__(14);

	var _home2 = _interopRequireDefault(_home);

	var _connection = __webpack_require__(15);

	var _connection2 = _interopRequireDefault(_connection);

	var _infograph = __webpack_require__(16);

	var _infograph2 = _interopRequireDefault(_infograph);

	var _addModal = __webpack_require__(18);

	var _addModal2 = _interopRequireDefault(_addModal);

	var _users3 = __webpack_require__(19);

	var _users4 = _interopRequireDefault(_users3);

	var _addModal3 = __webpack_require__(21);

	var _addModal4 = _interopRequireDefault(_addModal3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	angular.module('dp', ['ui.router', 'ui.bootstrap', 'chart.js']).constant('AUTH', {
	    set token(token) {
	        this._token = token;
	        window.sessionStorage.setItem('diplom_auth', angular.toJson({ token: token }));
	    },
	    get token() {
	        if (this._token) {
	            return this._token;
	        }
	        var auth = angular.fromJson(window.sessionStorage.getItem('diplom_auth'));
	        return auth && auth.token;
	    }
	}).config(_config2.default).config(_router2.default).run(['$rootScope', '$state', function ($rootScope, $state) {
	    $rootScope.$on('logout', function () {
	        $state.go('login');
	    });
	}]).constant('API_URL', 'http://almost-bachelor.herokuapp.com/').service('UsersApiService', _usersApi2.default).service('UserService', _users2.default).service('GlobalApiService', _globalApi2.default).controller('LoginCtrl', _login2.default).controller('GlobalCtrl', _global2.default).controller('ConnectionCtrl', _connection2.default).controller('HomeCtrl', _home2.default).controller('GraphAddCtrl', _addModal2.default).controller('UsersCtrl', _users4.default).controller('UserAddCtrl', _addModal4.default).controller('GraphicsCtrl', _infograph2.default);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	function routing($stateProvider, $urlRouterProvider) {
	    $urlRouterProvider.otherwise('/#');

	    $stateProvider.state('login', {
	        url: '/login',
	        controller: 'LoginCtrl',
	        controllerAs: 'vmLogin',
	        template: __webpack_require__(2),
	        ncyBreadcrumb: {
	            label: 'Авторизация'
	        }
	    }).state('global', {
	        abstract: true,
	        template: __webpack_require__(3),
	        controller: 'GlobalCtrl',
	        controllerAs: 'vmGlobal'
	    }).state('home', {
	        parent: 'global',
	        url: '/',
	        controller: 'HomeCtrl',
	        controllerAs: 'vmHome',
	        template: __webpack_require__(4),
	        data: {
	            permission: ['ADMIN', 'USER']
	        },
	        ncyBreadcrumb: {
	            label: 'Главная'
	        }
	    }).state('connection', {
	        parent: 'global',
	        url: '/connection',
	        controller: 'ConnectionCtrl',
	        controllerAs: 'vmConnection',
	        template: __webpack_require__(5),
	        data: {
	            permission: ['ADMIN']
	        },
	        ncyBreadcrumb: {
	            label: 'Создать соединение'
	        }
	    }).state('graphics', {
	        parent: 'global',
	        url: '/graphics',
	        controller: 'GraphicsCtrl',
	        controllerAs: 'vmGraph',
	        template: __webpack_require__(6),
	        data: {
	            permission: ['ADMIN']
	        },
	        resolve: {
	            connections: ['GlobalApiService', function (api) {
	                return api.getConnections().then(function (data) {
	                    return data.data.results && data.data.results.length;
	                });
	            }]
	        },
	        ncyBreadcrumb: {
	            label: 'Управление инфорграфикой'
	        }
	    }).state('users', {
	        parent: 'global',
	        url: '/users',
	        controller: 'UsersCtrl',
	        controllerAs: 'vmUsers',
	        template: __webpack_require__(7),
	        data: {
	            permission: ['ADMIN']
	        },
	        resolve: {
	            connections: ['GlobalApiService', function (api) {
	                return api.getConnections().then(function (data) {
	                    return data.data.results && data.data.results.length;
	                });
	            }]
	        },
	        ncyBreadcrumb: {
	            label: 'Управление пользователями'
	        }
	    });
	}

	routing.$inject = ['$stateProvider', '$urlRouterProvider'];

	exports.default = routing;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = "<form ng-submit=\"vmLogin.login(logForm)\" name=\"logForm\" class=\"form col-md-6 col-md-push-3\" style=\"border: 1px solid rgb(17, 63, 110); border-radius: 10px; margin-top: 50px; padding-bottom: 20px;\">\n    <h2 class=\"text-center\">Авторизация</h2>\n    <div class=\"form-group\">\n        <label for=\"email\">Логин</label>\n        <input type=\"text\" class=\"form-control\" required ng-model=\"vmLogin.userdata.username\" id=\"email\"/>\n    </div>\n    <div class=\"form-group\">\n        <label for=\"password\">Пароль</label>\n        <input type=\"password\" class=\"form-control\" required ng-model=\"vmLogin.userdata.password\" id=\"password\"/>\n    </div>\n    <div class=\"text-center\">\n        <input type=\"submit\" class=\"btn btn-default\" value=\"Войти\">\n    </div>\n</form>"

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = "<header>\n    <nav class=\"navbar navbar-default\">\n        <div class=\"container-fluid\">\n            <!-- Brand and toggle get grouped for better mobile display -->\n            <div class=\"navbar-header\">\n                <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\"\n                        data-target=\"#bs-example-navbar-collapse-1\" aria-expanded=\"false\">\n                    <span class=\"sr-only\">Toggle navigation</span>\n                    <span class=\"icon-bar\"></span>\n                    <span class=\"icon-bar\"></span>\n                    <span class=\"icon-bar\"></span>\n                </button>\n                <a class=\"navbar-brand\" href=\"#\">Dashboard</a>\n            </div>\n\n            <!-- Collect the nav links, forms, and other content for toggling -->\n            <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\n                <ul class=\"nav navbar-nav\">\n                    <li ui-sref-active=\"active\"><a href=\"\" ui-sref=\"home\">Главная</a></li>\n                    <li ui-sref-active=\"active\"><a href=\"\" ui-sref=\"connection\" ng-class=\"{'attention': vmGlobal.noConnection}\">Соединение</a></li>\n                    <li ui-sref-active=\"active\" ng-class=\"{'disabled': vmGlobal.noConnection}\"><a href=\"\" ui-sref=\"graphics\">Настройка дашбордов</a></li>\n                    <li ui-sref-active=\"active\" ng-class=\"{'disabled': vmGlobal.noConnection}\"><a href=\"\" ui-sref=\"users\">Пользователи</a></li>\n                </ul>\n                <ul class=\"nav navbar-nav navbar-right\">\n                    <li><a href=\"\" ng-bind=\"vmGlobal.user.username\"></a></li>\n                    <li><a href=\"\" ng-click=\"vmGlobal.logout()\">Выйти</a></li>\n                </ul>\n            </div><!-- /.navbar-collapse -->\n        </div><!-- /.container-fluid -->\n    </nav>\n</header>\n<main>\n    <div class=\"container\" ui-view></div>\n</main>\n<!--<footer>-->\n    <!--<nav class=\"navbar navbar-default\">-->\n        <!--<div class=\"container\">-->\n            <!--...-->\n        <!--</div>-->\n    <!--</nav>-->\n<!--</footer>-->"

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = "<div class=\"col-md-8\">\n    <uib-tabset active=\"vmHome.activeTab\">\n        <uib-tab ng-repeat=\"tab in vmHome.dashboards track by $index\" heading=\"{{tab.name}}\">\n            <div ng-class=\"{'loading': vmHome.loading}\">\n                <div class=\"row\">\n                <div class=\" col-md-6 col-sm-6 col-xs-12\" ng-repeat=\"graph in vmHome.graphs track by $index\">\n                    <canvas class=\"chart chart-line\" chart-data=\"graph.data\"\n                            chart-labels=\"graph.labels\" chart-legend=\"true\"\n                            chart-series=\"graph.series\"\n                            chart-click=\"vmHome.onClick\"\n                    >\n                    </canvas>\n                </div>\n                    </div>\n                <!--<div class=\" col-md-6 col-sm-6 col-xs-12\">-->\n                <!--<canvas class=\"chart chart-bar\" chart-data=\"vmHome.graphs[0].data\"-->\n                <!--chart-labels=\"vmHome.graphs[0].labels\" chart-legend=\"true\"-->\n                <!--chart-series=\"vmHome.graphs[0].series\"-->\n                <!--chart-click=\"vmHome.onClick\">-->\n                <!--</canvas>-->\n                <!--</div>-->\n                <!--</div>-->\n                <!--<div class=\"row\">-->\n                <!--<div class=\" col-md-6 col-sm-6 col-xs-12\">-->\n                <!--<canvas class=\"chart chart-polar-area\" chart-data=\"vmHome.graphs[2].data\"-->\n                <!--chart-labels=\"vmHome.graphs[2].labels\"-->\n                <!--chart-click=\"vmHome.onClick\">-->\n                <!--</canvas>-->\n                <!--</div>-->\n                <!--<div class=\" col-md-6 col-sm-6 col-xs-12\">-->\n                <!--<canvas class=\"chart chart-pie\" chart-data=\"vmHome.graphs[1].data\"-->\n                <!--chart-labels=\"vmHome.graphs[1].labels\"-->\n                <!--chart-click=\"vmHome.onClick\">-->\n                <!--</canvas>-->\n                <!--</div>-->\n                <!--</div>-->\n            </div>\n        </uib-tab>\n    </uib-tabset>\n</div>\n<div class=\"col-md-4\">\n    <div class=\"row\"><button class=\"btn btn-default\" ng-click=\"vmHome.saveAsPDF()\">экспорт в PDF</button></div>\n    <div class=\"row\"><button class=\"btn btn-default\" ng-click=\"vmHome.saveAsJPEG()\">экспорт в JPEG</button></div>\n</div>\n"

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = "<h2 class=\"text-center\">Натройте соединение с удаленной базой данных</h2>\n\n<p class=\"bg-danger ng-hide\" ng-show=\"vmGlobal.noConnection\">Нет действующего соединения</p>\n\n<form ng-submit=\"vmConnection.connect(connectionForm)\" name=\"connectionForm\" ng-class=\"{'loading': vmConnection.loading}\">\n    <div class=\"form-group\">\n        <label for=\"db_host\">Хост базы данных</label>\n        <input type=\"text\" ng-model=\"vmConnection.connectiondata.host\" class=\"form-control\" id=\"db_host\"  >\n    </div>\n    <div class=\"form-group\">\n        <label for=\"db_port\">Порт</label>\n        <input type=\"number\"  ng-model=\"vmConnection.connectiondata.port\" class=\"form-control\" id=\"db_port\" >\n    </div>\n    <div class=\"form-group\">\n        <label for=\"db_user\">Имя пользователя</label>\n        <input type=\"text\" class=\"form-control\" ng-model=\"vmConnection.connectiondata.user\" id=\"db_user\" >\n    </div>\n    <div class=\"form-group\">\n        <label for=\"db_pass\">Пароль</label>\n        <input type=\"password\" class=\"form-control\" ng-model=\"vmConnection.connectiondata.password\" id=\"db_pass\" >\n    </div>\n    <div class=\"form-group\">\n        <label for=\"db_name\">Имя базы данных</label>\n        <input type=\"text\" class=\"form-control\" ng-model=\"vmConnection.connectiondata.db_name\" id=\"db_name\" >\n    </div>\n    <div class=\"text-center\">\n        <button class=\"btn btn-default\" type=\"submit\">Создать соединение</button>\n    </div>\n</form>"

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = "<uib-tabset active=\"vmGraph.activeDashBoard\">\n    <uib-tab index=\"($index + 1)\" ng-click=\"vmGraph.updateWidgetList()\" heading=\"{{dashboard.name}}\"\n             ng-repeat=\"dashboard in vmGraph.dashboards track by $index\">\n        <div class=\"row text-right\">\n            <button class=\"btn btn-primary\" ng-click=\"vmGraph.editDashboard($index)\">Изменить имя дашборда</button>\n            <button class=\"btn btn-danger\" ng-click=\"vmGraph.removeDashboard($index)\">Удалить дашборд</button>\n        </div>\n        <div class=\"row\">\n            <ul class=\"list-unstyled clearfix\" style=\"margin-top: 30px;\">\n                <li ng-repeat=\"widget in vmGraph.widgets track by $index\">\n                    <div class=\"col-md-8\">\n                        <dl class=\"dl-horizontal\">\n                            <dt>Запрос</dt>\n                            <dd ng-bind=\"widget.query\"></dd>\n                        </dl>\n                        <dl class=\"dl-horizontal\">\n                            <dt>Тип</dt>\n                            <dd ng-bind=\"vmGraph.types[widget.diagram_type]\"></dd>\n                        </dl>\n                    </div>\n                    <div class=\"col-md-4\">\n                        <button ng-click=\"vmGraph.edit($parent.$index, $index)\" class=\"btn btn-default\">Редактировать\n                        </button>\n                        <button ng-click=\"vmGraph.remove($index)\" class=\"btn btn-default\">Удалить</button>\n                    </div>\n                </li>\n            </ul>\n        </div>\n        <div class=\"text-center\">\n            <button ng-click=\"vmGraph.add($parent.$index)\" class=\"btn btn-default\">Добавить</button>\n        </div>\n    </uib-tab>\n    <uib-tab ng-click=\"vmGraph.addDashboard()\" heading=\"+\" index=\"99999\" style=\"cursor: default\"></uib-tab>\n</uib-tabset>\n"

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = "<ul class=\"list-unstyled clearfix\">\n    <li class=\"row\" ng-repeat=\"user in vmUsers.users track by $index\" style=\"border-bottom: 1px solid rgba(0,0,0,0.1); padding-top: 10px;\">\n        <div class=\"col-md-8\">\n            <dl class=\"dl-horizontal\">\n                <dt>Имя пользователя</dt>\n                <dd ng-bind=\"user.username\"></dd>\n            </dl>\n            <dl class=\"dl-horizontal\">\n                <dt>E-mail</dt>\n                <dd ng-bind=\"user.email\"></dd>\n            </dl>\n            <dl class=\"dl-horizontal\">\n                <dt>Доступ к дашбордам</dt>\n                <dd ng-bind=\"vmUsers.getDashboardsList(user)\"></dd>\n            </dl>\n        </div>\n        <div class=\"col-md-4\">\n            <button class=\"btn btn-default\" ng-click=\"vmUsers.edit($index)\">Редактировать</button>\n        </div>\n    </li>\n</ul>\n<div class=\"row text-center\">\n    <button class=\"btn btn-default\" ng-click=\"vmUsers.add()\">Добавить</button>\n</div>\n"

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	function config(ChartJsProvider, $httpProvider, AUTH, $q) {
	    ChartJsProvider.setOptions({ colours: ['#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'] });

	    $httpProvider.interceptors.push(['$rootScope', '$q', function ($rootScope, $q) {
	        return {
	            request: function request(config) {
	                if (AUTH.token) {
	                    config.headers['Authorization'] = 'Token ' + AUTH.token;
	                }
	                return config;
	            },
	            responseError: function responseError(response) {
	                if (response.status === 401) {
	                    AUTH.token = null;
	                    $rootScope.$broadcast('logout');
	                }
	                return $q.reject(response);
	            }
	        };
	    }]);
	}

	config.$inject = ['ChartJsProvider', '$httpProvider', 'AUTH'];

	exports.default = config;

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var UsersApiService = function () {
	    function UsersApiService($http, $q, API_URL) {
	        _classCallCheck(this, UsersApiService);

	        this._http = $http;
	        this._q = $q;
	        this._baseUrl = API_URL + 'auth/';
	    }

	    _createClass(UsersApiService, [{
	        key: 'current',
	        value: function current() {
	            return this._http.get(this._baseUrl + 'me/');
	        }
	    }, {
	        key: 'login',
	        value: function login(data) {
	            return this._http.post(this._baseUrl + 'login/', data);
	        }
	    }, {
	        key: 'logout',
	        value: function logout() {
	            return this._http.post(this._baseUrl + 'logout/');
	        }
	    }]);

	    return UsersApiService;
	}();

	UsersApiService.$inject = ['$http', '$q', 'API_URL'];

	exports.default = UsersApiService;

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var User = function () {
	    function User() {
	        var userData = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	        _classCallCheck(this, User);

	        this.update(userData);
	    }

	    _createClass(User, [{
	        key: 'update',
	        value: function update(_ref) {
	            var _ref$username = _ref.username;
	            var username = _ref$username === undefined ? "username" : _ref$username;
	            var email = _ref.email;
	            var role = _ref.role;
	            var id = _ref.id;

	            this.id = id;
	            this.username = username;
	            this.email = email;
	            this.role = role;
	            return this;
	        }
	    }]);

	    return User;
	}();

	var UserService = function () {
	    function UserService(api, AUTH, $q) {
	        _classCallCheck(this, UserService);

	        this._q = $q;
	        this._auth = AUTH;
	        this._api = api;
	        this._user = new User();
	    }

	    _createClass(UserService, [{
	        key: 'login',
	        value: function login(userData) {
	            var _this = this;

	            return this._api.login(userData).then(function (data) {
	                if (data.status < 400) {
	                    _this._auth.token = data.data.auth_token;
	                    return _this._api.current().then(function (user) {
	                        return _this._user.update(user.data);
	                    });
	                }
	                return _this._q.reject();
	            });
	        }
	    }, {
	        key: 'logout',
	        value: function logout() {
	            var _this2 = this;

	            return this._api.logout().then(function (data) {
	                _this2._auth.token = null;
	                return _this2._user.update({});
	            });
	        }
	    }, {
	        key: 'user',
	        get: function get() {
	            var _this3 = this;

	            if (this._user.role) {
	                return this._user;
	            }
	            return this._api.current().then(function (data) {
	                return _this3._user.update(data);
	            });
	        }
	    }]);

	    return UserService;
	}();

	UserService.$inject = ['UsersApiService', 'AUTH', '$q'];

	exports.default = UserService;

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GlobalApiService = function () {
	    function GlobalApiService($http, $q, API_URL) {
	        _classCallCheck(this, GlobalApiService);

	        this._http = $http;
	        this._q = $q;
	        this._baseUrl = API_URL;
	    }

	    _createClass(GlobalApiService, [{
	        key: 'addUser',
	        value: function addUser(user) {
	            return this._q.resolve({ data: user });
	            //this._http.post(this._baseUrl + 'users/', user);
	        }
	    }, {
	        key: 'editUser',
	        value: function editUser(user) {
	            return this._q.resolve({ data: user });
	            //this._http.put(this._baseUrl + 'users/' + user.id + '/', user);
	        }
	    }, {
	        key: 'getUsers',
	        value: function getUsers() {
	            return this._q.resolve({
	                data: {
	                    results: [{
	                        username: 'user1',
	                        email: 'user1@gmail.com',
	                        permissions: [1]
	                    }, {
	                        username: 'user2',
	                        email: 'user2@gmail.com',
	                        permissions: [1, 3]
	                    }]
	                }
	            });
	            //this._http.get(this._baseUrl + 'users/');
	        }
	    }, {
	        key: 'getConnections',
	        value: function getConnections() {
	            return this._http.get(this._baseUrl + 'remote-db/');
	        }
	    }, {
	        key: 'connectToDB',
	        value: function connectToDB(data) {
	            return this._http.post(this._baseUrl + 'remote-db/', data);
	        }
	    }, {
	        key: 'editConnection',
	        value: function editConnection(data) {
	            return this._http.put(this._baseUrl + 'remote-db/' + data.id + '/', data);
	        }
	    }, {
	        key: 'getDashboards',
	        value: function getDashboards() {
	            return this._http.get(this._baseUrl + 'api/dashboard/');
	        }
	    }, {
	        key: 'addDashboard',
	        value: function addDashboard(dashboard) {
	            return this._http.post(this._baseUrl + 'api/dashboard/', dashboard);
	        }
	    }, {
	        key: 'editDashboard',
	        value: function editDashboard(dashboard) {
	            return this._http.put(this._baseUrl + 'api/dashboard/' + dashboard.id, dashboard);
	        }
	    }, {
	        key: 'removeDashboard',
	        value: function removeDashboard(data) {
	            return this._http.delete(this._baseUrl + 'api/dashboard/' + data.id);
	        }
	    }, {
	        key: 'getWidgets',
	        value: function getWidgets(dashboardId) {
	            return this._http.get(this._baseUrl + 'api/dashboard/' + dashboardId + '/widget/');
	        }
	    }, {
	        key: 'addWidget',
	        value: function addWidget(data, dashboardId) {
	            // return this._q.resolve({data: _.assign({id: Math.floor(Math.random() * 10000)}, _.clone(data))});
	            return this._http.post(this._baseUrl + 'api/dashboard/' + dashboardId + '/widget/', data);
	        }
	    }, {
	        key: 'editWidget',
	        value: function editWidget(data) {
	            // return this._q.resolve({data: data});
	            return this._http.put(this._baseUrl + 'api/dashboard/widget/' + data.id, data);
	        }
	    }, {
	        key: 'removeWidget',
	        value: function removeWidget(data) {
	            // return this._q.resolve({data: data});
	            return this._http.delete(this._baseUrl + 'api/dashboard/widget/' + data.id);
	        }
	    }, {
	        key: 'getGraphTypes',
	        value: function getGraphTypes() {
	            return this._http.get(this._baseUrl + 'api/diagram-types');
	        }
	    }, {
	        key: 'getDashboardData',
	        value: function getDashboardData(dashboardId) {
	            return this._q(function (resolve, reject) {
	                setTimeout(function () {
	                    resolve({
	                        data: {
	                            results: [{
	                                labels: ["January", "February", "March", "April", "May", "June", "July"],
	                                series: ['Series A', 'Series B'],
	                                data: [[65, 59, 80, 81, 56, 55, 40], [28, 48, 40, 19, 86, 27, 90]]
	                                // }, {
	                                //     labels: ["Download Sales", "In-Store Sales", "Mail-Order Sales"],
	                                //     data: [300, 500, 100]
	                                // }, {
	                                //     labels: ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"],
	                                //     data: [300, 500, 100, 40, 120]
	                            }, {
	                                labels: ["January", "February", "March", "April", "May", "June", "July"],
	                                series: ['Series A', 'Series B'],
	                                data: [[65, 59, 80, 81, 56, 55, 40], [28, 48, 40, 19, 86, 27, 90]]
	                            }]
	                        }
	                    });
	                }, 1000);
	            });
	            //this._http.get(this._baseUrl + 'api/dashboard/' + dashboardId + '/data/')
	        }
	    }]);

	    return GlobalApiService;
	}();

	GlobalApiService.$inject = ['$http', '$q', 'API_URL'];

	exports.default = GlobalApiService;

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var LoginController = function () {
	    function LoginController(UserService, $state) {
	        _classCallCheck(this, LoginController);

	        this._service = UserService;
	        this._state = $state;

	        this.userdata = {};
	    }

	    _createClass(LoginController, [{
	        key: 'login',
	        value: function login(form) {
	            var _this = this;

	            if (form.$valid) {
	                this._service.login(this.userdata).then(function (data) {
	                    _this._state.go('home');
	                });
	            }
	        }
	    }]);

	    return LoginController;
	}();

	LoginController.$inject = ['UserService', '$state'];

	exports.default = LoginController;

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GlobalController = function () {
	    function GlobalController(UserService, $state, GlobalApiService) {
	        var _this = this;

	        _classCallCheck(this, GlobalController);

	        this._state = $state;
	        this._api = GlobalApiService;
	        this._userService = UserService;

	        UserService.user.then(function (user) {
	            _this.user = user;
	        });
	        this.noConnection = true;

	        this._api.getConnections().then(function (resp) {
	            if (!resp.data.results || !resp.data.results.length) {
	                return _this.noConnection = true;
	            }
	            _this.noConnection = false;
	        });
	    }

	    _createClass(GlobalController, [{
	        key: 'logout',
	        value: function logout() {
	            var _this2 = this;

	            this._userService.logout().then(function () {
	                _this2._state.go('login');
	            });
	        }
	    }]);

	    return GlobalController;
	}();

	GlobalController.$inject = ['UserService', '$state', 'GlobalApiService'];

	exports.default = GlobalController;

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var HomeController = function () {
	    function HomeController(GlobalApiService, $scope, $q) {
	        var _this = this;

	        _classCallCheck(this, HomeController);

	        this._api = GlobalApiService;
	        this._q = $q;
	        this._scope = $scope;

	        this.getDashboards();
	        this.activeTab = 0;

	        this._scope.$watch(function () {
	            return _this.activeTab;
	        }, function (activeTab) {
	            _this.getData();
	        });

	        //
	        // this.graphs = [{
	        //     labels: ["January", "February", "March", "April", "May", "June", "July"],
	        //     series: ['Series A', 'Series B'],
	        //     data: [
	        //         [65, 59, 80, 81, 56, 55, 40],
	        //         [28, 48, 40, 19, 86, 27, 90]
	        //     ]
	        // },{
	        //     labels: ["Download Sales", "In-Store Sales", "Mail-Order Sales"],
	        //     data: [300, 500, 100]
	        // },{
	        //     labels: ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"],
	        //     data: [300, 500, 100, 40, 120]
	        // },{
	        //     labels: ["January", "February", "March", "April", "May", "June", "July"],
	        //     series: ['Series A', 'Series B'],
	        //     data: [
	        //         [65, 59, 80, 81, 56, 55, 40],
	        //         [28, 48, 40, 19, 86, 27, 90]
	        //     ]
	        // }];

	        // this.onClick = function (points, evt) {
	        //     console.log(points, evt);
	        // };
	    }

	    _createClass(HomeController, [{
	        key: 'getDashboards',
	        value: function getDashboards() {
	            var _this2 = this;

	            this._api.getDashboards().then(function (data) {
	                _this2.dashboards = data.data.results;
	                _this2.getData();
	            });
	        }
	    }, {
	        key: 'getData',
	        value: function getData() {
	            var _this3 = this;

	            if (this.dashboards && this.dashboards.length) {
	                this.loading = true;
	                this.graphs = [];
	                this._api.getDashboardData(this.dashboards[this.activeTab].id).then(function (data) {
	                    _this3.graphs = data.data.results;
	                    _this3.loading = false;
	                });
	            }
	        }
	    }, {
	        key: 'makeScreen',
	        value: function makeScreen() {
	            return this._q(function (resolve, reject) {
	                html2canvas($('.tab-pane.active').get(0), {
	                    onrendered: function onrendered(canvas) {
	                        resolve(canvas);
	                    }
	                });
	            });
	        }
	    }, {
	        key: 'saveAsJPEG',
	        value: function saveAsJPEG() {
	            this.makeScreen().then(function (canvas) {
	                var el = document.createElement('a');
	                el.href = canvas.toDataURL('image/jpeg');
	                el.download = "infographics.jpeg";
	                el.click();
	            });
	        }
	    }, {
	        key: 'saveAsPDF',
	        value: function saveAsPDF() {
	            this.makeScreen().then(function (canvas) {
	                var imgData = canvas.toDataURL("image/jpeg", 1.0);
	                var pdf = new jsPDF();

	                pdf.addImage(imgData, 'JPEG', 0, 0);
	                var download = document.getElementById('download');

	                pdf.save("infographics.pdf");
	            });
	        }
	    }]);

	    return HomeController;
	}();

	HomeController.$inject = ['GlobalApiService', '$scope', '$q'];

	exports.default = HomeController;

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ConnectionController = function () {
	    function ConnectionController(GlobalApiService) {
	        _classCallCheck(this, ConnectionController);

	        this._api = GlobalApiService;
	        this.connectiondata = {};

	        this.hasConnection = false;
	        this.loading = true;

	        this.getConnection();
	    }

	    _createClass(ConnectionController, [{
	        key: 'getConnection',
	        value: function getConnection() {
	            var _this = this;

	            this._api.getConnections().then(function (response) {
	                if (response.data.results && response.data.results.length) {
	                    _this.connectiondata = response.data.results[0];
	                    _this.hasConnection = true;
	                } else {
	                    _this.connectiondata = {};
	                    _this.hasConnection = false;
	                }
	            }).finally(function () {
	                _this.loading = false;
	            });
	        }
	    }, {
	        key: 'connect',
	        value: function connect(form) {
	            if (form.$valid) {
	                this._api[this.hasConnection ? 'editConnection' : 'connectToDB'](this.connectiondata).then(function (data) {
	                    if (data.status < 400) {
	                        alert('Соединение сохранено');
	                    }
	                }, function (err) {
	                    alert('Ошибка соединения');
	                });
	            }
	        }
	    }]);

	    return ConnectionController;
	}();

	ConnectionController.$inject = ['GlobalApiService'];

	exports.default = ConnectionController;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var InfoGraphCtrl = function () {
	    function InfoGraphCtrl(GlobalApiService, $uibModal, $timeout) {
	        var _this = this;

	        _classCallCheck(this, InfoGraphCtrl);

	        this._api = GlobalApiService;
	        this._modal = $uibModal;
	        this.activeDashBoard = 1;
	        this._timeout = $timeout;

	        this.dashboards = [];
	        this.widgets = [];

	        this.getDashboards();

	        this._api.getGraphTypes().then(function (data) {
	            _this.types = data.data;
	        });
	    }

	    _createClass(InfoGraphCtrl, [{
	        key: "getDashboards",
	        value: function getDashboards() {
	            var _this2 = this;

	            this.widgets = [];
	            this.activeDashBoard = 1;
	            this.loading = true;
	            this._api.getDashboards().then(function (data) {
	                _this2.dashboards = data.data.results;
	                return _this2.updateWidgetList(_this2.dashboards[0].id);
	            }).finally(function () {
	                _this2.loading = false;
	            });
	        }
	    }, {
	        key: "updateWidgetList",
	        value: function updateWidgetList(dashboardId) {
	            var _this3 = this;

	            this.widgets = [];
	            this._api.getWidgets(this.dashboards[this.activeDashBoard - 1].id).then(function (data) {
	                _this3.widgets = data.data.results;
	            });
	        }
	    }, {
	        key: "addDashboard",
	        value: function addDashboard() {
	            this.activeDashBoard = this.dashboards.length;
	            var name = prompt("Введите имя нового дашборда: ");
	            this.createDashboard(name);
	        }
	    }, {
	        key: "createDashboard",
	        value: function createDashboard(name) {
	            var _this4 = this;

	            this.widgets = [];
	            if (name) {
	                this._api.addDashboard({ name: name }).then(function (data) {
	                    _this4.dashboards.push(data.data);
	                    _this4.updateWidgetList(data.data.id);
	                    _this4._timeout(function () {
	                        _this4.activeDashBoard = _this4.dashboards.length;
	                    });
	                });
	            }
	            return !!name;
	        }
	    }, {
	        key: "removeDashboard",
	        value: function removeDashboard(index) {
	            var _this5 = this;

	            this._api.removeDashboard(this.dashboards[index]).then(function () {
	                _this5.dashboards.splice(index, 1);
	            });
	        }
	    }, {
	        key: "editDashboard",
	        value: function editDashboard(index) {
	            var _this6 = this;

	            var name = prompt("Введите новое имя дашборда");
	            if (name) {
	                this._api.editDashboard(_.assign(_.clone(this.dashboards[index]), { name: name })).then(function (data) {
	                    _this6.dashboards.splice(index, 1, data.data);
	                });
	            }
	        }
	    }, {
	        key: "add",
	        value: function add() {
	            var _this7 = this;

	            var id = this.dashboards[this.activeDashBoard - 1].id;
	            this._modal.open({
	                animation: true,
	                template: __webpack_require__(17),
	                controller: 'GraphAddCtrl',
	                controllerAs: 'vmAdd',
	                resolve: {
	                    types: function types() {
	                        return _this7.types;
	                    },
	                    graph: function graph() {
	                        return {};
	                    },
	                    saveMethod: function saveMethod() {
	                        return function (data) {
	                            return _this7._api.addWidget(data, id);
	                        };
	                    }
	                },
	                size: 'md'
	            }).result.then(function (data) {
	                _this7.widgets.push(data);
	            });
	        }
	    }, {
	        key: "edit",
	        value: function edit(dashboardIndex, index) {
	            var _this8 = this;

	            var id = this.dashboards[dashboardIndex].id;
	            this._modal.open({
	                animation: true,
	                template: __webpack_require__(17),
	                controller: 'GraphAddCtrl',
	                controllerAs: 'vmAdd',
	                resolve: {
	                    types: function types() {
	                        return _this8.types;
	                    },
	                    graph: function graph() {
	                        return _this8.widgets[index];
	                    },
	                    saveMethod: function saveMethod() {
	                        return function (data) {
	                            return _this8._api.editWidget(data, id);
	                        };
	                    }
	                },
	                size: 'md'
	            }).result.then(function (data) {
	                _this8.widgets.splice(index, 1, data);
	            });
	        }
	    }, {
	        key: "remove",
	        value: function remove(index) {
	            var _this9 = this;

	            this._api.removeWidget(this.widgets[index]).then(function () {
	                _this9.widgets.splice(index, 1);
	            });
	        }
	    }]);

	    return InfoGraphCtrl;
	}();

	InfoGraphCtrl.$inject = ['GlobalApiService', '$uibModal', '$timeout'];

	exports.default = InfoGraphCtrl;

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = "<div style=\"padding: 20px;\">\n    <form ng-submit=\"vmAdd.save(addForm)\" name=\"addForm\">\n        <div class=\"row\">\n            <div class=\"form-group col-sm-8\">\n                <label>Запрос</label>\n                <input type=\"text\" ng-model=\"vmAdd.graph.query\" class=\"form-control\">\n            </div>\n            <div class=\"col-sm-4\">\n                <label>Тип</label>\n                <select class=\"form-control\" ng-model=\"vmAdd.graph.diagram_type\"\n                        ng-options=\"key as value for (key, value) in vmAdd.types\"></select>\n            </div>\n        </div>\n        <div class=\"text-center\">\n            <button type=\"submit\" class=\"btn btn-default\">Сохранить</button>\n        </div>\n    </form>\n</div>"

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var InfoGraphAddCtrl = function () {
	    function InfoGraphAddCtrl($uibModalInstance, graph, types, saveMethod) {
	        _classCallCheck(this, InfoGraphAddCtrl);

	        this._modalInstance = $uibModalInstance;
	        this.saveMethod = saveMethod;

	        this.graph = angular.copy(graph);
	        this.types = types;
	    }

	    _createClass(InfoGraphAddCtrl, [{
	        key: 'save',
	        value: function save() {
	            var _this = this;

	            this.saveMethod(this.graph).then(function (data) {
	                _this._modalInstance.close(data.data);
	            }, function (err) {
	                alert("Ошибка сохранения");
	            });
	        }
	    }]);

	    return InfoGraphAddCtrl;
	}();

	InfoGraphAddCtrl.$inject = ['$uibModalInstance', 'graph', 'types', 'saveMethod'];

	exports.default = InfoGraphAddCtrl;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var UsersController = function () {
	    function UsersController($uibModal, GlobalApiService) {
	        _classCallCheck(this, UsersController);

	        this._modal = $uibModal;
	        this._api = GlobalApiService;
	        this.users = [];

	        this.getUsers();
	        this.getDashboards();
	    }

	    _createClass(UsersController, [{
	        key: 'getUsers',
	        value: function getUsers() {
	            var _this = this;

	            this._api.getUsers().then(function (data) {
	                _this.users = data.data.results;
	            });
	        }
	    }, {
	        key: 'getDashboardsList',
	        value: function getDashboardsList(user) {
	            if (user.permissions && this.dashboards && this.dashboards.length) {
	                var list = [];
	                for (var i = 0; i < user.permissions.length; i++) {
	                    var dashboards = this.dashboards.filter(function (d) {
	                        return user.permissions[i] == d.id;
	                    });
	                    if (dashboards.length) {
	                        list.push(dashboards[0].name);
	                    }
	                }
	                return list.join(', ');
	            }
	            return '';
	        }
	    }, {
	        key: 'getDashboards',
	        value: function getDashboards() {
	            var _this2 = this;

	            return this._api.getDashboards().then(function (data) {
	                return _this2.dashboards = data.data.results;
	            });
	        }
	    }, {
	        key: 'add',
	        value: function add() {
	            var _this3 = this;

	            this._modal.open({
	                animation: true,
	                template: __webpack_require__(20),
	                controller: 'UserAddCtrl',
	                controllerAs: 'vmAdd',
	                resolve: {
	                    dashboards: angular.bind(this, this.getDashboards),
	                    user: function user() {
	                        return {};
	                    },
	                    saveMethod: function saveMethod() {
	                        return angular.bind(_this3._api, _this3._api.addUser);
	                    }
	                },
	                size: 'md'
	            }).result.then(function (data) {
	                _this3.users.push(data);
	            });
	        }
	    }, {
	        key: 'edit',
	        value: function edit(index) {
	            var _this4 = this;

	            this._modal.open({
	                animation: true,
	                template: __webpack_require__(20),
	                controller: 'UserAddCtrl',
	                controllerAs: 'vmAdd',
	                resolve: {
	                    dashboards: angular.bind(this, this.getDashboards),
	                    user: function user() {
	                        return _this4.users[index];
	                    },
	                    saveMethod: function saveMethod() {
	                        return angular.bind(_this4._api, _this4._api.editUser);
	                    }
	                },
	                size: 'md'
	            }).result.then(function (data) {
	                _this4.users.splice(index, 1, data);
	            });
	        }
	    }]);

	    return UsersController;
	}();

	UsersController.$inject = ['$uibModal', 'GlobalApiService'];

	exports.default = UsersController;

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = "<div style=\"padding: 20px;\">\n    <h3 ng-bind='vmAdd.isNew ? \"Добавление пользователя\" : \"Редактирование пользователя (\" + vmAdd.user.email + \")\"'></h3>\n    <form ng-submit=\"vmAdd.save(addForm)\" name=\"addForm\">\n        <div class=\"form-group\">\n            <label>Имя: </label>\n            <input type=\"text\" ng-model=\"vmAdd.user.username\" class=\"form-control\">\n        </div>\n        <div class=\"form-group ng-hide\" ng-show=\"vmAdd.isNew\">\n            <label>E-mail: </label>\n            <input type=\"email\" ng-model=\"vmAdd.user.email\" class=\"form-control\">\n        </div>\n        <div>\n            <p>Доступ к дашбордам:</p>\n            <ul class=\"list-unstyled\">\n                <li ng-repeat=\"dashboard in vmAdd.dashboards track by $index\">\n                    <div class=\"checkbox\">\n                    <label><input type=\"checkbox\" ng-model=\"dashboard.selected\"> {{dashboard.name}}</label>\n                    </div>\n                </li>\n            </ul>\n        </div>\n        <div class=\"text-center\">\n            <button type=\"submit\" class=\"btn btn-default\">Сохранить</button>\n        </div>\n    </form>\n</div>"

/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var UserAddCtrl = function () {
	    function UserAddCtrl($uibModalInstance, dashboards, user, saveMethod) {
	        var _this = this;

	        _classCallCheck(this, UserAddCtrl);

	        this._modalInstance = $uibModalInstance;
	        this.saveMethod = saveMethod;

	        this.user = _.cloneDeep(user);
	        this.dashboards = _.cloneDeep(dashboards);

	        this.user.permissions = this.user.permissions || [];
	        _.each(this.dashboards, function (d) {
	            if (_this.user.permissions.indexOf(d.id) > -1) {
	                d.selected = true;
	            }
	        });

	        this.isNew = !this.user.email;
	    }

	    _createClass(UserAddCtrl, [{
	        key: 'save',
	        value: function save() {
	            var _this2 = this;

	            this.user.permissions = _.map(_.filter(this.dashboards, function (d) {
	                return d.selected;
	            }), function (d) {
	                return d.id;
	            });
	            console.log(this.user.permissions);
	            this.saveMethod(this.user).then(function (data) {
	                _this2._modalInstance.close(data.data);
	            }, function (err) {
	                alert("Ошибка сохранения");
	            });
	        }
	    }]);

	    return UserAddCtrl;
	}();

	UserAddCtrl.$inject = ['$uibModalInstance', 'dashboards', 'user', 'saveMethod'];

	exports.default = UserAddCtrl;

/***/ }
/******/ ]);