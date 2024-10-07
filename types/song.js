/**
 * Song class
 */
class Song {

    constructor(id, title, artist, album, image) {
        this.id = id;
        this.title = title;
        this.artist = artist;
        this.album = album;
        this.image = image;
    }
}

module.exports = Song;