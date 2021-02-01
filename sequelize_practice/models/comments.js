const sequelize = require('sequelize');
const { Sequelize } = require('.');

module.exports = ((sequelize, DataTypes) => {
    return sequelize.define('comment', {
        user: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        content: {
            type: DataTypes.STRING(300),
            allowNull: false
        }
    }, {
        timestamps: true,
        paranoid: true, // 삭제일 (복구용)
    })
});