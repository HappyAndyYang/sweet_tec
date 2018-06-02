/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('role', {
    roleId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    role: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    authId: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    tableName: 'role'
  });
};
