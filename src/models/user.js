const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'user',
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
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        //unique: true,
      },
      address: {
        type: DataTypes.STRING,
        defaultValue: '',
      },
      img: {
        type: DataTypes.STRING,
        defaultValue: '',
      },
      google: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      role: {
        type: DataTypes.ENUM(['USER', 'ADMIN', 'SUPER_ADMIN']),
        defaultValue: 'USER',
      },
    },
    {
      timestamps: false,
    }
  );
};
