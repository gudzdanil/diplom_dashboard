import router from './router';
import config from './config';

import usersApi from './services/users.api.service';
import users from './services/users.service';
import globalApi from './services/global.api.service';

import loginCtrl from './auth/login/login.controller';
import regCtrl from './auth/register/register.controller';
import globalCtrl from './main/global.controller';
import homeCtrl from './main/home/home.controller';
import connectionCtrl from './main/connection/connection.controller';
import graphCtrl from './main/infographics/infograph.controller';
import graphAddCtrl from './main/infographics/add.modal.controller';

angular.module('dp', ['ui.router', 'ui.bootstrap', 'chart.js'])
    .constant('AUTH', {
        set token(token) {
            this._token = token;
            window.sessionStorage.setItem('diplom_auth', angular.toJson({token: token}));
        },
        get token() {
            if (this._token) {
                return this._token;
            }
            let auth = angular.fromJson(window.sessionStorage.getItem('diplom_auth'));
            return auth && auth.token;
        }
    })
    .config(config)
    .config(router)
    .run(['$rootScope', '$state', function ($rootScope, $state) {
        $rootScope.$on('logout', () => {
            $state.go('login');
        });
    }])
    .constant('API_URL', 'http://almost-bachelor.herokuapp.com/')
    .service('UsersApiService', usersApi)
    .service('UserService', users)
    .service('GlobalApiService', globalApi)

    .controller('LoginCtrl', loginCtrl)
    .controller('RegisterCtrl', regCtrl)
    .controller('GlobalCtrl', globalCtrl)
    .controller('ConnectionCtrl', connectionCtrl)
    .controller('HomeCtrl', homeCtrl)
    .controller('GraphAddCtrl', graphAddCtrl)
    .controller('GraphicsCtrl', graphCtrl);