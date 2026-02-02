import Roll from "./roll.model.js";
import User from "./user.model.js";

// A Roll can have many Users
Roll.hasMany(User, {
    foreignKey: "rollId", // Foreign key in the User table
    as: "users" // Alias for the association
});

// A User belongs to a Roll
User.belongsTo(Roll, {
    foreignKey: "rollId", // Foreign key in the User table
    as: "roll" // Alias for the association
});

export { User, Roll };