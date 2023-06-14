"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // currentNumber: DataTypes.INTEGER,
    // maxNumber: DataTypes.INTEGER,
    // c: DataTypes.DATE,
    // timeType: DataTypes.STRING,
    await queryInterface.createTable("specialties", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      description: {
        type: Sequelize.TEXT,
      },

      image: {
        type: Sequelize.DATE,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("specialties");
  },
};
