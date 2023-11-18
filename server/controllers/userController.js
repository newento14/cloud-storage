const userService = require('../services/userService')
const {validationResult} = require('express-validator')
const serverError = require('../exception/serverError')

class UserController {
  async registration(req, res, next){
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(serverError.BadRequest('Validation error', errors.array()))
      }
      const {username,email, password} = req.body;
      console.log(req.body);
      const data = await userService.registration(username,email,password);
      console.log(data);
      res.cookie('refreshToken', data.refreshToken, {maxAge: 60 * 24 * 60 * 60 * 1000, httpOnly: true});
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next){
    try {
      const {email, password} = req.body;
      const data = await userService.login(email,password);
      res.cookie('refreshToken', data.refreshToken, {maxAge: 60 * 24 * 60 * 60 * 1000, httpOnly: true});
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next){
    try {
      const {refreshToken} = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const {refreshToken} = req.cookies;
      console.log(refreshToken);
      const data = await userService.logout(refreshToken)
      res.clearCookie('refreshToken')
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();