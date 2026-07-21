module.exports = (sequelize, DataTypes) => {
  const clients = sequelize.define(
    "clients",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      client_code: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },
      pan: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
    },
    {
      tableName: "clients",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  );

  clients.associate = (models) => {
    clients.hasOne(models.rm_client_mapping, {
      foreignKey: "client_id",
      as: "rm_mapping",
    });

    clients.hasMany(models.trades, {
      foreignKey: "client_id",
      as: "trades",
    });
  };

  return clients;
};
