'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ClassRating extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            ClassRating.belongsTo(models.Classes, { foreignKey: 'classId' })
        }
    }
    ClassRating.init({
        classId: DataTypes.INTEGER,
        teacherId: DataTypes.INTEGER,
        studentId: DataTypes.INTEGER,
        ratingValue: DataTypes.FLOAT,
    }, {
        sequelize,
        modelName: 'ClassRating',
    });
    return ClassRating;
};