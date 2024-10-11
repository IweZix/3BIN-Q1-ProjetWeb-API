const express = require('express');
const { getSomeTracksByNameAndArtist,
    getSomeTracksByName,
    getImage
} = require('../models/spotify');

const router = express.Router();

/**
 * Get some tracks by name and artist
 */
router.get('/tracks/:name/:artist', async (req, res) => {
    const name = req?.params?.name?.length !== 0 ? req.params.name : undefined;
    const artist = req?.params?.artist?.length !== 0 ? req.params.artist : undefined;

    if (!name || !artist) {
        return res.status(400).json({ error: 'Invalid name or artist' });
    }

    const tracks = await getSomeTracksByNameAndArtist(name, artist);
    
    return res.json(tracks);
});

/**
 * Get some tracks by name
 */
router.get('/tracks/:name', async (req, res) => {
    const name = req?.params?.name?.length !== 0 ? req.params.name : undefined;
    console.log(name);

    if (!name) {
        return res.status(400).json({ error: 'Invalid name' });
    }

    const tracks = await getSomeTracksByName(name);
    
    return res.json(tracks);
});

router.get('/image/:id', async (req, res) => {
    const id = req?.params?.id?.length !== 0 ? req.params.id : undefined;
    console.log(id);

    if (!id) {
        return res.status(400).json({ error: 'Invalid ID' });
    }

    const image = await getImage(id);
    
    return res.json(image);
});





module.exports = router;