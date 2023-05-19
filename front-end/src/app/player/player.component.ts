import { Component } from '@angular/core';
import { PlayerService } from '../player-service/player.service';
import { ActivatedRoute } from '@angular/router';
import { TeamService } from '../team-service/team.service';

export interface Player {
  id: string;
  name: string;
  email: string;
  address: string;
  teamId: string;
}

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent {
  player: Player | undefined = undefined;
  playerId: string | null = this.route.snapshot.paramMap.get('playerId');
  teamName: string = ''
  clubName: string = ''
  player$ = this.playerService.getPlayer(this.playerId ?? '').subscribe(player => {
    this.player = player;
    this.teamService.getTeam(this.player.teamId).subscribe(team => this.teamName = team.name);
    this.teamService.getClubOfTeam(this.player.teamId).subscribe(club => this.clubName = club.name);
  });


  constructor(
    private playerService: PlayerService,
    private teamService: TeamService,
    private route: ActivatedRoute
  ) {};
}
