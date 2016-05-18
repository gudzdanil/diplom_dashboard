function routing($stateProvider, $urlRouterProvider) {
    $urlRouterProvider
        .otherwise('/#');

    $stateProvider
        .state('login', {
            url: '/login',
            controller: 'LoginCtrl',
            controllerAs: 'vmLogin',
            template: require('./auth/login/login.html'),
            ncyBreadcrumb: {
                label: 'Авторизация'
            }
        })
        .state('register', {
            parent: 'global',
            url: '/register',
            controller: 'RegisterCtrl',
            controllerAs: 'vmRegister',
            template: require('./auth/register/register.html'),
            ncyBreadcrumb: {
                label: 'Регистрация'
            }
        })
        .state('global', {
            abstract: true,
            template: require('./main/global.html'),
            controller: 'GlobalCtrl',
            controllerAs: 'vmGlobal'
        })
        .state('home', {
            parent: 'global',
            url: '/',
            controller: 'HomeCtrl',
            controllerAs: 'vmHome',
            template: require('./main/home/home.html'),
            data: {
                permission: ['ADMIN', 'USER']
            },
            ncyBreadcrumb: {
                label: 'Главная'
            }
        })
        .state('connection', {
            parent: 'global',
            url: '/connection',
            controller: 'ConnectionCtrl',
            controllerAs: 'vmConnection',
            template: require('./main/connection/connection.html'),
            data: {
                permission: ['ADMIN', 'USER']
            },
            ncyBreadcrumb: {
                label: 'Создать соединение'
            }
        })
        .state('graphics', {
            parent: 'global',
            url: '/graphics',
            controller: 'GraphicsCtrl',
            controllerAs: 'vmGraph',
            template: require('./main/infographics/infograph.html'),
            data: {
                permission: ['ADMIN', 'USER']
            },
            ncyBreadcrumb: {
                label: 'Управление инфорграфикой'
            }
        });
}

routing.$inject = ['$stateProvider', '$urlRouterProvider'];

export default routing;