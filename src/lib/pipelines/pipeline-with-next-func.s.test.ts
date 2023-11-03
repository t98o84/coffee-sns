import { makePipelineWithNextFunc } from '@/lib/pipelines/pipeline-with-next-func';

describe('Pipeline with next func', () => {
  test('The execution order is correct.', () => {
    const firstFunc = jest.fn((args, next) => next(`${args}:First`));
    const secondFunc = jest.fn((args, next) => next(`${args}:Second`));
    const lastFunc = jest.fn((args) => `${args}:Last`);
    const pipeline = makePipelineWithNextFunc(
      [firstFunc, secondFunc],
      lastFunc,
    );

    const result = pipeline('Initial');

    expect(result).toBe('Initial:First:Second:Last');
  });

  test('If NextFunc is not executed, subsequent functions will not be executed.', () => {
    const firstFunc = jest.fn((args, next) => next(args));
    const secondFunc = jest.fn((args) => args);
    const thirdFunc = jest.fn();
    const lastFunc = jest.fn();
    const pipeline = makePipelineWithNextFunc(
      [firstFunc, secondFunc, thirdFunc],
      lastFunc,
    );

    pipeline(null);

    expect(firstFunc).toHaveBeenCalled();
    expect(secondFunc).toHaveBeenCalled();
    expect(thirdFunc).not.toHaveBeenCalled();
    expect(lastFunc).not.toHaveBeenCalled();
  });
});
