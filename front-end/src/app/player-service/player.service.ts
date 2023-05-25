import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Player } from "../player/player.component";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class PlayerService {
    playersHost = 'http://localhost:8080/players';

    constructor(private http: HttpClient) { };
    
    public getPlayers(): Observable<Player[]> {
        return this.http.get<Player[]>(this.playersHost);
    }

    public getPlayer(id: string): Observable<Player> {
        return this.http.get<Player>(`${this.playersHost}/${id}`);
    }

    public addPlayer(player: Player): Observable<Object> {
        return this.http.post(this.playersHost, player);
    }
}