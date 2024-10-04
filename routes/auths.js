const express = require('express');
const { register, login } = require('../models/users');

const router = express.Router();

/* Verify a user */
router.get('/verify', async (req, res) => {
  const token = req?.token?.length !== 0 ? req.token : undefined;

  if (!token) return res.sendStatus(401);
});

/* Register a user */
router.post('/register', async (req, res) => {
  const username = req?.body?.username?.length !== 0 ? req.body.username : undefined;
  const password = req?.body?.password?.length !== 0 ? req.body.password : undefined;

  if (!username || !password) return res.sendStatus(400);

  const authenticatedUser = await register(username, password);

  if (!authenticatedUser) return res.sendStatus(409);

  return res.json(authenticatedUser);
});

/* Login a user */
router.post('/login', async (req, res) => {
  const username = req?.body?.username?.length !== 0 ? req.body.username : undefined;
  const password = req?.body?.password?.length !== 0 ? req.body.password : undefined;

  if (!username || !password) return res.sendStatus(400);

  const authenticatedUser = await login(username, password);

  if (!authenticatedUser) return res.sendStatus(401);

  return res.json(authenticatedUser);
});

module.exports = router;
