class RegisterController {
    constructor(UserService, $state) {
        this._service = UserService;
        this._state = $state;
        this.userdata = {};
    }

    register(form) {
        if(form.$valid) {
            this._service.register(this.userdata).then((user) => {
                if(user.role) {
                    this._state.go('home');
                }
            });
        }
    }
}

RegisterController.$inject = ['UserService', '$state'];

export default RegisterController;