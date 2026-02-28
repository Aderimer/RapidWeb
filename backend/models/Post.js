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
        date: {
            type: Sequelize.DataTypes.STRING,
            defaultValue: "Dato kommer"
        },
        time: {
            type: Sequelize.DataTypes.STRING,
            defaultValue: "Tid kommer på snap"
        },
        lokasjon: {
            type: Sequelize.DataTypes.STRING,
            defaultValue: "Lokasjon kommer på snap"
        }
    });
    return Post
}