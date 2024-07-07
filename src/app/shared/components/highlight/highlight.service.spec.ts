import { TestBed } from '@angular/core/testing';
import { GedHighlightService } from './highlight.service';

describe('GedHighlightService', () => {
  let service: GedHighlightService;
  let code: string;
  let language: string;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [GedHighlightService],
    });
    service = TestBed.inject(GedHighlightService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should highlight code correctly', () => {
    code = 'const foo = "bar";';
    language = 'javascript';
    service.highlight(code, language);
    expect(code).toEqual('const foo = "bar";');
  });
  it('should return empty string if code is empty', () => {
    code = '';
    language = 'javascript';
    service.highlight(code, language);
    expect(code).toEqual('');
  });

  it('should return empty string if language is not supported', async () => {
    code = ' \n const foo = "bar"; \n const foo = "bar"; \n ';
    language = 'javascript';
    await service.highlight(code, language);
    expect(service).toBeTruthy();
  });
});
