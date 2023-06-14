"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Doctor_Clicnic_Speacialty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Doctor_Clicnic_Speacialty.init(
    {
      doctorId: DataTypes.INTEGER,
      clinicId: DataTypes.INTEGER,
      specalityId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Doctor_Clicnic_Speacialty",
    }
  );
  return Doctor_Clicnic_Speacialty;
};
