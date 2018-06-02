/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('menu', {
    menuId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    menuName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    authId: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    type: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'menu'
  });
};
