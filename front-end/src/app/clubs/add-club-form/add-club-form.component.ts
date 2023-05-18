import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    name: new FormControl('', [Validators.required]),
    shortName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(3),
    ]),
    address: new FormControl('', [Validators.required]),
  });

  submit() {
    if (this.clubform.valid) {
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

  get name() {
    return this.clubform.get('name');
  }

  get shortName() {
    return this.clubform.get('shortName');
  }

  get address() {
    return this.clubform.get('address');
  }
}
