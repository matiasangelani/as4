const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'supplier',
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      img: {
        type: DataTypes.STRING,
        defaultValue: '',
      },
      address: {
        type: DataTypes.STRING,
        defaultValue: '',
      },
    },
    {
      timestamps: false,
    }
  );
};
