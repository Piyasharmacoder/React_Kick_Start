import { Sequelize } from "sequelize";

// initialize sequelize with database connection  code using Sequelize
const sequelize = new Sequelize(
    "reactappstart", // Database name
    "root",          // Username from environment variable
    "Piya@20"      // Password from environment variable
    ,
    {
        host: "localhost", // Database type of host
        dialect: "mysql", // datbase type  
        timezone: "+05:30" // set timezone
    });

// check if database connection is established successfully or not 
sequelize.authenticate()
    .then(() => {
        console.log("Database connection has been established successfully.");
    })
    .catch((error) => {
        console.log("Database connection Failed....! : ", error);
    });
export default sequelize;


// db - database connection

// model - tables create

// controller - data transfer

// routes - controll routes

// app - conect



