module.exports = class userDto {
  id;
  email;
  avatar;
  storageSize;
  storageUsed;

  constructor(user) {
    this.id = user.id;
    this.email = user.email;
    this.avatar = '';
    this.storageSize = user.storageSize;
    this.storageUsed = user.storageUsed;
  }
}