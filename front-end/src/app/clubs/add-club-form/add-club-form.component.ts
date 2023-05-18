import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Club } from 'src/app/types/Club';
import { ClubService } from 'src/app/club-service/club.service';

@Component({
  selector: 'apps-add-club-form',
  templateUrl: './add-club-form.component.html',
  styleUrls: ['./add-club-form.component.css'],
})
export class AddClubFormComponent {
  constructor(private router: Router, private clubService: ClubService) {}
  clubform = new FormGroup({
    name: new FormControl(''),
    shortName: new FormControl(''),
    address: new FormControl(''),
  });

  submit() {
    let newClub: Club = {
      id: '',
      name: this.clubform.value.name!,
      address: this.clubform.value.address!,
      shortName: this.clubform.value.shortName!,
    };
    this.clubService
      .addClub(newClub)
      .subscribe((_) => this.router.navigate(['clubs']));
  }
}
