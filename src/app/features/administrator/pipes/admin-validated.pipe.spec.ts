import { AdminValidatedPipe } from './admin-validated.pipe';

describe('AdminValidatedPipe', () => {
  it('create an instance', () => {
    const pipe = new AdminValidatedPipe();
    expect(pipe).toBeTruthy();
  });
});
