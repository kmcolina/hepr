import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import {MatTooltipModule} from "@angular/material/tooltip";



@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    MatTooltipModule
  ],
  exports: [
    IndexComponent,
  ]
})
export class DashboardModule { }
