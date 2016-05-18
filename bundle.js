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

	var _register = __webpack_require__(13);

	var _register2 = _interopRequireDefault(_register);

	var _global = __webpack_require__(14);

	var _global2 = _interopRequireDefault(_global);

	var _home = __webpack_require__(15);

	var _home2 = _interopRequireDefault(_home);

	var _connection = __webpack_require__(16);

	var _connection2 = _interopRequireDefault(_connection);

	var _infograph = __webpack_require__(17);

	var _infograph2 = _interopRequireDefault(_infograph);

	var _addModal = __webpack_require__(19);

	var _addModal2 = _interopRequireDefault(_addModal);

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
	}]).constant('API_URL', 'http://almost-bachelor.herokuapp.com/').service('UsersApiService', _usersApi2.default).service('UserService', _users2.default).service('GlobalApiService', _globalApi2.default).controller('LoginCtrl', _login2.default).controller('RegisterCtrl', _register2.default).controller('GlobalCtrl', _global2.default).controller('ConnectionCtrl', _connection2.default).controller('HomeCtrl', _home2.default).controller('GraphAddCtrl', _addModal2.default).controller('GraphicsCtrl', _infograph2.default);

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
	    }).state('register', {
	        parent: 'global',
	        url: '/register',
	        controller: 'RegisterCtrl',
	        controllerAs: 'vmRegister',
	        template: __webpack_require__(3),
	        ncyBreadcrumb: {
	            label: 'Регистрация'
	        }
	    }).state('global', {
	        abstract: true,
	        template: __webpack_require__(4),
	        controller: 'GlobalCtrl',
	        controllerAs: 'vmGlobal'
	    }).state('home', {
	        parent: 'global',
	        url: '/',
	        controller: 'HomeCtrl',
	        controllerAs: 'vmHome',
	        template: __webpack_require__(5),
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
	        template: __webpack_require__(6),
	        data: {
	            permission: ['ADMIN', 'USER']
	        },
	        ncyBreadcrumb: {
	            label: 'Создать соединение'
	        }
	    }).state('graphics', {
	        parent: 'global',
	        url: '/graphics',
	        controller: 'GraphicsCtrl',
	        controllerAs: 'vmGraph',
	        template: __webpack_require__(7),
	        data: {
	            permission: ['ADMIN', 'USER']
	        },
	        ncyBreadcrumb: {
	            label: 'Управление инфорграфикой'
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

	module.exports = "<form ng-submit=\"vm.register(regForm)\" name=\"regForm\" class=\"form\">\n    <h2 class=\"text-center\">Авторизироваться</h2>\n    <div class=\"form-group\">\n        <label for=\"email\">Email</label>\n        <input type=\"email\" class=\"form-control\" required ng-model=\"vm.userdata.email\" id=\"email\"/>\n    </div>\n    <div class=\"form-group\">\n        <label for=\"password\">Пароль</label>\n        <input type=\"email\" class=\"form-control\" required ng-model=\"vm.userdata.password\" id=\"password\"/>\n    </div>\n    <div class=\"text-center\">\n        <input type=\"submit\" value=\"Зарегистрироваться\">\n    </div>\n</form>"

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = "<header>\n    <nav class=\"navbar navbar-default\">\n        <div class=\"container-fluid\">\n            <!-- Brand and toggle get grouped for better mobile display -->\n            <div class=\"navbar-header\">\n                <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\"\n                        data-target=\"#bs-example-navbar-collapse-1\" aria-expanded=\"false\">\n                    <span class=\"sr-only\">Toggle navigation</span>\n                    <span class=\"icon-bar\"></span>\n                    <span class=\"icon-bar\"></span>\n                    <span class=\"icon-bar\"></span>\n                </button>\n                <a class=\"navbar-brand\" href=\"#\">Dashboard</a>\n            </div>\n\n            <!-- Collect the nav links, forms, and other content for toggling -->\n            <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\n                <ul class=\"nav navbar-nav\">\n                    <li ui-sref-active=\"active\"><a href=\"\" ui-sref=\"home\">Главная</a></li>\n                    <li ui-sref-active=\"active\"><a href=\"\" ui-sref=\"connection\">Соединение</a></li>\n                    <li ui-sref-active=\"active\"><a href=\"\" ui-sref=\"graphics\">Настройка</a></li>\n                </ul>\n                <ul class=\"nav navbar-nav navbar-right\">\n                    <li><a href=\"\" ng-bind=\"vmGlobal.user.username\"></a></li>\n                    <li><a href=\"\" ng-click=\"vmGlobal.logout()\">Выйти</a></li>\n                </ul>\n            </div><!-- /.navbar-collapse -->\n        </div><!-- /.container-fluid -->\n    </nav>\n</header>\n<main>\n    <div class=\"container\" ui-view></div>\n</main>\n<!--<footer>-->\n    <!--<nav class=\"navbar navbar-default\">-->\n        <!--<div class=\"container\">-->\n            <!--...-->\n        <!--</div>-->\n    <!--</nav>-->\n<!--</footer>-->"

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = "<div class=\" col-md-4 col-sm-6 col-xs-12\" ng-repeat=\"graph in vmHome.graphs track by $index\">\n    <canvas id=\"line\" class=\"chart chart-line\" chart-data=\"graph.data\"\n            chart-labels=\"graph.labels\" chart-legend=\"true\" chart-series=\"graph.series\"\n            chart-click=\"vmHome.onClick\">\n    </canvas>\n</div>"

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = "<form ng-submit=\"vmConnection.connect(connectionForm)\" name=\"connectionForm\">\n    <div class=\"form-group\">\n        <label for=\"db_host\">Хост базы данных</label>\n        <input type=\"text\" ng-model=\"vmConnection.connectiondata.host\" class=\"form-control\" id=\"db_host\"  placeholder=\"http://my.db/123\">\n    </div>\n    <div class=\"form-group\">\n        <label for=\"db_port\">Порт</label>\n        <input type=\"number\"  ng-model=\"vmConnection.connectiondata.port\" class=\"form-control\" id=\"db_port\" placeholder=\"8080\">\n    </div>\n    <div class=\"form-group\">\n        <label for=\"db_user\">Имя пользователя</label>\n        <input type=\"text\" class=\"form-control\" ng-model=\"vmConnection.connectiondata.username\" id=\"db_user\" placeholder=\"admin\">\n    </div>\n    <div class=\"form-group\">\n        <label for=\"db_pass\">Пароль</label>\n        <input type=\"password\" class=\"form-control\" ng-model=\"vmConnection.connectiondata.password\" id=\"db_pass\" placeholder=\"пароль\">\n    </div>\n    <div class=\"form-group\">\n        <label for=\"db_name\">Имя базы данных</label>\n        <input type=\"text\" class=\"form-control\" ng-model=\"vmConnection.connectiondata.db_name\" id=\"db_name\" placeholder=\"main\">\n    </div>\n    <div class=\"text-center\">\n        <button class=\"btn btn-default\" type=\"submit\">Создать соединение</button>\n    </div>\n</form>"

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = "<ul class=\"list-unstyled clearfix\">\n    <li ng-repeat=\"graph in vmGraph.graphs track by $index\">\n        <div class=\"col-md-8\">\n            <dl class=\"dl-horizontal\">\n                <dt>Запрос</dt>\n                <dd ng-bind=\"graph.query\"></dd>\n            </dl>\n            <dl class=\"dl-horizontal\">\n                <dt>Тип</dt>\n                <dd ng-bind=\"vmGraph.types[graph.diagram_type]\"></dd>\n            </dl>\n        </div>\n        <div class=\"col-md-4\">\n            <button ng-click=\"vmGraph.edit($index)\" class=\"btn btn-default\">Редактировать</button>\n        </div>\n    </li>\n</ul>\n<div class=\"text-center\">\n    <button ng-click=\"vmGraph.add()\" class=\"btn btn-default\">Добавить</button>\n</div>\n"

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
	    }, {
	        key: 'register',
	        value: function register(data) {
	            return this._http.post(this._baseUrl + 'register/', data);
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
	        key: 'register',
	        value: function register(data) {
	            var _this3 = this;

	            return this._api.register(data).then(function (userData) {
	                return _this3._user.update(userData);
	            });
	        }
	    }, {
	        key: 'user',
	        get: function get() {
	            var _this4 = this;

	            if (this._user.role) {
	                return this._user;
	            }
	            return this._api.current().then(function (data) {
	                return _this4._user.update(data);
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
	        key: 'connectToDB',
	        value: function connectToDB(data) {
	            return this._http.post(this._baseUrl + 'remote-db/', data);
	        }
	    }, {
	        key: 'getGraphs',
	        value: function getGraphs() {
	            return this._http.get(this._baseUrl + 'widgets/');
	        }
	    }, {
	        key: 'addGraph',
	        value: function addGraph(data) {
	            return this._http.post(this._baseUrl + 'widgets/', data);
	        }
	    }, {
	        key: 'editGraph',
	        value: function editGraph(data) {
	            return this._http.put(this._baseUrl + 'widgets/' + data.id, data);
	        }
	    }, {
	        key: 'getGraphTypes',
	        value: function getGraphTypes() {
	            return this._http.get(this._baseUrl + 'api/diagram-types');
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

	var RegisterController = function () {
	    function RegisterController(UserService, $state) {
	        _classCallCheck(this, RegisterController);

	        this._service = UserService;
	        this._state = $state;
	        this.userdata = {};
	    }

	    _createClass(RegisterController, [{
	        key: 'register',
	        value: function register(form) {
	            var _this = this;

	            if (form.$valid) {
	                this._service.register(this.userdata).then(function (user) {
	                    if (user.role) {
	                        _this._state.go('home');
	                    }
	                });
	            }
	        }
	    }]);

	    return RegisterController;
	}();

	RegisterController.$inject = ['UserService', '$state'];

	exports.default = RegisterController;

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GlobalController = function () {
	    function GlobalController(UserService, $state, $scope) {
	        var _this = this;

	        _classCallCheck(this, GlobalController);

	        this._state = $state;
	        this._userService = UserService;
	        UserService.user.then(function (user) {
	            _this.user = user;
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

	GlobalController.$inject = ['UserService', '$state', '$scope'];

	exports.default = GlobalController;

/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var HomeController = function HomeController() {
	    _classCallCheck(this, HomeController);

	    this.graphs = [{
	        labels: ["January", "February", "March", "April", "May", "June", "July"],
	        series: ['Series A', 'Series B'],
	        data: [[65, 59, 80, 81, 56, 55, 40], [28, 48, 40, 19, 86, 27, 90]]
	    }, {
	        labels: ["January", "February", "March", "April", "May", "June", "July"],
	        series: ['Series A', 'Series B'],
	        data: [[65, 59, 80, 81, 56, 55, 40], [28, 48, 40, 19, 86, 27, 90]]
	    }, {
	        labels: ["January", "February", "March", "April", "May", "June", "July"],
	        series: ['Series A', 'Series B'],
	        data: [[65, 59, 80, 81, 56, 55, 40], [28, 48, 40, 19, 86, 27, 90]]
	    }, {
	        labels: ["January", "February", "March", "April", "May", "June", "July"],
	        series: ['Series A', 'Series B'],
	        data: [[65, 59, 80, 81, 56, 55, 40], [28, 48, 40, 19, 86, 27, 90]]
	    }, {
	        labels: ["January", "February", "March", "April", "May", "June", "July"],
	        series: ['Series A', 'Series B'],
	        data: [[65, 59, 80, 81, 56, 55, 40], [28, 48, 40, 19, 86, 27, 90]]
	    }, {
	        labels: ["January", "February", "March", "April", "May", "June", "July"],
	        series: ['Series A', 'Series B'],
	        data: [[65, 59, 80, 81, 56, 55, 40], [28, 48, 40, 19, 86, 27, 90]]
	    }];

	    this.onClick = function (points, evt) {
	        console.log(points, evt);
	    };
	};

	HomeController.$inject = [];

	exports.default = HomeController;

/***/ },
/* 16 */
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
	    }

	    _createClass(ConnectionController, [{
	        key: 'connect',
	        value: function connect(form) {
	            if (form.$valid) {
	                this._api.connectToDB(this.connectiondata).then(function (data) {
	                    if (data.status < 400) {
	                        alert('Соединение создано');
	                    }
	                });
	            }
	        }
	    }]);

	    return ConnectionController;
	}();

	ConnectionController.$inject = ['GlobalApiService'];

	exports.default = ConnectionController;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var InfoGraphCtrl = function () {
	    function InfoGraphCtrl(GlobalApiService, $uibModal) {
	        var _this = this;

	        _classCallCheck(this, InfoGraphCtrl);

	        this._api = GlobalApiService;
	        this._modal = $uibModal;

	        this.graphs = [];

	        this._api.getGraphs().then(function (data) {
	            _this.graphs = data.data.results;
	        });

	        this._api.getGraphTypes().then(function (data) {
	            _this.types = data.data;
	        });
	    }

	    _createClass(InfoGraphCtrl, [{
	        key: 'add',
	        value: function add() {
	            var _this2 = this;

	            this._modal.open({
	                animation: true,
	                template: __webpack_require__(18),
	                controller: 'GraphAddCtrl',
	                controllerAs: 'vmAdd',
	                resolve: {
	                    types: function types() {
	                        return _this2.types;
	                    },
	                    graph: function graph() {
	                        return {};
	                    },
	                    saveMethod: function saveMethod() {
	                        return angular.bind(_this2._api, _this2._api.addGraph);
	                    }
	                },
	                size: 'md'
	            }).result.then(function (data) {
	                _this2.graphs.push(data);
	            });
	        }
	    }, {
	        key: 'edit',
	        value: function edit(index) {
	            var _this3 = this;

	            this._modal.open({
	                animation: true,
	                template: __webpack_require__(18),
	                controller: 'GraphAddCtrl',
	                controllerAs: 'vmAdd',
	                resolve: {
	                    types: function types() {
	                        return _this3.types;
	                    },
	                    graph: function graph() {
	                        return _this3.graphs[index];
	                    },
	                    saveMethod: function saveMethod() {
	                        return angular.bind(_this3._api, _this3._api.editGraph);
	                    }
	                },
	                size: 'md'
	            }).result.then(function (data) {
	                _this3.graphs.splice(index, 1, data);
	            });
	        }
	    }]);

	    return InfoGraphCtrl;
	}();

	InfoGraphCtrl.$inject = ['GlobalApiService', '$uibModal'];

	exports.default = InfoGraphCtrl;

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = "<div style=\"padding: 20px;\">\n    <form ng-submit=\"vmAdd.save(addForm)\" name=\"addForm\">\n        <div class=\"row\">\n            <div class=\"form-group col-sm-8\">\n                <label>Запрос</label>\n                <input type=\"text\" ng-model=\"vmAdd.graph.query\" class=\"form-control\">\n            </div>\n            <div class=\"col-sm-4\">\n                <label>Тип</label>\n                <select class=\"form-control\" ng-model=\"vmAdd.graph.diagram_type\"\n                        ng-options=\"key as value for (key, value) in vmAdd.types\"></select>\n            </div>\n        </div>\n        <div class=\"text-center\">\n            <button type=\"submit\" class=\"btn btn-default\">Сохранить</button>\n        </div>\n    </form>\n</div>"

/***/ },
/* 19 */
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

/***/ }
/******/ ]);