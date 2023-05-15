import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './grid.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgGridModule } from 'ag-grid-angular';
import { LinkRendererComponent } from '../cell-renderers/link-cell/link-cell.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    GridComponent,
    LinkRendererComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    AgGridModule,
    RouterModule
  ],
  exports: [
    GridComponent
  ]
})
export class GridModule { }
