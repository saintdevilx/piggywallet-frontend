import { TestBed } from '@angular/core/testing';

import { AspirationDataService } from './aspiration-data.service';

describe('AspirationDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AspirationDataService = TestBed.get(AspirationDataService);
    expect(service).toBeTruthy();
  });
});
