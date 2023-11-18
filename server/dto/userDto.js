module.exports = class userDto {
  id;
  email;

  constructor(user) {
    this.id = user.id;
    this.email = user.email;
  }
}