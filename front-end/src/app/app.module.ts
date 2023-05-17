import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ClubsComponent } from './clubs/clubs.component';
import { ClubComponent } from './club/club.component';
import { TeamComponent } from './team/team.component';
import { GridModule } from './grid/grid.module';
import { AddClubFormComponent } from './clubs/add-club-form/add-club-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { PlayerComponent } from './player/player.component';
import { PlayersComponent } from './players/players.component';

@NgModule({
  declarations: [
    AppComponent,
    ClubsComponent,
    ClubComponent,
    TeamComponent,
    AddClubFormComponent,
    HomeComponent,
    PlayersComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'clubs', component: ClubsComponent },
      { path: 'clubs/add', component: AddClubFormComponent },
      { path: 'clubs/:clubId', component: ClubComponent },
      { path: 'teams/:teamId', component: TeamComponent },
      { path: 'players/:playerId', component: PlayerComponent },
      { path: 'players', component: PlayersComponent }
    ]),
    GridModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
