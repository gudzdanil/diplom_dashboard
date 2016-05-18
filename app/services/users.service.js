class User {
    constructor (userData = {}) {
        this.update(userData);
    }

    update({username = "username", email, role, id}) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.role = role;
        return this;
    }
}

class UserService {
    constructor(api, AUTH, $q) {
        this._q = $q;
        this._auth = AUTH;
        this._api = api;
        this._user = new User();
    }

    get user() {
        if(this._user.role) {
            return this._user;
        }
        return this._api.current().then((data) => {
            return this._user.update(data);
        });
    }

    login(userData) {
        return this._api.login(userData).then((data) => {
            if(data.status < 400) {
                this._auth.token = data.data.auth_token;
                return this._api.current().then((user) => {
                    return this._user.update(user.data);
                });
            }
            return this._q.reject();
        })
    }

    logout() {
        return this._api.logout().then((data) => {
            this._auth.token = null;
            return this._user.update({});
        });
    }

    register(data) {
        return this._api.register(data).then((userData) => {
            return this._user.update(userData);
        });
    }
}

UserService.$inject = ['UsersApiService', 'AUTH', '$q'];

export default UserService;