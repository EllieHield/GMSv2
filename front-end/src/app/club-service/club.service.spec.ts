import { TestBed } from '@angular/core/testing';

import { ClubService } from './club.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ClubService', () => {
  let service: ClubService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]});
    service = TestBed.inject(ClubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
