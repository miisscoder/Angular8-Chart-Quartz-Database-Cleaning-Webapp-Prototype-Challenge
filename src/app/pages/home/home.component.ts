import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { DataListService } from '../../shared/data-list/data-list.service';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  selector: 'app-sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  errorMessage: string;
  dataList: any[] = [];

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
