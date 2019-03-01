module.exports = (sequelize, DataTypes) => {
  let Sport = sequelize.define('sport', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    sport: {
      type: DataTypes.STRING,
      allowNull: false
    },
    college: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    teamSize: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    collegePEContact: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    order_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: false
    },
    referral: {
      type: DataTypes.STRING,
      allowNull: true
    },
    banned: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    }
    // bankAccountNumber: {
    //   type: DataTypes.STRING,
    //   allowNull: false
    // },
    // bankIFSCCode: {
    //   type: DataTypes.STRING,
    //   allowNull: false
    // },
    // bankName: {
    //   type: DataTypes.STRING,
    //   allowNull: false
    // },
    // bankAccountType: {
    //   type: DataTypes.ENUM('Savings', 'Current'),
    //   allowNull: false
    // }
  });

  Sport.associate = models => {
    models.sport.hasMany(models.sportContact);
  };

  return Sport;
};
