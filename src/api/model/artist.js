module.exports = class Artist {
  constructor(id, name, popularity, followers, images, genres, href, externalUrls) {
    this.id = id;
    this.name = name;
    this.popularity = popularity;
    this.followers = followers;
    this.images = images;
    this.genres = genres;
    this.href = href;
    this.externalUrls = externalUrls;
  }
}