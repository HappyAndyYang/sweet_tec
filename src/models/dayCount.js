/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('dayCount', {
    Id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    count: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'dayCount'
  });
};
