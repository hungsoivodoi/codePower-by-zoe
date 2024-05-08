'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class PendingUser extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    PendingUser.init({
        password: DataTypes.STRING,
        email: DataTypes.STRING,
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        address: DataTypes.STRING,
        gender: DataTypes.BOOLEAN,
        roleId: DataTypes.STRING,
        image: DataTypes.STRING,
        phoneNumber: DataTypes.STRING,
        positionId: DataTypes.STRING,
        speciality: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'PendingUser',
    });
    return PendingUser;
};