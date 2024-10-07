const express = require('express');
const { getSomeTracksByNameAndArtist } = require('../models/spotify');
const { convertIdIntoSong } = require('../utils/spotify');

const router = express.Router();

/**
 * Get some tracks by name and artist
 */
router.get('/:name/:artist', async (req, res) => {
    const name = req?.params?.name?.length !== 0 ? req.params.name : undefined;
    const artist = req?.params?.artist?.length !== 0 ? req.params.artist : undefined;

    if (!name || !artist) {
        return res.status(400).json({ error: 'Invalid name or artist' });
    }

    const tracks = await getSomeTracksByNameAndArtist(name, artist);
    
    return res.json(tracks);
});






module.exports = router;