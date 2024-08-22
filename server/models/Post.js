const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Ajustez le chemin si nécessaire

class Post extends Model {}

Post.init({
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    photo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'Post',
});

module.exports = Post;
