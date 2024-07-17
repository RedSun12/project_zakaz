'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recept extends Model {
    static associate({ User }) {
      this.belongsToMany(User, {
        through: 'Favorites',
        foreignKey: 'idRecept',
      });
    }
  }

  Recept.init(
    {
      image: DataTypes.STRING,
      title: DataTypes.STRING,
      ingredients: DataTypes.STRING,
      quantityOfIngredients: DataTypes.INTEGER,
      time: DataTypes.INTEGER,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Recept',
    }
  );
  return Recept;
};
