import { Component } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { PlayerService } from '../player-service/player.service';
import { GridColumn } from '../types/GridColumn';
import { TeamService } from '../team-service/team.service';
import { Player } from '../types/Player';
import { Team } from '../types/Team';
import { ClubService } from '../club-service/club.service';
import { Club } from '../types/Club';

interface PlayerRow extends Player {
  club: string | undefined;
  team: string | undefined;
} 

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent {
  teams: Team[] = [];
  clubs: Club[] = [];
  public teamData$ = this.teamService.getTeams().subscribe(data => this.teams = data);
  public clubData$ = this.clubService.getClubs().subscribe(data => this.clubs = data);
  public rowData$: Observable<PlayerRow[]> = this.playerService.getPlayers().pipe(
    map(players => players.map(player => {
      const team = this.teams.find(team => team.id === player.teamId);
      const club = this.clubs.find(club => club.id === team?.clubId);
      return {
        ...player,
        club: club?.name,
        team: team?.name
      }
    })),
  );

  constructor(private playerService: PlayerService, private teamService: TeamService, private clubService: ClubService) { };

  public columns: GridColumn[] = [
    { field: 'name', routerLink: '/players' },
    { field: 'club' },
    { field: 'team' }
  ]
}
