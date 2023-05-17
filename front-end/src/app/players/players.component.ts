import { Component, ViewChild } from '@angular/core';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { LinkRendererComponent } from '../cell-renderers/link-cell/link-cell.component';
import { Observable } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';
import { PlayerService } from '../player-service/player.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent {
  public rowData$!: Observable<any[]>;

  constructor(private playerService: PlayerService) {};

  public columnDefs: ColDef[] = [
    { field: 'name', cellRenderer: LinkRendererComponent, cellRendererParams: { inRouterLink: '/players' } },
    // TODO: { field: 'teamId', headerName: 'Team', valueGetter: (params) => params.data.teamId } - create team service and use that to return the team name by id
  ]

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  onGridReady(params: GridReadyEvent) {
    this.rowData$ = this.playerService.getPlayers();
  }
}
