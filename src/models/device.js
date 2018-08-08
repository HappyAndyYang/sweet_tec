/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('device', {
    deviceId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    deviceName: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    deviceIp: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  }, {
    tableName: 'device'
  });
};
