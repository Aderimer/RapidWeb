module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("Post", {
        title: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        imgUrl: {
            type: Sequelize.DataTypes.BLOB,
            allowNull: true
        },
        eventDate: {
            type: Sequelize.DataTypes.STRING,
            defaultValue: "Dato kommer"
        }
    });
    return Post
}