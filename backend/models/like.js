'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.like.belongsTo(models.user, {onDelete: 'CASCADE'}),
      models.like.belongsTo(models.post, {onDelete: 'CASCADE'})

    }
  };
  like.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model:'user',
        key:'id'
      }
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model:'post',
        key:'id'
      }
    }
  }, {
    sequelize,
    modelName: 'like',
    freezeTableName: true
  });
  return like;
};