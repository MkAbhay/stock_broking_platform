module.exports = (sequelize, DataTypes) => {
  const rm = sequelize.define(
    "rm",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      employee_code: {
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
      role: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: "employee",
      },
    },
    {
      tableName: "rm",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  );

  rm.associate = (models) => {
    rm.hasMany(models.rm_client_mapping, {
      foreignKey: "rm_id",
      as: "client_mappings",
    });
  };

  return rm;
};
