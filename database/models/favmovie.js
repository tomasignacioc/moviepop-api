'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FavMovie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      FavMovie.belongsToMany(models.User, { through: "UserFavs" })
    }
  }
  FavMovie.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
  }, {
    sequelize,
    paranoid: true,
    timestamps: true,
    modelName: 'FavMovie',
  });
  return FavMovie;
};