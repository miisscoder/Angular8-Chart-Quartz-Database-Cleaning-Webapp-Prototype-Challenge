import { Component, OnInit, OnDestroy, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { DataListService } from '../../shared/data-list/data-list.service';

@Component({
    selector: 'app-summary-card',
    templateUrl: './summary-card.component.html',
    styleUrls: ['./summary-card.component.scss']
})
export class SummaryCardComponent implements OnInit, OnDestroy {

    errorMessage: string;
    data: any = {};
    options: any[] = [];
    duration: string = '';
    showChart: boolean = false;
    total: Number = 0;
    records: Number = 0;
    manual: Number = 0;
    // Doughnut Chart
    doughnutChartType: string = 'doughnut';
    doughnutChartData: any[] = [{ data: [10, 10] }, { data: [10, 10] }, { data: [10, 10] }];
    public doughnutChartColors = [
        {
            'backgroundColor': ['rgba(248, 248, 248, 1)', 'rgba(0, 107, 213, 1)'],
            'borderWidth': [4, 4],
            'borderColor': ['#ffffff', '#ffffff']
        },
        {
            'backgroundColor': ['rgba(248, 248, 248, 1)', 'rgba(126, 211, 33, 1)'],
            'borderWidth': [4, 4],
            'borderColor': ['#ffffff', '#ffffff']
        },
        {
            'backgroundColor': ['rgba(248, 248, 248, 1)', 'rgba(245, 166, 35, 1)'],
            'borderWidth': [4, 4],
            'borderColor': ['#ffffff', '#ffffff']
        }
    ];

    /**
     * Creates an instance of the ProfilesComponent with the injected
     * NameListService.
     *
     * @param {DataListService} dataListService - The injected DataListService.
     */
    constructor(
        private dataListServices: DataListService
    ) { }

    /**
     * Get the dataList OnInit
     */
    ngOnInit() {
        this.getDataList('../../assets/data/dataSummary.json');
    }

    ngOnDestroy() {

    }

    initData() {
        this.options = this.data["options"];
        this.duration = this.data["duration"];
        this.total = this.data["total"].amount;
        this.records = this.data["records"].amount;
        this.manual = this.data["manual"].amount;

        this.doughnutChartData.length = 0;
        this.doughnutChartData.push({
            'data': [this.data["total"].amount * (1 - this.data["total"].percent), this.data["total"].amount],
        });
        this.doughnutChartData.push({
            'data': [this.data["records"].amount * (1 - this.data["records"].percent), this.data["records"].amount],
        });
        this.doughnutChartData.push({
            'data': [this.data["manual"].amount * (1 - this.data["manual"].percent), this.data["manual"].amount],
        });
        this.refreshChart();
    }


    refreshChart() {
        this.showChart = false;
        setTimeout(() => {
            this.showChart = true;
        }, 1);
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
    

}
