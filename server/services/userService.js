const {User} = require('../models/index')
const bcrypt = require('bcrypt')
const tokenService = require('./tokenService')
const UserDto = require('../dto/userDto')
const {where} = require("sequelize");
const serverError = require('../exception/serverError')

class UserService {
  async registration(username, email, password) {
    const user = await User.findOne({where: {email: email}});
    if (user) {
      throw serverError.BadRequest(`User with ${email} alredy exist`);
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const newUser = await User.create({username, email, password: hashPassword});

    const userDto = new UserDto(newUser);
    const tokens = tokenService.generateTokens({...userDto});

    await tokenService.saveToken(newUser.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    }
  }

  async login(email, password) {
    const user = await User.findOne({where: {email: email}});
    if (!user) {
      throw serverError.BadRequest(`User with ${email} does not exist`)
    }

    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw serverError.BadRequest('Неверный пароль');
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({...userDto});

    await tokenService.saveToken(user.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    }
  }

  async logout(refreshToken) {
    return await tokenService.removeToken(refreshToken);
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw serverError.UnauthorizedError();
    }
    const tokenData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!tokenData || !tokenFromDb) {
      throw serverError.UnauthorizedError();
    }
    const user = await User.findOne({where: {id: tokenData.id}});
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({...userDto});

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {...tokens, user: userDto}
  }

}

module.exports = new UserService();