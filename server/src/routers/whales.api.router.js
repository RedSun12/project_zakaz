const router = require('express').Router();
const { Whale } = require('../../db/models');
const { verifyAccessToken } = require('../middlewares/verifyToken');

router
  .get('/', async (req, res) => {
    try {
      const entries = await Whale.findAll();
      res.json(entries);
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
  })
  .post('/', verifyAccessToken, async (req, res) => {
    const { name, description, user } = req.body;
    console.log(req.body);
    try {
      const entry = await Whale.create({ name, description, userId: user });
      res.json(entry);
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
  })
  .delete('/:id', verifyAccessToken, async (req, res) => {
    const { id } = req.params;

    try {
      const whale = await Whale.findByPk(id);
      if (res.locals.user.id === whale.userId) {
        whale.destroy();
        res.sendStatus(200);
      } else {
        res.sendStatus(403);
      }
    } catch (error) {
      console.error(error);
      res.json(400);
    }
  });

module.exports = router;
