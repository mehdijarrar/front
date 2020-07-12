import { TestBed, async, inject } from '@angular/core/testing';

import { SubGuard } from './subscriber.guard';

describe('SubGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubGuard]
    });
  });

  it('should ...', inject([SubGuard], (guard: SubGuard) => {
    expect(guard).toBeTruthy();
  }));
});
