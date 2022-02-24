'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.comment.belongsTo(models.user, { onDelete: 'CASCADE' }),
        models.comment.belongsTo(models.post, { onDelete: 'CASCADE' })

    }
  };
  comment.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'post',
        key: 'id'
      }
    },
    content: {
      type: DataTypes.STRING(500),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'comment',
    freezeTableName: true
  });
  return comment;
};