'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ClassNotification extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    ClassNotification.init({
        classId: DataTypes.STRING,
        title: DataTypes.STRING,
        content: DataTypes.TEXT,
        status: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'ClassNotification',
    });
    return ClassNotification;
};