class LoginController {
    constructor(UserService, $state) {
        this._service = UserService;
        this._state = $state;
        
        this.userdata = {};
    }

    login(form) {
        if(form.$valid) {
            this._service.login(this.userdata).then((data) => {
                this._state.go('home');
            });
        }
    }
}

LoginController.$inject = ['UserService', '$state'];

export default LoginController;