import { TestBed } from '@angular/core/testing';

import { ContactreaderService } from './contactreader.service';

describe('ContactreaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContactreaderService = TestBed.get(ContactreaderService);
    expect(service).toBeTruthy();
  });
});
