module.exports = class Response {
  constructor(statusCode, statusMessage, message) {
    this.statusMessage = statusMessage;
    this.statusCode = statusCode;
    this.message = message;
  }
}