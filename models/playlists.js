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

async function getAllPlaylists(token) {
    const user = await verify(token);
    if (!user) return undefined;

    const playlists = parse(jsonDbPath);
    return playlists.filter((p) => p.userid === user.id);
}

/**
 * Get a playlist by id
 * @param {Integer} id the playlist's id
 * @returns {Object} the playlist
 */
async function getOnePlaylist(id, token) {
    const user = await verify(token);
    if (!user) return undefined;

    const playlists = parse(jsonDbPath);
    const found = playlists.find((p) => p.id === parseInt(id));

    if (found?.userid !== user.id) return undefined;

    return found;
}

/**
 * Delete a playlist by id
 * @param {Integer} id the playlist's id
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