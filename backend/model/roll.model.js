import { DataTypes } from "sequelize";
import sequelize from "../db/dbconfigration.js";

// define Roll model
const Roll = sequelize.define("roll", {

    // Model attributes
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
    ,
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }

});
sequelize.sync()
    .then(() => {
        console.log("user table created.....");
    })
    .catch((error) => {
        console.log("user somthing wrong....");
        console.log(error);
    });
    
    // Export the model for use in other files

export default Roll;


