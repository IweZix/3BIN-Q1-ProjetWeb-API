const express = require('express');
const { createOnePlaylist, getOnePlaylist, deleteOnePlaylist, getAllPlaylists } = require('../models/playlists');
const { addOneMusicPlaylist,deleteOneMusicPlaylist } = require('../models/music');
const { authorize } = require('../utils/auths');

const router = express.Router();


/**
 * Create a playlist
 */
router.post('/create', authorize, async (req, res) => {
    const name = req?.body?.name?.length !== 0 ? req.body.name : undefined;
    const token = req?.headers?.authorization?.length !== 0 ? req.headers.authorization : undefined;
    
    if (!name || !token) return res.sendStatus(400);

    const createdPlaylist = await createOnePlaylist(name, token);
    if (!createdPlaylist) return res.sendStatus(500);
    
    return res.json(createdPlaylist);
});

/**
 * Get all playlists
 */
router.get('/all', authorize, async (req, res) => {
    const token = req?.headers?.authorization?.length !== 0 ? req.headers.authorization : undefined;
    if (!token) return res.sendStatus(400);

    const playlists = await getAllPlaylists(token);
    if (!playlists) return res.sendStatus(404);
    return res.json(playlists);
});

/**
 * Get a playlist by id
 */
router.get('/:id', authorize, async (req, res) => {
    const id = req?.params?.id?.length !== 0 ? req.params.id : undefined;
    const token = req?.headers?.authorization?.length !== 0 ? req.headers.authorization : undefined;
    if (!id || !token) return res.sendStatus(400);

    const playlist = await getOnePlaylist(id, token);
    if (!playlist) return res.sendStatus(404);
    
    return res.json(playlist);
});

/**
 * Delete a playlist by id
 */
router.delete('/:id', authorize, async (req, res) => {
    const id = req?.params?.id?.length !== 0 ? req.params.id : undefined;
    const token = req?.headers?.authorization?.length !== 0 ? req.headers.authorization : undefined;
    if (!id || !token) return res.sendStatus(400);

    const playlist = await deleteOnePlaylist(id, token);
    if (!playlist) return res.sendStatus(404);

    return res.json(playlist);
});

/**
 * Add a song to a playlist
 */
router.post('/add/id', async (req, res) => {
    const idPLaylist = req?.body?.idPLaylist?.length !== 0 ? req.body.idPLaylist : undefined;
    const token = req?.headers?.authorization?.length !== 0 ? req.headers.authorization : undefined;
    const idMusic = req?.body?.idMusic?.length !== 0 ? req.body.idMusic : undefined;
 
    
    
    if (!idPLaylist || !token || !idMusic) return res.sendStatus(400);

    const playlist =await addOneMusicPlaylist(token,idPLaylist, idMusic);
    if (!playlist) return res.sendStatus(500);
    return res.json(playlist);

});

/**
 * Remove a song from a playlist
 */
router.post('/delete/id', async (req, res) => {
     const idPLaylist = req?.body?.idPLaylist?.length !== 0 ? req.body.idPLaylist : undefined;
    const token = req?.headers?.authorization?.length !== 0 ? req.headers.authorization : undefined;
    const idMusic = req?.body?.idMusic?.length !== 0 ? req.body.idMusic : undefined;
    
    if (!idPLaylist || !token || !idMusic) return res.sendStatus(400);

    const playlist =await deleteOneMusicPlaylist(token,idPLaylist, idMusic);
    if (!playlist) return res.sendStatus(500);
    return res.json(playlist);

});

module.exports = router;
