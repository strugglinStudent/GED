import { TestBed } from '@angular/core/testing';
import { GedUtilsService } from './utils.service';
import { IsActiveMatchOptions } from '@angular/router';

describe('GedUtilsService', () => {
  let gedUtilsService: GedUtilsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [GedUtilsService],
    });
    gedUtilsService = TestBed.inject(GedUtilsService);
  });
  it('should exactMatchOptions return value', () => {
    const value = {
      paths: 'exact',
      fragment: 'ignored',
      matrixParams: 'ignored',
      queryParams: 'exact',
    };

    expect(gedUtilsService.exactMatchOptions).toEqual(value as IsActiveMatchOptions);
  });
  it('should subsetMatchOptions return value', () => {
    const value = {
      paths: 'subset',
      fragment: 'ignored',
      matrixParams: 'ignored',
      queryParams: 'subset',
    };

    expect(gedUtilsService.subsetMatchOptions).toEqual(value as IsActiveMatchOptions);
  });
  it('should randomId return value', () => {
    expect(gedUtilsService.randomId()).toBeDefined();
  });
});
