const router = require('express').Router();
const { Recept } = require('../../db/models');
const { verifyAccessToken } = require('../middlewares/verifyToken');

router
  .get('/', async (req, res) => {
    try {
      const recepts = await Recept.findAll();
      res.json(recepts);
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
  })
  .get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const product = await Recept.findOne({ where: { id } });
      res.json(product);
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
  })
  .post('/', verifyAccessToken, async (req, res) => {
    const {
      title,
      ingredients,
      description,
      image,
      quantityOfIngredients,
      time,
    } = req.body;
    console.log(req.body);
    try {
      const recept = await Recept.create({
        title,
        ingredients,
        description,
        image,
        quantityOfIngredients,
        time,
      });
      res.json(recept);
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
  })
  .delete('/:id', verifyAccessToken, async (req, res) => {
    const { id } = req.params;
    try {
      const recept = await Recept.findByPk(id);
      recept.destroy();
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.json(400);
    }
  });

module.exports = router;
