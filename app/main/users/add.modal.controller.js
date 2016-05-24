class UserAddCtrl {
    constructor($uibModalInstance, dashboards, user, saveMethod) {
        this._modalInstance = $uibModalInstance;
        this.saveMethod = saveMethod;

        this.user = _.cloneDeep(user);
        this.dashboards = _.cloneDeep(dashboards);

        this.user.permissions = this.user.permissions || [];
        _.each(this.dashboards, (d) => {
            if(this.user.permissions.indexOf(d.id) > -1) {
                d.selected = true;
            }
        });

        this.isNew = !this.user.email;
    }

    save() {
        this.user.permissions = _.map(_.filter(this.dashboards, (d) => d.selected), (d) => d.id);
        console.log(this.user.permissions);
        this.saveMethod(this.user).then(data => {
            this._modalInstance.close(data.data);
        }, (err) => {
            alert("Ошибка сохранения");
        });
    }
}

UserAddCtrl.$inject = ['$uibModalInstance', 'dashboards', 'user', 'saveMethod'];

export default UserAddCtrl;