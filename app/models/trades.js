module.exports = (sequelize, DataTypes) => {
  const trades = sequelize.define(
    "trades",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      trade_id: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
      },
      client_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      date: {
        type: "TIMESTAMP",
        allowNull: false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      symbol: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0,
      },
      brokerage: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0,
      },
    },
    {
      tableName: "trades",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  );

  trades.associate = (models) => {
    trades.belongsTo(models.clients, {
      foreignKey: "client_id",
      as: "client",
    });
  };

  return trades;
};
