const dotenv = require('dotenv');
const Song = require("../types/song");
dotenv.config();

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

const convertIdIntoSong = async (id) => {
    const result = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + (await getToken()),
        }
    });

    const data = await result.json();
    console.log(data);
    
    return new Song(data.id, data.name, data.artists[0].name, data.album.name, data.album.images[0].url);
};

module.exports = {
    getToken,
    convertIdIntoSong
};