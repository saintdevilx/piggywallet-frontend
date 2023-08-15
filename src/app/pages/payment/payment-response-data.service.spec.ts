import { TestBed } from '@angular/core/testing';

import { PaymentResponseDataService } from './payment-response-data.service';

describe('PaymentResponseDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaymentResponseDataService = TestBed.get(PaymentResponseDataService);
    expect(service).toBeTruthy();
  });
});
