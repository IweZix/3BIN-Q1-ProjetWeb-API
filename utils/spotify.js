const dotenv = require('dotenv');
const Song = require("../types/song");
dotenv.config();

/**
 * Get the token to do requests to the Spotify API
 * @returns The token to access the Spotify API
 */
const getToken = async () => {    
    const result = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(process.env.CLIENT_ID + ':' + process.env.SECRET)
        },
        body: 'grant_type=client_credentials'
    });

    const data = await result.json();
    return data.access_token;
};

/**
 * Convert a Spotify ID into a Song object
 * @param {String} id 
 * @returns A Song object
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

module.exports = {
    getToken,
    convertIdIntoSong
};