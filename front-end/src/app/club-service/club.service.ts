import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Club } from '../types/Club';
import { Team } from '../types/Team';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClubService {
  host = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  public getTeamsInClub(clubId: string): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.host}/teams?clubId=${clubId}`);
  }

  public getClubs(): Observable<Club[]> {
    return this.http.get<Club[]>(`${this.host}/clubs/`);
  }

  public getClub(clubId: string): Observable<Club> {
    return this.http.get<Club>(`${this.host}/clubs/${clubId}`);
  }

  public addClub(club : Club) : Observable<any> {
    return this.http.post(`${this.host}/clubs`, club);
  }
}
