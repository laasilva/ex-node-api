module.exports = () => {
  const artistService = require('../service/artistService');
  const controller = {};

  controller.getArtist = async (req, res) => {
    try {
      const response = await artistService.syncArtistFromSpotify(req.query.name);
      
      res.json(response);
    } catch (e) {
      console.log(e);
    }
  }

  return controller;
}