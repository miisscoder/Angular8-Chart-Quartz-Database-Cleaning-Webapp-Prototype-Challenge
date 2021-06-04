import { Component, OnInit, HostListener } from '@angular/core';
import { DuplicateDataService, DuplicateDataType, DuplicateDataSearchCriteria }
    from '../../shared/duplicate-data/duplicate-data.service';

import { DataListService } from '../../shared/data-list/data-list.service';

@Component({
    selector: 'app-status-table',
    templateUrl: './status-table.component.html',
    styleUrls: ['./status-table.component.scss']
})
export class StatusTableComponent implements OnInit {

    errorMessage: string;
    data: any = {};
    items: DuplicateDataType[] = [];
    checkedAll: boolean = false;
    checkedSome: boolean = false;
    processingAll: boolean = false;
    /**
     * Creates an instance of the ProfilesComponent with the injected
     * NameListService.
     *
     * @param {DataListService} dataListService - The injected DataListService.
     */
    constructor(
        private dataListServices: DataListService,
        private service: DuplicateDataService
    ) {
    }

    getData(criteria: DuplicateDataSearchCriteria) {
        this.items = this.service.getDuplicateData(criteria);
    }

    onSorted($event) {
        this.getData($event);
    }

    /**
     * Get the dataList OnInit
     */
    ngOnInit() {
        this.getDataList('../../assets/data/dataTable.json');
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

    initData() {
        this.service.init(this.data);

        this.getData({ sortColumn: 'id', sortDirection: 'desc' });

    }

    @HostListener('click')
    process(item) {
        let id = this.items.indexOf(item);
        setTimeout(() => {
            this.items[id].status = this.items[id].nextStatus;
        }, 1000);
        this.items[id].status = "Processing";
    }
    checkOne(item) {
        let id = this.items.indexOf(item);

        this.items[id].checked = !this.items[id].checked;
        if (this.items[id].checked) {
            this.checkedSome = true;
        }
        else {
            let result = this.items.filter(function check(i) {
                return i.checked === true;
            });
            if (result.length === 0) {
                this.checkedSome = false;
            }
        }

    }
    selectAll() {
        this.checkedAll = !this.checkedAll;
        this.checkedSome = this.checkedAll;

        if (this.checkedAll) {
            this.items.forEach(function (item, index) {
                item.checked = true;
            });
        }
        else {
            this.items.forEach(function (item, index) {
                item.checked = false;
            });
        }

    }
    processAll() {
        setTimeout(() => {
            this.items.forEach(function (item, index) {
                if (item.status === "Processing") {
                    item.status = item.nextStatus;
                }
            });
            this.processingAll = false;
        }, 1000);

        this.items.forEach(function (item, index) {
            if (item.status === "Not Processed") {
                item.status = "Processing";
            }
        });
        this.processingAll = true;

    }

}
