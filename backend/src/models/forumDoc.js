'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ForumDoc extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    ForumDoc.init({
        writerId: DataTypes.INTEGER,
        status: DataTypes.STRING,
        contentHTML: DataTypes.TEXT('long'),
        contentMarkDown: DataTypes.TEXT('long'),
        title: DataTypes.STRING,
        type: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'ForumDoc',
    });
    return ForumDoc;
};