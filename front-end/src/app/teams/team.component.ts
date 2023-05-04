import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { Player } from 'src/app/teams/Player';
import { Team } from './Team';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
})
export class TeamComponent {
  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  teamName: string | null = 'error';
  team: Team = { name: '', address: '', shortName: '', league: '', clubId: '' }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.teamName = params.get('teamName');
    });

    this.getData(this.teamName);
  }

  getData(teamName: string | null) {
    const url = 'http://localhost:8080/teams/' + teamName;
    this.http
      .get(url)
      .subscribe(
        (data) => {
          this.team = data as Team;
          console.log('Received data:', data);
        });
  }

  // Hard-coded for now. Replace when players are implemented.
  players: Player[] = [
    { name: 'Christiano Fernandes', number: 7, position: 'Coffee maker' },
    { name: 'Markus Greenwood', number: 10, position: 'Class clown' },
    { name: 'Alan Beckham', number: 9, position: 'Bouncer' },
    { name: 'David Shearer', number: 8, position: 'Barrista' },
    { name: 'Charles Windsor', number: 81, position: 'Dog walker' },
  ];

  public columnDefs: ColDef[] = [
    { field: 'name' },
    { field: 'number' },
    { field: 'position' },
  ];

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  public rowData$!: Observable<any[]>;

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  onGridReady(params: GridReadyEvent) {
    this.rowData$ = new Observable((observer) => {
      observer.next(this.players);
      observer.complete();
    });
  }

  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }
}
