const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  email: {type: DataTypes.STRING, maxLength: 255, unique: true},
  password: {type: DataTypes.STRING, maxLength: 256},
  storageSize: {name: 'storage-size', type: DataTypes.BIGINT, defaultValue: 10737418240 },
  storageUsed: {name: 'storage-used', type: DataTypes.BIGINT, defaultValue: 0}
})

const File = sequelize.define('file', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, maxLength: 256},
  type: {type: DataTypes.STRING, maxLength: 256},
  size: {type: DataTypes.BIGINT },
  private: {type: DataTypes.BOOLEAN },
  link: {type: DataTypes.STRING, maxLength: 256},
  date: {type: DataTypes.STRING, maxLength: 256},
  starred: {type: DataTypes.BOOLEAN, defaultValue: false},
  userId: {type: DataTypes.INTEGER},
  parentId: {type: DataTypes.INTEGER}
})

const Token = sequelize.define('token', {
  refreshToken : {type: DataTypes.STRING, require: true}
})

User.hasOne(Token)
Token.belongsTo(User)

User.hasMany(File)
File.belongsTo(User)

module.exports = {
  User,
  File,
  Token
}