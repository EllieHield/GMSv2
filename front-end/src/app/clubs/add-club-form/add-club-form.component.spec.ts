import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClubFormComponent } from './add-club-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('AddClubFormComponent', () => {
  let component: AddClubFormComponent;
  let fixture: ComponentFixture<AddClubFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      declarations: [ AddClubFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddClubFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
