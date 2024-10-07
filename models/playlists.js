const { parse, serialize } = require('../utils/json');
const path = require('node:path');
const { verify } = require('./users');
const jsonDbPath = path.join(__dirname, '/../data/playlists.json');// eslint-disable-line no-undef
const { transformPlaylistWithSpotify } = require('../utils/spotify');



/**
 * Create a playlist
 * @param {String} name the playlist's name 
 * @param {String} token the user's token
 * @returns {Object} the created playlist 
 */
async function createOnePlaylist(name, token) {
    const user = await verify(token);
    if (!user) return undefined;
    
    const playlists = parse(jsonDbPath);
    const newPlaylist = {
        id: playlists.length + 1,
        userid: user.id,
        name,
        songs: []
    };
    playlists.push(newPlaylist);
    serialize(jsonDbPath, playlists);

    return newPlaylist;
};

/**
 * Get all playlists
 * @param {String} token the user's token
 * @returns {Object} the user's playlists
 */
async function getAllPlaylists(token) {
    const user = await verify(token);
    if (!user) return undefined;

    const playlists = parse(jsonDbPath);
    playlists.filter((p) => p.userid === user.id);
    for (let i = 0; i < playlists.length; i++) {
        console.log(playlists[i].songs);
        
        playlists[i].songs = await transformPlaylistWithSpotify(playlists[i].songs);
    }
    return playlists;
}

/**
 * Get a playlist by id
 * @param {Integer} id the playlist's id
 * @param {String} token the user's token
 * @returns {Object} the playlist
 */
async function getOnePlaylist(id, token) {
    const user = await verify(token);
    if (!user) return undefined;

    const playlists = parse(jsonDbPath);
    const found = playlists.find((p) => p.id === parseInt(id));

    if (found?.userid !== user.id) return undefined;
    found.songs = await transformPlaylistWithSpotify(found.songs);
    return found;
}

/**
 * Delete a playlist by id
 * @param {Integer} id the playlist's id
 * @param {String} token the user's token
 * @returns {Object} the deleted playlist
 */
async function deleteOnePlaylist(id, token) {
    const user = await verify(token);
    if (!user) return undefined;

    const playlists = parse(jsonDbPath);
    const deleted = playlists.find((p) => p.id === parseInt(id));
    if (deleted?.userid !== user.id) return undefined;
    if (deleted) {
        const index = playlists.indexOf(deleted);
        playlists.splice(index, 1);
        serialize(jsonDbPath, playlists);
    }
    
    return deleted;
}

module.exports = {
    createOnePlaylist,
    getOnePlaylist,
    getAllPlaylists,
    deleteOnePlaylist
};