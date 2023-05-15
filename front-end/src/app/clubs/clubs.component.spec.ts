import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AgGridModule } from 'ag-grid-angular';

import { ClubsComponent } from './clubs.component';
import { GridComponent } from '../grid/grid.component';


describe('ClubsComponent', () => {
  let component: ClubsComponent;
  let fixture: ComponentFixture<ClubsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AgGridModule
      ],
      declarations: [ ClubsComponent, GridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClubsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
