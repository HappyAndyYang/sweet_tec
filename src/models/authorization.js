/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('authorization', {
    authId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    authorization: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    url: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    action: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    tableName: 'authorization'
  });
};
