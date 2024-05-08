'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ClassStudent extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            ClassStudent.belongsTo(models.User, { foreignKey: 'studentId' })
            ClassStudent.belongsTo(models.Classes, { foreignKey: 'classId' })
        }
    }
    ClassStudent.init({
        teacherId: DataTypes.INTEGER,
        studentId: DataTypes.INTEGER,
        classId: DataTypes.INTEGER,
        status: DataTypes.STRING,
        reason: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'ClassStudent',
    });
    return ClassStudent;
};