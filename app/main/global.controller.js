class GlobalController {
    constructor(UserService, $state, $scope) {
        this._state = $state;
        this._userService = UserService;
        UserService.user.then(user => {this.user = user;});

    }

    logout() {
        this._userService.logout().then(() => {
            this._state.go('login');
        });
    }
    
}

GlobalController.$inject = ['UserService', '$state', '$scope'];

export default GlobalController;