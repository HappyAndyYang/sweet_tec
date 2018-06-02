/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('order', {
    Id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    mobile: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'order'
  });
};
