const { DataTypes } = require("sequelize")
const { sequelize } = require("../config/dbconnection")

const Transaction = sequelize.define("Transaction", {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM("income", "expense"),
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false    
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
})

module.exports = Transaction