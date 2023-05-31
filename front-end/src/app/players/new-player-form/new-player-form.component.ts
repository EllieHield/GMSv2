import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClubService } from 'src/app/club-service/club.service';
import { PlayerService } from 'src/app/player-service/player.service';
import { Club } from 'src/app/types/Club';
import { Player } from 'src/app/types/Player';
import { Team } from 'src/app/types/Team';

@Component({
  selector: 'app-new-player-form',
  templateUrl: './new-player-form.component.html',
  styleUrls: ['./new-player-form.component.css']
})
export class NewPlayerFormComponent {
  constructor(private clubService: ClubService, private playerService: PlayerService, private router: Router) { };
  
  clubs: Club[] = [];
  teams: Team[] = [];

  playerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    club: new FormControl('', Validators.required),
    team: new FormControl('', Validators.required)
  });
  
  public clubs$ = this.clubService.getClubs().subscribe(data => this.clubs = data);
  public formTeams$ = this.playerForm.get('club')?.valueChanges.subscribe(club => {
    if (club) {
      this.clubService.getTeamsInClub(club).subscribe(data => this.teams = data);;
    }
  });

  submit() {
    if (this.playerForm.valid) {
      const newPlayer: Player = {
        id: '',
        name: this.playerForm.value.name!,
        email: this.playerForm.value.email!,
        address: this.playerForm.value.address!,
        teamId: this.playerForm.value.team!,
      }
      this.clubs$.unsubscribe();
      this.formTeams$?.unsubscribe();
      this.playerService.addPlayer(newPlayer)
      .subscribe((_) => this.router.navigate(['players']));
    }
  }
}
