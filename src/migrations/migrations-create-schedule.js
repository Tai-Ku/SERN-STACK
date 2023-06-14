"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // currentNumber: DataTypes.INTEGER,
    // maxNumber: DataTypes.INTEGER,
    // c: DataTypes.DATE,
    // timeType: DataTypes.STRING,
    await queryInterface.createTable("schedules", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      currentNumber: {
        type: Sequelize.INTEGER,
      },
      maxNumber: {
        type: Sequelize.INTEGER,
      },
      doctortId: {
        type: Sequelize.INTEGER,
      },
      timeType: {
        type: Sequelize.STRING,
      },

      date: {
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
    await queryInterface.dropTable("schedules");
  },
};
