type NextFunc<Args, Result> = (args: Args) => Result;

type PipelineWithNextFunc<Args, Result> = (
  args: Args,
  next: NextFunc<Args, Result>,
) => Result;

export function makePipelineWithNextFunc<Args, Result>(
  functions: PipelineWithNextFunc<Args, Result>[],
  last: NextFunc<Args, Result>,
) {
  return functions
    .slice() // copy
    .reverse()
    .reduce(
      (
        next: NextFunc<Args, Result>,
        func: PipelineWithNextFunc<Args, Result>,
      ): NextFunc<Args, Result> => {
        return (args: Args): Result => {
          return func(args, next);
        };
      },
      last,
    );
}
