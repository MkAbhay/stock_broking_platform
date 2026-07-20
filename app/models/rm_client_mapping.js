module.exports = (sequelize, DataTypes) => {
  const rm_client_mapping = sequelize.define(
    "rm_client_mapping",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      client_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      rm_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
    },
    {
      tableName: "rm_client_mapping",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      indexes: [
        {
          unique: true,
          fields: ["client_id", "rm_id"],
        },
      ],
    },
  );

  rm_client_mapping.associate = (models) => {
    rm_client_mapping.belongsTo(models.clients, {
      foreignKey: "client_id",
      as: "client",
    });
    rm_client_mapping.belongsTo(models.rm, {
      foreignKey: "rm_id",
      as: "rm",
    });
  };

  return rm_client_mapping;
};
