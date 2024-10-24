const dotenv = require('dotenv');
const Song = require("../types/song");
dotenv.config();


/**
 * Get the token to access the Spotify API.
 * @returns {string} - The token to access the Spotify API.
 */
const getToken = async () => {    
    const result = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(process.env.CLIENT_ID + ':' + process.env.SECRET) // eslint-disable-line no-undef
        },
        body: 'grant_type=client_credentials'
    });

    const data = await result.json();
    return data.access_token;
};


/**
 * Convert a Spotify ID into a Song object.
 * @param {Number} id - The Spotify ID of the song.
 * @returns {Song} - The song object.
 */
const convertIdIntoSong = async (id) => {
    const result = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + (await getToken()),
        }
    });

    const data = await result.json();
    
    return new Song(data.id, data.name, data.artists[0].name, data.album.name, data.album.images[0].url);
};


/**
 * Transform a playlist with Spotify.
 * @param {Object} playlists - The playlists to transform.
 * @returns {Array} - The transformed playlists.
 */
async function transformPlaylistWithSpotify(playlists) {
    const resultSongs = [];
    for (let song of playlists) {
        resultSongs.push(await convertIdIntoSong(song));
    }
    return resultSongs;
}

module.exports = {
    getToken,
    convertIdIntoSong,
    transformPlaylistWithSpotify
};