'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class TeacherRating extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            TeacherRating.belongsTo(models.User, { foreignKey: 'teacherId' })
        }
    }
    TeacherRating.init({
        teacherId: DataTypes.INTEGER,
        studentId: DataTypes.INTEGER,
        ratingValue: DataTypes.FLOAT,
    }, {
        sequelize,
        modelName: 'TeacherRating',
    });
    return TeacherRating;
};