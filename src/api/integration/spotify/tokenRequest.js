const config = require('config');
const Token = require('../../model/token');
const fetch = require('node-fetch');

const tokenRequest = {
  getToken: async () => {
    var body = {
      "grant_type": "client_credentials",
      "client_id": config.get('spotify.client.id'),
      "client_secret": config.get('spotify.client.secret')
    }
    
    var formBody = [];

    for (var property in body) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(body[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");

    try {
      const response = await fetch(config.get('spotify.url.token'), {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formBody
      });
      
      const json = await response.json();

      return new Token(json.access_token, json.token_type, json.expires_in);
    } catch (e) {
      console.log(e);
    }
  }
}
module.exports = tokenRequest;

