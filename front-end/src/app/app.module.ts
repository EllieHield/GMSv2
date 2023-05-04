import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
import { ClubsComponent } from './clubs/clubs.component';
import { ClubComponent } from './club/club.component';
import { LinkRendererComponent } from './cell-renderers/link-cell/link-cell.component';
import { TeamComponent } from './teams/team.component';

@NgModule({
  declarations: [
    AppComponent,
    ClubsComponent,
    ClubComponent,
    TeamComponent,
    LinkRendererComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'clubs', component: ClubsComponent },
      { path: 'clubs/:clubName', component: ClubComponent },
      { path: 'teams/:teamName', component: TeamComponent },
    ]),
    BrowserAnimationsModule,
    FormsModule,
    AgGridModule,
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
