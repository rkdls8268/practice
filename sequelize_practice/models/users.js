const sequelize = require('sequelize');
const { Sequelize } = require('.');

module.exports = ((sequelize, DataTypes) => {
    return sequelize.define('user', {
        userId: {
            type: DataTypes.STRING(15),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(40),
            allowNull: false,
        },
        nickname: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
        passwd: {
            type: DataTypes.STRING(256),
            allowNull: false,
        },
        profileImg: {
            type: DataTypes.STRING(200),
            allowNull: true
        }
    }, {
        timestamps: true,
        paranoid: true, // 삭제일 (복구용)
    })
});