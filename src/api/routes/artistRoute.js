module.exports = app => {
  const controller = require('../controller/spotifyIntegration')();

  app.route('/v1/artist')
    .get(controller.getArtist);
}