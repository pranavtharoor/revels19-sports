module.exports = (sequelize, DataTypes) => {
  let SportContact = sequelize.define('sportContact', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phno: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return SportContact;
};
