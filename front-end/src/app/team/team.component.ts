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

  teamName: string | null = 'error';
  team: Team | undefined 
  club: Club | undefined

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.teamName = params.get('teamId');
    });
  }

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
    if (this.teamName) {
      this.teamService.getTeam(this.teamName).subscribe((data) => {
        this.team = data;
        this.teamService.getClubOfTeam(this.team.clubId).subscribe((data) => {
          this.club = data;
        });
      });
      this.rowData$ = this.teamService.getPlayersInTeam(this.teamName);
    }
  }

  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }
}
