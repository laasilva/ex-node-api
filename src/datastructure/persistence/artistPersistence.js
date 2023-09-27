const pool = require("../config/queries");
const Artist = require('../../api/model/artist');
const Image = require('../../api/model/image');

const artistPersistence = {
  findById: async (entity) => {
    return await findOne(entity);
  },

  save: async (entity) => {

    const {
      id,
      name,
      popularity,
      followers,
      images,
      genres,
      href
    } = entity;

    const client = await pool.connect();

    await client.query("INSERT INTO music.artist (id, name, popularity, followers, genres, href)" + 
      "VALUES ($1, $2, $3, $4, $5, $6)", [id, name, popularity, followers, genres, href]);
    
    images.forEach(async image => {
      var img = await pool.query("INSERT INTO music.image (url, width, height) VALUES ($1, $2, $3) RETURNING id", [image.url, image.width, image.height]);
      await pool.query("INSERT INTO music.artist_image (artist, image) VALUES ($1, $2)", [id, img.rows[0].id]);
    });
    
    client.release();

    console.log("New artist added to the database.\nid=" + id + " name=" + name);

    var artistResponse = await findOne(entity);

    return artistResponse;
  }
}

async function findOne(entity) {
  const {
    id,
    name,
    popularity,
    followers,
    images,
    genres,
    href
  } = entity;

  const client = await pool.connect();

  var artist = await client.query("SELECT * FROM music.artist a where a.id = $1", [id]);

  artist = artist.rows[0];

  if (artist) {
    var imgs = await client.query("SELECT i.url, i.width, i.height FROM music.artist_image ai " +
    "INNER JOIN music.artist a ON ai.artist = a.id " +
    "INNER JOIN music.image i ON ai.image = i.id " +
    "WHERE a.id = $1", [id]);

    imgs = imgs.rows;
    var imgsDto = [];

    if (imgs) {
      imgs.forEach(async image => {
        imgsDto.push(new Image(image.url, image.height, image.width));
      });
    }
    var artistResponse = new Artist(artist.id, artist.name, artist.popularity, artist.followers, imgsDto, artist.genres, artist.href, artist.href);
    return artistResponse;
  } else {
    return null;
  }
}

module.exports = artistPersistence;
