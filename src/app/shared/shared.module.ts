import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DataListService } from './data-list/data-list.service';
import { DuplicateDataService } from './duplicate-data/duplicate-data.service';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule, NgbModule],
  declarations: [ HeaderComponent, FooterComponent],
  exports: [ HeaderComponent,
            FooterComponent, CommonModule, FormsModule, RouterModule]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [DataListService, DuplicateDataService]
    };
  }
}
