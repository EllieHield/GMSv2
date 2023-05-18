import { Component, Input, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { Observable, of } from 'rxjs';
import { LinkRendererComponent } from '../cell-renderers/link-cell/link-cell.component';
import { GridColumn } from '../types/GridColumn';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent<T> {
  @Input() columns: GridColumn[] = [];
  @Input() rowData$: Observable<T[]> = of();
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  constructor() {}

  columnDefs: ColDef[] = [];

  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true
  };

  onGridReady() {
    this.columnDefs = this.columns.map(({ field, routerLink }) => ({
      field,
      cellRenderer: routerLink ? LinkRendererComponent : null,
      cellRendererParams: routerLink ? { inRouterLink: `/${routerLink}` } : null
    }));
  }

  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }
}
