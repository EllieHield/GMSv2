import { Component, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Team } from '../types/Team';
import { Club } from '../types/Club';
import { ClubService } from '../club-service/club.service';
import { ActivatedRoute } from '@angular/router';
import { GridColumn } from '../types/GridColumn';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css']
})
export class ClubComponent {
  club: Club | undefined;
  teams: Team[] = [];
  rowData$: Observable<Team[]> = of();  
  columns: GridColumn[] = [
    { field: 'name', routerLink: 'teams' },
    { field: 'league'},
    { field: 'gender' },
    { field: 'ageRange' }
  ];

  constructor(private clubService: ClubService, private route: ActivatedRoute) {}

  ngOnInit() {
    const clubId = this.route.snapshot.paramMap.get('clubId');
    if (clubId) {
      this.clubService.getClub(clubId).subscribe(club => this.club = club);
      this.rowData$ = this.clubService.getTeamsInClub(clubId);
    }
  }
}
