const {User} = require('../models/index')
const bcrypt = require('bcrypt')
const tokenService = require('./tokenService')
const UserDto = require('../dto/userDto')
const {where} = require("sequelize");
const fileService = require('./fileService')
const serverError = require('../exception/serverError')

class UserService {
  async registration(username, email, password) {
    const user = await User.findOne({where: {email: email}});
    if (user) {
      throw serverError.BadRequest(`User with ${email} alredy exist`);
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const newUser = await User.create({username, email, password: hashPassword});
    await fileService.createFolderNewUser(newUser.id);
    return new UserDto(newUser);
  }

  async login(email, password) {
    const user = await User.findOne({where: {email: email}});
    if (!user) {
      throw serverError.BadRequest(`User with ${email} does not exist`)
    }

    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw serverError.BadRequest('Wrong password');
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({...userDto});

    await tokenService.saveToken(user.id, tokens.refreshToken);

    return {
      user: userDto,
      ...tokens,
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
    console.log(tokenData, tokenFromDb);
    if (!tokenData || !tokenFromDb) {
      throw serverError.UnauthorizedError();
    }
    const user = await User.findOne({where: {id: tokenData.id}});
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({...userDto});

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {user: userDto, ...tokens}
  }
}

module.exports = new UserService();