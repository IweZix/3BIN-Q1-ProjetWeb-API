const { parse, serialize } = require('../utils/json');
const path = require('node:path');
const { verify } = require('./users');
const { transformPlaylistWithSpotify, convertIdIntoSong } = require('../utils/spotify');

const jsonDbPath = path.join(__dirname, '/../data/playlists.json');// eslint-disable-line no-undef

/**
 * Ajoute une musique à une playlist.
 * 
 * @param {string} token - Le token d'authentification de l'utilisateur.
 * @param {number} idPlaylist - L'ID de la playlist à laquelle ajouter la musique.
 * @param {number} idMusic - L'ID de la musique à ajouter à la playlist.
 * @returns {object|undefined} - La playlist mise à jour ou undefined si l'utilisateur n'est pas autorisé.
 */
async function addOneMusicPlaylist(token, idPlaylist, idMusic) {
    const user = await verify(token);
    if (!user) return undefined;    

    const playlists = parse(jsonDbPath);
    
    const found = playlists.find((p) => p.id == idPlaylist);
    if (found?.userid !== user.id) return undefined;
    
    found.songs.push(idMusic);
    serialize(jsonDbPath, playlists);
    found.songs = await transformPlaylistWithSpotify(found.songs);


    return found;
};

/**
 * Supprime une musique d'une playlist.
 * 
 * @param {string} token - Le token d'authentification de l'utilisateur.
 * @param {number} idPlaylist - L'ID de la playlist dont supprimer la musique.
 * @param {number} idMusic - L'ID de la musique à supprimer de la playlist.
 * @returns {object|undefined} - La playlist mise à jour ou undefined si l'utilisateur n'est pas autorisé.
 */
async function deleteOneMusicPlaylist(token, idPlaylist, idMusic) {
    const user = await verify(token);
    if (!user) return undefined;

    const playlists = parse(jsonDbPath);
    const found = playlists.find((p) => p.id === parseInt(idPlaylist));
    if (found?.userid !== user.id) return undefined;
    
    const index=found.songs.indexOf(idMusic);
    
    if(index===-1) return undefined;
    found.songs.splice(index,1);
    serialize(jsonDbPath, playlists);
    found.songs = await transformPlaylistWithSpotify(found.songs);
    return found;
};



module.exports = { addOneMusicPlaylist, deleteOneMusicPlaylist };