import { TestBed } from '@angular/core/testing';

import { SmsreaderService } from './smsreader.service';

describe('SmsreaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SmsreaderService = TestBed.get(SmsreaderService);
    expect(service).toBeTruthy();
  });
});
