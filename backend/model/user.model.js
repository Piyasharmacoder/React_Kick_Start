import { DataTypes } from "sequelize";
import sequelize from "../db/dbconfigration.js";
import bcyrpt from "bcryptjs";

const User = sequelize.define("user", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
            let saltkey = bcyrpt.genSaltSync(10);
            let encryptedPassword = bcyrpt.hashSync(value, saltkey);
            this.setDataValue("password", encryptedPassword);
        }
    },
    contactNumber: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true,
    },
   
    
    rollId:{
        type: DataTypes.INTEGER,
        references: {
            model: 'Rolls',
            key: 'id'
        }
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
});
User.checkPassword = (originalPassword, encryptedPassword) => {
    console.log("check Password called....");
    return bcyrpt.compareSync(originalPassword, encryptedPassword);
}

// syn the  model with the database
sequelize.sync()
.then(()=>{
 console.log("User table created....!");
})
.catch((error)=>{ 
 console.log("Failed to create User table",error);
});

export default User;