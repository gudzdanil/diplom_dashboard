class HomeController {
    constructor(GlobalApiService, $scope, $q) {
        this._api = GlobalApiService;
        this._q = $q;
        this._scope = $scope;

        this.getDashboards();
        this.activeTab = 0;

        this._scope.$watch(() => this.activeTab, (activeTab) => {
            this.getData();
        });
    }

    getDashboards() {
        this._api.getDashboards().then((data) => {
            this.dashboards = data.data.results;
            this.getData();
        });
    }

    getData() {
        if(this.dashboards && this.dashboards.length) {
            this.loading = true;
            this.graphs = [];
            this._api.getDashboardData(this.dashboards[this.activeTab].id).then((data) => {
                this.graphs = data.data.results;
                this.loading = false;
            });
        }
    }

    makeScreen() {
        return this._q((resolve, reject) => {
            html2canvas($('.tab-pane.active').get(0), {
                onrendered: function(canvas) {
                    resolve(canvas);
                }
            });
        })
    }

    saveAsJPEG() {
        this.makeScreen().then((canvas) => {
            var el = document.createElement('a');
            el.href = canvas.toDataURL('image/jpeg');
            el.download = "infographics.jpeg";
            el.click();
        });
    }

    saveAsPDF() {
        this.makeScreen().then((canvas) => {
            var imgData = canvas.toDataURL("image/jpeg", 1.0);
            var pdf = new jsPDF();

            pdf.addImage(imgData, 'JPEG', 0, 0);
            var download = document.getElementById('download');

            pdf.save("infographics.pdf");

        });
    }

}

HomeController.$inject = ['GlobalApiService', '$scope', '$q'];

export default HomeController;