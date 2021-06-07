class InvalidAuthenticationError extends Error {
  constructor() {
    super("clientId, clientSecret or appToken not provided");

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, InvalidAuthenticationError.prototype);
  }
}