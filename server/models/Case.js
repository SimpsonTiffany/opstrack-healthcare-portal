const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const Case = sequelize.define("Case", {
    clientId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    caseType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    priority: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: "New"
    }
});

// Association
Case.belongsTo(User, { as: "assignedTo" });

module.exports = Case;