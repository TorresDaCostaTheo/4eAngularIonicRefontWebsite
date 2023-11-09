import { TestBed } from '@angular/core/testing';

import { BateauxService } from './bateaux.service';

describe('BateauxService', () => {
  let service: BateauxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BateauxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
