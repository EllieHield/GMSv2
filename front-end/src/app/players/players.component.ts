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

const mapItems = <T extends { id: string }>(data: T[]) => {
  return data.reduce<Record<string, T>>((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {})
}

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent {
  teams: Record<string, Team> = {};
  clubs: Record<string, Club> = {};
  public teamData$ = this.teamService.getTeams().subscribe(data => this.teams = mapItems(data));
  public clubData$ = this.clubService.getClubs().subscribe(data => this.clubs = mapItems(data));
  public rowData$: Observable<PlayerRow[]> = this.playerService.getPlayers().pipe(
    map(players => players.map(player => {
      const team = this.teams[player.teamId];
      const club = this.clubs[team?.clubId];
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
