'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ClassContent extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    ClassContent.init({
        classId: DataTypes.STRING,
        status: DataTypes.STRING,
        w1L: DataTypes.STRING,
        w1C: DataTypes.TEXT,
        w2L: DataTypes.STRING,
        w2C: DataTypes.TEXT,
        w3L: DataTypes.STRING,
        w3C: DataTypes.TEXT,
        w4L: DataTypes.STRING,
        w4C: DataTypes.TEXT,
        w5L: DataTypes.STRING,
        w5C: DataTypes.TEXT,
        w6L: DataTypes.STRING,
        w6C: DataTypes.TEXT,
        w7L: DataTypes.STRING,
        w7C: DataTypes.TEXT,
        w8L: DataTypes.STRING,
        w8C: DataTypes.TEXT,
        w9L: DataTypes.STRING,
        w9C: DataTypes.TEXT,
        w10L: DataTypes.STRING,
        w10C: DataTypes.TEXT,
        w11L: DataTypes.STRING,
        w11C: DataTypes.TEXT,
        w12L: DataTypes.STRING,
        w12C: DataTypes.TEXT,
        w1M: DataTypes.TEXT,
        w2M: DataTypes.TEXT,
        w3M: DataTypes.TEXT,
        w4M: DataTypes.TEXT,
        w5M: DataTypes.TEXT,
        w6M: DataTypes.TEXT,
        w7M: DataTypes.TEXT,
        w8M: DataTypes.TEXT,
        w9M: DataTypes.TEXT,
        w10M: DataTypes.TEXT,
        w11M: DataTypes.TEXT,
        w12M: DataTypes.TEXT,
    }, {
        sequelize,
        modelName: 'ClassContent',
    });
    return ClassContent;
};