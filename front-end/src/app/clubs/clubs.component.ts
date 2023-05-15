import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ClubService } from '../club-service/club.service';
import { Club } from '../types/Club';
import { GridColumn } from '../types/GridColumn';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.css']
})
export class ClubsComponent {
  columns: GridColumn[] = [
    { field: 'name', routerLink: 'clubs' },
    { field: 'shortName'},
    { field: 'address'}
  ]

  public rowData$: Observable<Club[]> = this.clubService.getClubs();

  constructor(private clubService: ClubService) {}
}