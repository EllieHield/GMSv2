import { Component, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { Player } from '../types/Player';
import { Team } from '../types/Team';
import { ActivatedRoute } from '@angular/router';
import { TeamService } from '../team-service/team.service';
import { Club } from '../types/Club';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
})
export class TeamComponent {
  constructor(
    private teamService: TeamService,
    private route: ActivatedRoute
  ) {}

  team: Team | undefined;
  club: Club | undefined;

  public columnDefs: ColDef[] = [
    { field: 'name' },
    { field: 'email' },
    { field: 'address' },
  ];

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  public rowData$!: Observable<Player[]>;

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  onGridReady(params: GridReadyEvent) {
    const teamId = this.route.snapshot.paramMap.get('teamId');
    if (teamId) {
      this.teamService.getTeam(teamId).subscribe(team => this.team = team);
      this.teamService.getClubOfTeam(teamId).subscribe(club => this.club = club);
      this.rowData$ = this.teamService.getPlayersInTeam(teamId);
    }
  }

  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }
}
