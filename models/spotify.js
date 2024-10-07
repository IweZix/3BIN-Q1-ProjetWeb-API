const dotenv = require("dotenv");
const { getToken } = require("../utils/spotify");
const Song = require("../types/song");
dotenv.config();

/**
 * Get some tracks by name and artist
 * @param {String} name
 * @param {String} artist
 * @returns {Array<Song>} An array of songs or an empty array
 */
const getSomeTracksByNameAndArtist = async (name, artist) => {
  const result = await fetch(
    `https://api.spotify.com/v1/search?q=${name}+${artist}&type=track`,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + (await getToken()),
      },
    }
  );

  const data = await result.json();

  const trackList = [];
  for (const track of data.tracks.items) {
    trackList.push(
      new Song(
        track.id,
        track.name,
        track.artists[0].name,
        track.album.name,
        track.album.images[0].url
      )
    );
  }

  return trackList;
};

module.exports = {
  getSomeTracksByNameAndArtist,
};