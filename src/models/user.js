/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    passWord: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    roleId: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    token: {
      type: DataTypes.STRING(10000),
      allowNull: true
    },
    secret: {
      type: DataTypes.STRING(1000),
      allowNull: true
    }
  }, {
    tableName: 'user'
  });
};
