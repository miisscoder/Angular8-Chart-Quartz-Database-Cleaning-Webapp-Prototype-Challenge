import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { DataListService } from '../../shared/data-list/data-list.service';

/**
 * This class represents the lazy loaded ReviewComponent.
 */
@Component({
    selector: 'app-sd-review',
    templateUrl: 'review.component.html',
    styleUrls: ['review.component.scss']
})
export class ReviewComponent implements OnInit, OnDestroy {
    errorMessage: string;
    dataList: any = {
        "well": {
            "selected": "",
            "options": []
        },
        "stage": {
            "selected": "",
            "options": []
        },
        "channel": {
            "selected": "",
            "options": []
        }
    };

    cardInfo: any;
    tableInfo: any[] = [];
    /**
     * Creates an instance of the MainMenuComponent with the injected
     * NameListService.
     *
     * @param {DataListService} dataListService - The injected DataListService.
     */
    constructor(public dataListService: DataListService,
        public cookieService: CookieService) {
    }

    /**
     * Get the dataList OnInit
     */
    ngOnInit() {
        this.getDataList('../../assets/data/dataReviewSelect.json');
    }

    initData() {
        this.cardInfo = this.dataList["summary"];
        this.tableInfo = this.dataList["table"];
    }

    /**
     * OnDestroy
     */
    ngOnDestroy() {
    }


    /**
     * Handle the dataListService observable
     */
    getDataList(jsonUrl) {
        this.dataListService.get(jsonUrl)
            .subscribe(
            dataList => this.dataList = dataList,
            error => this.errorMessage = <any>error,
            () => this.initData()
            );
    }
}
