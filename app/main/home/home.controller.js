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