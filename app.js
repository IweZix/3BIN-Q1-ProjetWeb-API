const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const corsOptions = {
  origin: ['http://localhost:8080'],
};

const authsRouter = require('./routes/auths');
const playlistsRouter = require('./routes/playlists');
const spotifyRouter = require('./routes/spotify');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors(corsOptions));

app.use('/auths', authsRouter);
app.use('/playlists', playlistsRouter);
app.use('/spotify', spotifyRouter);

module.exports = app;
