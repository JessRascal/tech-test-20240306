export class AppError {
  /**
   * Constructs an instance of AppError
   * @param {string} code  - Unique error code.
   * @param {string} message - Human-readable error message.
   */
  constructor(
    public code: string,
    public message: string,
  ) {}
}

/**
 * Creates an instance of AppError from various different types of errors.
 *
 * @param {unknown} err - Error to process. Can be anything but specifically handles AppError, Error, and custom error code string.
 * @param {string} [defaultCode='unknown'] - Default error code for looking up the error message (if not supplied in err object).
 * @returns {AppError} An AppError object created from the passed in error details.
 */
export const createAppError = (err: unknown, defaultCode: string = 'unknown'): AppError => {
  // is already AppError, return
  if (err instanceof AppError) {
    return err;
  }

  // if Error object, create AppError from details
  if (err instanceof Error) {
    const message = ErrorMapping[err.message] || err.message || ErrorMapping[defaultCode];
    return new AppError(err.message, message);
  }

  // if string and exists in lookup, create AppError from details
  if (typeof err === 'string' && ErrorMapping[err]) {
    return new AppError(err, ErrorMapping[err]);
  }

  // fall back to unknown
  return new AppError(defaultCode, ErrorMapping[defaultCode]);
};

const ErrorMapping: Record<string, string> = {
  unknown: 'An unknown error occurred',
  'people/unable-to-get': 'Unable to get people',
};
