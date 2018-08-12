/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('checkbox', {
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
    checkboxid: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    checkedFlag: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  }, {
    tableName: 'checkbox'
  });
};
