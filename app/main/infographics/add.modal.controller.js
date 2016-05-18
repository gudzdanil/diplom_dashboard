class InfoGraphAddCtrl {
    constructor($uibModalInstance, graph, types, saveMethod) {
        this._modalInstance = $uibModalInstance;
        this.saveMethod = saveMethod;

        this.graph = angular.copy(graph);
        this.types = types;
    }

    save() {
        this.saveMethod(this.graph).then(data => {
            this._modalInstance.close(data.data);
        }, (err) => {
            alert("Ошибка сохранения");
        });
    }
}

InfoGraphAddCtrl.$inject = ['$uibModalInstance', 'graph', 'types', 'saveMethod'];

export default InfoGraphAddCtrl;