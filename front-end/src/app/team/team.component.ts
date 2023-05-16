import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../types/Player';
import { Team } from '../types/Team';
import { ActivatedRoute } from '@angular/router';
import { TeamService } from '../team-service/team.service';
import { Club } from '../types/Club';
import { GridColumn } from '../types/GridColumn';

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

  columns: GridColumn[] = [
    { field: 'name' },
    { field: 'email' },
    { field: 'address' },
  ];

  rowData$!: Observable<Player[]>;

  ngOnInit() {
    const teamId = this.route.snapshot.paramMap.get('teamId');
    if (teamId) {
      this.teamService.getTeam(teamId).subscribe(team => this.team = team);
      this.teamService.getClubOfTeam(teamId).subscribe(club => this.club = club);
      this.rowData$ = this.teamService.getPlayersInTeam(teamId);
    }
  }
}
