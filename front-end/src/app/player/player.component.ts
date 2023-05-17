import { Component } from '@angular/core';
import { PlayerService } from '../player-service/player.service';
import { ActivatedRoute } from '@angular/router';

export interface Player {
  id: string;
  name: string;
  email: string;
  address: string;
  teamId: string;
}

const defaultPlayer: Player = { id: '', name: '', address: '', email: '', teamId: '' };

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent {
  constructor(private playerService: PlayerService, private route: ActivatedRoute) {};

  playerId: string | null = this.route.snapshot.paramMap.get('playerId');
  player: Player = defaultPlayer;
  player$ = this.playerService.getPlayer(this.playerId ?? '').subscribe(player => this.player = player);
}
