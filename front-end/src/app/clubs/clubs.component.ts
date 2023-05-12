import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { LinkRendererComponent } from '../cell-renderers/link-cell/link-cell.component';
import { ClubService } from '../club-service/club.service';
import { Club } from '../types/Club';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.css']
})
export class ClubsComponent {
  rowDataGetter = ({ data }: { data: Club[] }) => data;
  public columnDefs: ColDef[] = [
    { field: 'name', cellRenderer: LinkRendererComponent, cellRendererParams: { inRouterLink: '/clubs' }, valueGetter: this.rowDataGetter },
    { field: 'shortName'},
    { field: 'address'}
  ];

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  public rowData$!: Observable<Club[]>;

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  constructor(private clubService: ClubService) {}

  onGridReady(params: GridReadyEvent) {
    this.rowData$ = this.clubService.getClubs();
  }

  onCellClicked( e: CellClickedEvent): void {
    console.log('cellClicked', e);
  }

  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }

}