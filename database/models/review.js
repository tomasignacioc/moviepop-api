'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Review.init({
    movieId: DataTypes.STRING,
    text: DataTypes.STRING,
    score: {
      type: DataTypes.FLOAT,
      validate: {
        min: 0,
        max: 5
      }
    },
    username: DataTypes.STRING
  }, {
    sequelize,
    paranoid: true,
    timestamps: true,
    modelName: 'Review',
  });
  return Review;
};