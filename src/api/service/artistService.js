const tokenRequest = require("../integration/spotify/tokenRequest");
const searchRequest = require("../integration/spotify/searchRequest");
const artistPersistence = require("../../datastructure/persistence/artistPersistence");

const artistService = {
  syncArtistFromSpotify: async (artistName) => {
    artistName = artistName.replace(' ', '+');

    var token = await tokenRequest.getToken();
    
    var query = {
      "q": artistName,
      "type": "artist",
      "market": "US",
      "limit": 1,
      "offset": 0
    }

    var formBody = [];

    for (var property in query) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(query[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");

    var synchedData = await searchRequest.syncArtistData(token, formBody);

    var artistResponse = await artistPersistence.findOne(synchedData);

    if (!artistResponse) {
      artistResponse = artistPersistence.save(synchedData);
    }

    return await artistResponse;
  },

  getToken: async () => {
    return await tokenRequest.getToken();
  }
}

module.exports = artistService;