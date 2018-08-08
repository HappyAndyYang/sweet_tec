/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('lbutton', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    text: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    value: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    x: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    y: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    deviceId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    lbuttonId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'lbutton'
  });
};
