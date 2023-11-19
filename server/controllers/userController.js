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
      return res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next){
    try {
      const {email, password} = req.body;
      const data = await userService.login(email,password);
      console.log(data);
      res.cookie('refreshToken', data.refreshToken, {maxAge: 60 * 24 * 60 * 60 * 1000, httpOnly: true});
      return res.json({
        user: data.user,
        token: data.accessToken,
      });
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next){
    try {
      const {refreshToken} = req.cookies;
      const userData = await userService.refresh(refreshToken);
      console.log('userdata=', userData);
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
      return res.json({
        user: userData.user,
        token: userData.accessToken,
      });
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