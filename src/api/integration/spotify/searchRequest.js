const config = require('config');
const fetch = require('node-fetch');
const Artist = require('../../model/artist');
const Image = require('../../model/image');

const searchRequest = {
  syncArtistData: async (token, query) => {
    try {
      const response = await fetch(config.get('spotify.url.api') + 'search?' + query, {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + token.access_token
        }
      });
      
      const json = await response.json();

      return artistDtoToModel(json.artists.items[0]);
    } catch (e) {
      console.log(e);
    }
  },
}

function artistDtoToModel(dto) {
  var images = [];

  dto.images.forEach(image => {
    images.push(new Image(image.url, image.height, image.width));
  });

  return new Artist(
    dto.id,
    dto.name,
    dto.popularity,
    dto.followers.total,
    images,
    dto.genres,
    dto.href,
    dto.externalUrls
  );
}

module.exports = searchRequest;