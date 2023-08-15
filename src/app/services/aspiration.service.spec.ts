import { TestBed } from '@angular/core/testing';

import { AspirationService } from './aspiration.service';

describe('AspirationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AspirationService = TestBed.get(AspirationService);
    expect(service).toBeTruthy();
  });
});
