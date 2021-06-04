import { Component, OnInit, OnDestroy, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { DataListService } from '../../shared/data-list/data-list.service';
import { NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';

@Component({
    selector: 'app-review-result',
    templateUrl: './review-result.component.html',
    styleUrls: ['./review-result.component.scss']
})
export class ReviewResultComponent implements OnInit, OnDestroy {

    errorMessage: string;
    data: any = {
        "sum": {
            "min": "",
            "max": "",
            "mean": "",
            "median": "",
            "variance": ""
        },
        "per": [
            {
                "channel": "",
                "min": "",
                "max": "",
                "Mean": "",
                "Average": "",
                "percentage": ""
            }]
    };

    months: any = {
        "selected": 9,
        "options": [9, 6, 3, 1]
    };

    validations: any = {
        "selected": "Select",
        "options": []
    };

    //dotcolor some default color and if the dataset.length> 4 then add random color automatically.
    colors: any[] = ["#006BD5", "#F5A623", "#7ED321", "#DD4D25"];
    dotCurrentColor: string = this.colors[0];
    dotid = 0;

    //for apply button
    processing = false;
    i: any = {
        "channel": "",
        "min": "",
        "max": "",
        "mean": "",
        "average": "",
        "percentage": "",
        "report": {
            "rows": 0,
            "original": 0,
            "final": 0
        }
    };
    // In Angular 8 , ViewChild takes 2 parameters
    @ViewChild('sosModal', { static: false }) sosModal;
    modalRef: NgbModalRef;


    // lineChart
    showChart = false;
    public lineChartData: Array<any> = [];
    public lineChartLabels: Array<any> = [];
    public lineChartOptions: any = {
        responsive: true,
        legend: {
            display: true,
            position: 'bottom'
        },
        tooltips: {
            mode: 'index',
        },
        hover: {
            mode: 'index'
        },
        scales: {
            xAxes: [
                {
                    position: 'top',
                    scaleLabel: {
                        display: true,
                        labelString: 'Time in Months'
                    },
                    gridLines: {
                        drawBorder: false
                    },
                    ticks: {
                        maxTicksLimit: 10
                    }
                }],
            yAxes: [
                {
                    scaleLabel: {
                        display: true,
                        labelString: 'Channel Value'
                    }
                }]
        }
    };
    public lineChartColors: Array<any> = [];
    public lineChartLegend: boolean = true;
    public lineChartType: string = 'line';
    /**
     * Creates an instance of the ProfilesComponent with the injected
     * NameListService.
     *
     * @param {DataListService} dataListService - The injected DataListService.
     */
    constructor(
        private modalService: NgbModal,
        private dataListServices: DataListService
    ) { }

    /**
     * Get the dataList OnInit
     */
    ngOnInit() {
        this.getDataList('../../assets/data/dataReviewResult.json');
    }

    ngOnDestroy() {
        if (this.modalRef !== undefined) {
            this.modalRef.close();
        }
    }

    initData() {
        this.setColors();
        let options = [];
        let _ = this;
        this.data["per"].forEach(function (item, index) {
            options.push(item["channel"]);
            ///MockData
            _.mockData(item["data"]);
        });
        this.validations["options"] = options;
        this.getChartdata();
    }

    //Mock Data Time
    mockData(dateTimeOriginal : any[]) {
        var dt = new Date();
        var dt0 = new Date(dateTimeOriginal[0]["date"]);
        var interval = - Math.floor((dt0.getTime() - dt.getTime()) / 1000 / 60 / 60 / 24);//unit:day
        dateTimeOriginal.forEach(function (item, index) {
            dateTimeOriginal[index]["date"] = moment(item["date"]).add(interval, 'day').format("YYYY-M-DD");
        });
    }

    getChartdata() {
        var end = new Date();
        var begin = new Date(this.GetDateStr(0 -
            this.months["selected"] * 30));
        this.lineChartData = [];
        this.lineChartLabels = [];
        this.lineChartColors = [];
        let tmplineChartData = [];
        let tmplineChartLabels = [];
        let tmplineChartColors = [];
        let tmpcolors = this.colors;
        this.data["per"].forEach(function (item, index) {
            var tmpData = { "data": [], "label": item["channel"] };
            item["data"].forEach(function (item2, index2) {
                var date = new Date(item2["date"]);
                if (date >= begin && date <= end) {
                    tmpData["data"].push(item2["amount"]);
                    if (index === 0) {
                        tmplineChartLabels.push(item2["date"]);
                    }
                }
            });
            tmplineChartData.push(tmpData);
            var tmpColor = {
                backgroundColor: 'rgba(255,255,255,0)',
                borderColor: tmpcolors[index],
                pointBackgroundColor: tmpcolors[index],
                pointBorderColor: tmpcolors[index],
                pointHoverBackgroundColor: tmpcolors[index],
                pointHoverBorderColor: tmpcolors[index]
            };
            tmplineChartColors.push(tmpColor);

        });
        this.lineChartData = tmplineChartData;
        this.lineChartLabels = tmplineChartLabels;
        this.lineChartColors = tmplineChartColors;
        //console.log(this.lineChartData);
        //console.log(tmplineChartLabels);
        //console.log(tmplineChartColors);
        this.refreshChart();
    }

    GetDateStr(AddDayCount) {
        var dd = new Date();
        dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期  
        var y = dd.getFullYear();
        var m = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1);//获取当前月份的日期，不足10补0  
        var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();//获取当前几号，不足10补0  
        return y + "-" + m + "-" + d;
    }

    //function to get random colors
    public getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    //function to set a new random color
    setColors() {
        for (var i = 4; i < this.data["per"].length; i++) {
            this.colors.push(this.getRandomColor());
        }
    }

    //create dot color Array
    getDotColorbyID(id) {
        return this.colors[id];
    }

    validationSelected(i, id) {
        this.validations.selected = i;
        this.dotid = id;
        this.dotCurrentColor = this.colors[id];
    }


    apply() {
        setTimeout(() => {
            this.i = this.data["per"][this.dotid];
            this.processing = false;
            this.openModal(this.sosModal);
        }, 1000);
        this.processing = true;
    }


    refreshChart() {
        setTimeout(() => {
            this.showChart = true;
        }, 100);
        this.showChart = false;
    }

    /**
     * Handle the dataListService observable
     */
    getDataList(jsonUrl) {
        this.dataListServices.get(jsonUrl)
            .subscribe(
            data => this.data = data,
            error => this.errorMessage = <any>error,
            () => this.initData()
            );
    }


    // Open modal
    openModal(content) {
        this.modalRef = this.modalService.open(content, { windowClass: 'review-modal' });
    }


    // events
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }

}
