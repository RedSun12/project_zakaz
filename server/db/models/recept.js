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
      idAPI: DataTypes.INTEGER,
      image: DataTypes.STRING,
      title: DataTypes.STRING,
      ingredients: DataTypes.TEXT,
      quantityOfIngredients: DataTypes.INTEGER,
      time: DataTypes.INTEGER,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Recept',
    }
  );
  return Recept;
};
