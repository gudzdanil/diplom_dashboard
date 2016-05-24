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

        //
        // this.graphs = [{
        //     labels: ["January", "February", "March", "April", "May", "June", "July"],
        //     series: ['Series A', 'Series B'],
        //     data: [
        //         [65, 59, 80, 81, 56, 55, 40],
        //         [28, 48, 40, 19, 86, 27, 90]
        //     ]
        // },{
        //     labels: ["Download Sales", "In-Store Sales", "Mail-Order Sales"],
        //     data: [300, 500, 100]
        // },{
        //     labels: ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"],
        //     data: [300, 500, 100, 40, 120]
        // },{
        //     labels: ["January", "February", "March", "April", "May", "June", "July"],
        //     series: ['Series A', 'Series B'],
        //     data: [
        //         [65, 59, 80, 81, 56, 55, 40],
        //         [28, 48, 40, 19, 86, 27, 90]
        //     ]
        // }];

        // this.onClick = function (points, evt) {
        //     console.log(points, evt);
        // };
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