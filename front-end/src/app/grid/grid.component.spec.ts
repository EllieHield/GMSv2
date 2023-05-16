import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridComponent } from './grid.component';
import { AgGridModule } from 'ag-grid-angular';

describe('GridComponent', () => {
  let component: GridComponent<any>;
  let fixture: ComponentFixture<GridComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        GridComponent
      ],
      imports: [
        AgGridModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
