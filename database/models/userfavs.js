'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserFavs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserFavs.init({
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id"
      }
    },
    FavMovieId: {
      type: DataTypes.INTEGER,
      references: {
        model: "FavMovies",
        key: "id"
      }
    },
  }, {
    sequelize,
    modelName: 'UserFavs',
  });
  return UserFavs;
};