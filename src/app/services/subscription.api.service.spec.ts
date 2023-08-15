import { TestBed } from '@angular/core/testing';

import { SubscriptionAPIService } from './subscription.api.service';

describe('SubscriptionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubscriptionAPIService = TestBed.get(SubscriptionAPIService);
    expect(service).toBeTruthy();
  });
});
