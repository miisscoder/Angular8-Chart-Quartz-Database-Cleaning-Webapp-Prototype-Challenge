import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { CookieService } from 'ngx-cookie-service';

//this project
import { ChartsModule, ThemeService } from 'ng2-charts';

// app main component
import { AppComponent } from './app.component';

// routing module
import { AppRoutingModule } from './app-routing.module';

// bootstrap module
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { SharedModule } from './shared/shared.module';
import { DataListService } from './shared/data-list/data-list.service';


import { HomeComponent } from './pages/home/home.component';
import { SummaryCardComponent } from './components/summary-card/summary-card.component';
import { StatusTableComponent } from './components/status-table/status-table.component';
import { ReviewComponent } from './pages/review/review.component';
import { ReviewResultComponent } from './components/review-result/review-result.component';
import { SortService } from './components/sortable-table/sort.service';
import { SortableTableDirective } from './components/sortable-table/sortable-table.directive';
import { SortableColumnComponent } from './components/sortable-table/sortable-column.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SummaryCardComponent,
    StatusTableComponent,
    SortableTableDirective,
    SortableColumnComponent,
    ReviewComponent,
    ReviewResultComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    NgbModule,
    SharedModule.forRoot(),
    ChartsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [DataListService, CookieService,
    SortService, ThemeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
