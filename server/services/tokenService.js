const jwt = require('jsonwebtoken')
const {Token} = require('../models/index')

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY, {expiresIn: "30m"});
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY, {expiresIn: "60d"})

    return {
      accessToken,
      refreshToken
    }
  }

  validateAccessToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_ACCESS_KEY);
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_REFRESH_KEY);
    } catch (e) {
      return null;
    }
  }

  async saveToken(id, refreshToken) {
    const data = await Token.findOne({where: {userId: id}})
    if (data) {
      data.refreshToken = refreshToken;
      return data.save();
    }
    return await Token.create({userId: id, refreshToken: refreshToken});
  }

  async removeToken(refreshToken) {
    return await Token.destroy({where: {refreshToken: refreshToken}});
  }

  async findToken(refreshToken) {
    return await Token.findOne({where: {refreshToken: refreshToken}});
  }
}

module.exports = new TokenService();