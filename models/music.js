const { parse, serialize } = require('../utils/json');
const path = require('node:path');
const { verify } = require('./users');

const jsonDbPath = path.join(__dirname, '/../data/playlists.json');// eslint-disable-line no-undef

async function addOneMusicPlaylist(token,idPlaylist, idMusic) {
    const user = await verify(token);
    if (!user) return undefined;

    const playlists = parse(jsonDbPath);
    const found = playlists.find((p) => p.id === parseInt(idPlaylist));

    if (found?.userid !== user.id) return undefined;
    found.songs.push(idMusic);
    serialize(jsonDbPath, playlists);

    return found;
};




module.exports = { addOneMusicPlaylist };