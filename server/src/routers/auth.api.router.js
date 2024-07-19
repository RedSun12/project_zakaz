const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../db/models');
const cookieConfig = require('../configs/cookiesConfig');
const generateTokens = require('../utils/generateToken');

router.post('/signup', async (req, res) => {
  const { username, email, password, isSeller = false } = req.body;

  if (!(username && email && password)) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const [user, isCreated] = await User.findOrCreate({
      where: { email },
      defaults: {
        username,
        email,
        password: await bcrypt.hash(password, 10),
        isSeller,
      },
    });

    if (!isCreated) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const plainUser = user.get();
    delete plainUser.password;

    const { accessToken, refreshToken } = generateTokens({ user: plainUser });

    res
      .cookie('refreshToken', refreshToken, cookieConfig.refresh)
      .json({ user: plainUser, accessToken });
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(401).json({ message: 'No user find' });
  }
  const isCorrectPassword = await bcrypt.compare(password, user.password);

  if (!isCorrectPassword) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }
  const plainUser = user.get();
  delete plainUser.password;

  const { accessToken, refreshToken } = generateTokens({ user: plainUser });

  res
    .cookie('refreshToken', refreshToken, cookieConfig.refresh)
    .json({ user: plainUser, accessToken });
});

router.get('/logout', async (req, res) => {
  try {
    res.clearCookie('refreshToken').sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});

module.exports = router;