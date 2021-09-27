import { ProfessorValidatedPipe } from './professor-validated.pipe';

describe('ProfessorValidatedPipe', () => {
  it('create an instance', () => {
    const pipe = new ProfessorValidatedPipe();
    expect(pipe).toBeTruthy();
  });
});
