const express = require('express');
const { createOnePlaylist, getOnePlaylist, deleteOnePlaylist } = require('../models/playlists');
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
    console.log(createdPlaylist);
    
    return res.json(createdPlaylist);
});

/**
 * Get all playlists
 */
router.get('/all', async (req, res) => {

});

/**
 * Get a playlist by id
 */
router.get('/:id', authorize, async (req, res) => {
    const id = req?.params?.id?.length !== 0 ? req.params.id : undefined;
    const token = req?.headers?.authorization?.length !== 0 ? req.headers.authorization : undefined;
    if (!id) return res.sendStatus(400);

    const playlist = await getOnePlaylist(id, token);
    if (!playlist) return res.sendStatus(404);
    console.log(playlist);
    
    return res.json(playlist);
});

/**
 * Delete a playlist by id
 */
router.delete('/:id', authorize, async (req, res) => {
    const id = req?.params?.id?.length !== 0 ? req.params.id : undefined;
    if (!id) return res.sendStatus(400);

    const playlist = deleteOnePlaylist(id);
    if (!playlist) return res.sendStatus(404);

    return res.json(playlist);
});

/**
 * Add a song to a playlist
 */
router.post('/add/id', async (req, res) => {

});

/**
 * Remove a song from a playlist
 */
router.post('/delete/id', async (req, res) => {

});

module.exports = router;
