class InvalidClientIdError extends Error {
  constructor() {
    super("clientId not provided");

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, InvalidClientIdError.prototype);
  }
}