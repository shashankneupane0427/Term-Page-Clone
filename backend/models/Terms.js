import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Terms = sequelize.define("Terms", {
  language: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  content: {
    type: DataTypes.JSONB, // store JSON directly
    allowNull: false
  }
});

export default Terms;
