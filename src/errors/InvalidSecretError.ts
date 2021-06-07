class InvalidSecretError extends Error {
  constructor() {
    super("clientSecret not provided");

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, InvalidSecretError.prototype);
  }
}