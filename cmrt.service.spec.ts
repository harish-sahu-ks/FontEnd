import { TestBed } from '@angular/core/testing';

import { CmrtService } from './cmrt.service';

describe('CmrtService', () => {
  let service: CmrtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CmrtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
