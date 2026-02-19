module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("User", {
    username: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    encryptedPassword: {
      type: Sequelize.DataTypes.BLOB,
      allowNull: true,
    },
    salt: {
      type: Sequelize.DataTypes.BLOB,
      allowNull: true,
    },
  });
  return User;
};