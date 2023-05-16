import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from '../types/Team';
import { Player } from '../types/Player';
import { Club } from '../types/Club';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  host = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  public getTeam(teamId : string): Observable<Team> {
    return this.http.get<Team>(`${this.host}/teams/${teamId}`);
  }

  public getClubOfTeam(teamId : string) : Observable<Club> {
    return this.http.get<Club>(`${this.host}/teams/${teamId}/club`);
  }

  public getPlayersInTeam(teamId: string): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.host}/players/team/${teamId}`);
  }

}
