const router = require('express').Router();
const { Favorite } = require('../../db/models');
const { Recept } = require('../../db/models');
const { User } = require('../../db/models');
const { verifyAccessToken } = require('../middlewares/verifyToken');

router
  .post('/newOrder', verifyAccessToken, async (req, res) => {
    const { idUser, idRecept } = req.body;
    try {
      const order = await Favorite.create({ idUser, idRecept });
      res.json(order);
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
  })
  .get('/:id', verifyAccessToken, async (req, res) => {
    const { id } = req.params;
    try {
      const order = await User.findAll({
        where: { id },
        include: {
          model: Recept,
          attributes: ['id', 'title', 'image', 'quantityOfIngredients', 'time'],
        },
      });
      res.json(order[0].Recepts);
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
  })
  .delete('/:id', verifyAccessToken, async (req, res) => {
    const { id } = req.params;
    try {
      const order = await Favorite.findOne({ where: { idRecept: id } });
      order.destroy();
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
  });

module.exports = router;