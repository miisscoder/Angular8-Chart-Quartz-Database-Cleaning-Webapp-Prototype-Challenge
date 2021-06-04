import { Injectable } from '@angular/core';


@Injectable()
export class DuplicateDataService {

    private _mockDuplicateData = [

    ];
    init(data: any[]) {

        this._mockDuplicateData = data;
    }

    //sort
    getDuplicateData(criteria: DuplicateDataSearchCriteria): DuplicateDataType[] {
        return this._mockDuplicateData.sort((a, b) => {
            if (criteria.sortDirection === 'desc') {
                return a[criteria.sortColumn] < b[criteria.sortColumn] ? -1 : 1;
            }
            else {
                return a[criteria.sortColumn] > b[criteria.sortColumn] ? -1 : 1;
            }
        });
    }

}

export class DuplicateDataType {
    id: number = 0;
    well: string = '';
    stage: number = 0;
    api: string = '';
    records: number = 0;
    duplicates: number = 0;
    status: string = '';
    nextStatus: string = '';
    report: any = {
        rows: 0,
        original: 0,
        final: 0,
        name: ''
    };
    hideReport: boolean = true;
    checked: boolean = false;
}

export class DuplicateDataSearchCriteria {
    sortColumn: string;
    sortDirection: string;
}