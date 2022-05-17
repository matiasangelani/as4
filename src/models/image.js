const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'image',
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      img: {
        type: DataTypes.STRING,
        defaultValue: '',
        //allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
