const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");

/**
 * 定义用户模型
 * @author weirdo
 */
const UserModel = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true, // 是否自增
      primaryKey: true, // 是否为主键
    },
    // Model的属性被定义在这里
    username: {
      type: DataTypes.STRING,
      allowNull: false, // 允许为空
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    createTime: {
      type: DataTypes.DATE,
    },
    updateTime: {
      type: DataTypes.DATE,
    },
  }, // 在定义模型时，还可以指定其他一些属性
  {
    tableName: "user", // 指定数据表的名称
    paranoid: true, // 启用软删除, 指定了 deletedAt 字段的别名为 "isDelete"。
    deletedAt: "isDelete",
    timestamps: false, // 不自动生成创建时间和更新时间字段
  }
);

module.exports = UserModel;

// console.log(User === sequelize.models.User); // true
