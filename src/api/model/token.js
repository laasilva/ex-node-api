module.exports = class Token {
  constructor(access_token, token_type, expires_in) {
    this.access_token = access_token;
    this.token_type = token_type;
    this.expires_in = expires_in;
  }
}