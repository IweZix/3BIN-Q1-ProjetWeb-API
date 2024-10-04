const { parse, serialize } = require('../utils/json');
const path = require('node:path');
const { verify } = require('./users');
const jsonDbPath = path.join(__dirname, '/../data/playlists.json');

const defaultPLaylists = []

/**
 * Create a playlist
 * @param {String} name the playlist's name 
 * @returns {Object} the created playlist 
 */
async function createOnePlaylist(name, token) {
    const user = await verify(token);
    
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
 * Get a playlist by id
 * @param {Integer} id the playlist's id
 * @returns {Object} the playlist
 */
function getOnePlaylist(id) {
    const playlists = parse(jsonDbPath);
    const found = playlists.find((p) => p.id === parseInt(id));
    return found;
}

/**
 * Delete a playlist by id
 * @param {Integer} id the playlist's id
 * @returns {Object} the deleted playlist
 */
function deleteOnePlaylist(id) {
    const playlists = parse(jsonDbPath);
    const deleted = playlists.find((p) => p.id === parseInt(id));
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
    deleteOnePlaylist
};