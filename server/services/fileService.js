const {File, User} = require('../models/index')
const path = require('path')
const serverError = require('../exception/serverError')
const fs = require('fs')
const uuid = require('uuid')
const getCurrentDate = require('../utils/getCurrentDate')
const {Sequelize, BIGINT} = require("sequelize");

const filesPath = path.join(__dirname, '..', '/files');

class FileService {
  async createFolder(pathId, pathName, userId) {
    const pathIdSplit = pathId.split('\\');
    let parentId = 0;
    if (pathIdSplit.length > 2) {
      parentId = pathIdSplit[pathIdSplit.length - 2];
    }

    const folderPath = path.join(filesPath, pathName);
    if (fs.existsSync(folderPath)) {
      throw serverError.BadRequest(`folder already exist`);
    }

    console.log(folderPath);
    const folderName = pathName.split('\\').pop()

    const file = await File.create({
      name: folderName,
      type: 'dir',
      size: 0,
      private: true,
      link: uuid.v4(),
      date: getCurrentDate(),
      starred: false,
      userId,
      parentId
    })
    fs.mkdirSync(folderPath);
    return file;
  }

  async getFiles(pathId, pathName, userId) {
    const pathIdSplit = pathId.split('\\');
    let parentId = 0;
    if (pathIdSplit.length > 2) {
      parentId = pathIdSplit[pathIdSplit.length - 2];
    }

    if (parentId === 0) {
      return await this.getFilesByUserId(userId);
    } else {
      return await this.getFilesByParentId(parentId);
    }
  }

  async getFilesByUserId(userId) {
    return await File.findAll({
      where: {userId: userId, parentId: 0}, order: [
        ['starred', 'DESC'],
        [Sequelize.literal('CASE WHEN "type" = \'dir\' THEN 0 ELSE 1 END'), 'ASC']
      ],
    });
  }

  async getFilesByParentId(parentId) {
    return await File.findAll({
      where: {parentId: parentId}, order: [
        ['starred', 'DESC'],
        [Sequelize.literal('CASE WHEN "type" = \'dir\' THEN 0 ELSE 1 END'), 'ASC']
      ],
    });
  }

  async setStarred(id, state) {
    try {
      const file = await File.findOne({where: {id: id}});
      file.starred = state;
      await file.save();
    } catch (e) {
      console.log(e.message);
      throw serverError.BadRequest('file does not exits')
    }
  }

  async uploadFile(file, pathId, pathName, storageSize, storageUsed, userId) {
    try {
      if (file === null || file.size === 0) {
        throw serverError.BadRequest('File is empty');
      }
      if (file.size + Number(storageUsed) > Number(storageSize)) {
        throw serverError.BadRequest('There no space on the disk')
      }

      let filePath;
      if (pathName !== "") {
        filePath = path.join(filesPath, userId.toString(), pathName, file.name)
      } else {
        filePath = path.join(filesPath, userId.toString(), file.name)
      }
      if (fs.existsSync(filePath)) {
        throw serverError.BadRequest('file already exist');
      }
      file.mv(filePath);

      const type = file.name.split('.').pop();
      await this.updateStorageSize(userId, file.size);

      let parentId = 0;
      if (pathId !== "") {
        const pathSplit = pathId.split('\\');
        parentId = pathSplit[pathSplit.length - 2];
      }

      const dbFile = new File({
        name: file.name,
        type,
        size: Number(file.size),
        private: true,
        link: uuid.v4(),
        date: getCurrentDate(),
        starred: false,
        userId,
        parentId
      });
      await dbFile.save();

      return dbFile;
    } catch (e) {
      console.log(e.message);
      throw e;
    }
  }

  async createFolderNewUser(userId) {
    fs.mkdirSync(path.join(filesPath, userId.toString()));
  }

  async deleteFile(filePath, id, userId) {
    try {
      const fullPath = path.join(filesPath, userId.toString(), filePath);
      const file = await File.findOne({where: {id: id}});

      await this.updateStorageSize(userId, file.size * -1);

      if (file.type === 'dir') {
        fs.rmdirSync(fullPath);
      } else {
        fs.unlinkSync(fullPath);
      }

      return file;
    } catch (e) {
      console.log(e.message);
      throw serverError.BadRequest('file does not exits')
    }
  }

  async updateStorageSize(userId, size) {
    const user = await User.findOne({where: {id: userId}});
    console.log(size);
    user.storageUsed = Number(size) + Number(user.storageUsed);
    await user.save();
  }
}

module.exports = new FileService();