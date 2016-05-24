class GlobalController {
    constructor(UserService, $state, GlobalApiService) {
        this._state = $state;
        this._api = GlobalApiService;
        this._userService = UserService;

        UserService.user.then(user => {this.user = user;});
        this.noConnection = true;

        this._api.getConnections().then((resp) => {
             if(!resp.data.results || !resp.data.results.length) {
                 return (this.noConnection = true);
             }
            this.noConnection = false;
        });
    }

    logout() {
        this._userService.logout().then(() => {
            this._state.go('login');
        });
    }
    
}

GlobalController.$inject = ['UserService', '$state', 'GlobalApiService'];

export default GlobalController;