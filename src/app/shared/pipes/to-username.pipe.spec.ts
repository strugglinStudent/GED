import { ToUsernamePipe } from './to-username.pipe';

describe('ToUsernamePipe', () => {
  it('create an instance', () => {
    const pipe = new ToUsernamePipe();
    expect(pipe).toBeTruthy();
  });
});
