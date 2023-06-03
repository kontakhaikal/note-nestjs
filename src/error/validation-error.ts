export class ValidationError<T> extends Error {
  constructor(public readonly detail: T, message?: string) {
    super(message);
  }
}
