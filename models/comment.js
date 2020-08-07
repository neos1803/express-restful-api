'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Post, { foreignKey: "id" })
      this.belongsTo(models.Author, { foreignKey: "id" })
    }
  };
  Comment.init({
    content: DataTypes.STRING,
    status: DataTypes.STRING,
    author_id: DataTypes.INTEGER,
    email: DataTypes.STRING,
    url: DataTypes.STRING,
    post_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};