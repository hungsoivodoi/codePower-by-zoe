'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Classes extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Classes.belongsTo(models.User, { foreignKey: 'teacherId' })
            Classes.hasMany(models.ClassStudent, { foreignKey: 'classId' })
            Classes.hasMany(models.ClassRating, { foreignKey: 'classId' })
        }
    }
    Classes.init({
        title: DataTypes.STRING,
        currentStudent: DataTypes.STRING,
        maxStudent: DataTypes.STRING,
        date: DataTypes.DATE,
        teacherId: DataTypes.INTEGER,
        type: DataTypes.STRING,
        speciality: DataTypes.STRING,
        image: DataTypes.STRING,
        description: DataTypes.TEXT,
        status: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Classes',
    });
    return Classes;
};