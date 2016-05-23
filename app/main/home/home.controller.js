class HomeController {
    constructor() {
        this.graphs = [{
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            series: ['Series A', 'Series B'],
            data: [
                [65, 59, 80, 81, 56, 55, 40],
                [28, 48, 40, 19, 86, 27, 90]
            ]
        },{
            labels: ["Download Sales", "In-Store Sales", "Mail-Order Sales"],
            data: [300, 500, 100]
        },{
            labels: ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"],
            data: [300, 500, 100, 40, 120]
        },{
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            series: ['Series A', 'Series B'],
            data: [
                [65, 59, 80, 81, 56, 55, 40],
                [28, 48, 40, 19, 86, 27, 90]
            ]
        },{
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            series: ['Series A', 'Series B'],
            data: [
                [65, 59, 80, 81, 56, 55, 40],
                [28, 48, 40, 19, 86, 27, 90]
            ]
        },{
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            series: ['Series A', 'Series B'],
            data: [
                [65, 59, 80, 81, 56, 55, 40],
                [28, 48, 40, 19, 86, 27, 90]
            ]
        }];

        this.onClick = function (points, evt) {
            console.log(points, evt);
        };
    }
    
}

HomeController.$inject = [];

export default HomeController;