import { Component, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { Observable, of } from 'rxjs';

import { Team } from '../types/Team';
import { Club } from '../types/Club';
import { ClubService } from '../club-service/club.service';
import { ActivatedRoute } from '@angular/router';
import { LinkRendererComponent } from '../cell-renderers/link-cell/link-cell.component';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css']
})
export class ClubComponent {
  club: Club | undefined;
  teams: Team[] = [];
  rowData$: Observable<Team[]> = of();
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  constructor(private clubService: ClubService, private route: ActivatedRoute) {}

  columnDefs: ColDef[] = [
    { field: 'name', cellRenderer: LinkRendererComponent, cellRendererParams: { inRouterLink: '/teams' } },
    { field: 'league'},
    { field: 'gender' },
    { field: 'ageRange' }
  ];

  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  onGridReady() {
    const clubId = this.route.snapshot.paramMap.get('clubId');
    if (clubId) {
      this.clubService.getClub(clubId).subscribe(club => this.club = club);
      this.rowData$ = this.clubService.getTeamsInClub(clubId);
    }
  }
}
