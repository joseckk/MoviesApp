import { TestBed } from '@angular/core/testing';

import { TraslateService } from './traslate.service';

describe('TraslateService', () => {
  let service: TraslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TraslateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
