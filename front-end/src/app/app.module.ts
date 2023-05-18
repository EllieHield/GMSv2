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

@NgModule({
  declarations: [
    AppComponent,
    ClubsComponent,
    ClubComponent,
    TeamComponent,
    AddClubFormComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'clubs', component: ClubsComponent },
      { path: 'clubs/add', component: AddClubFormComponent },
      { path: 'clubs/:clubId', component: ClubComponent },
      { path: 'teams/:teamId', component: TeamComponent },
    ]),
    GridModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
