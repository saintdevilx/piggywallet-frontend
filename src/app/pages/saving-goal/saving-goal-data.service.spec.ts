import { TestBed } from '@angular/core/testing';

import { SavingGoalDataService } from './saving-goal-data.service';

describe('SavingGoalDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SavingGoalDataService = TestBed.get(SavingGoalDataService);
    expect(service).toBeTruthy();
  });
});
