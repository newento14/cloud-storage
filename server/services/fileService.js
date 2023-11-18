const { File } = require('../models/index')
const path = require('path')
const serverError = require('../exception/serverError')
const fs = require('fs')
const uuid = require('uuid')
const getCurrentDate = require('../utils/getCurrentDate')
const {Sequelize} = require("sequelize");

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

    const file = await File.create({name: folderName, type: 'dir', size: 0, private: true, link: uuid.v4(), date: getCurrentDate(), starred: false, userId, parentId})
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
    return await File.findAll({where: {userId: userId, parentId: 0}, order: [
        ['starred', 'DESC'],
        [Sequelize.literal('CASE WHEN "type" = \'dir\' THEN 0 ELSE 1 END'), 'ASC']
      ],});
  }

  async getFilesByParentId(parentId) {
    return await File.findAll({where: {parentId: parentId}, order: [
        ['starred', 'DESC'],
        [Sequelize.literal('CASE WHEN "type" = \'dir\' THEN 0 ELSE 1 END'), 'ASC']
      ],});
  }

  async setStarred(id, state) {
    try {
      const file = await File.findOne({where: {id: id}});
      file.starred = state;
      await file.save();
    } catch (e) {
      throw serverError.BadRequest('file does not exits')
    }
  }

  async deleteFile(filePath, id) {
    try {
      const fullPath = path.join(filesPath, filePath);
      const file = await File.findOne({where: {id: id}});

      if (file.type === 'dir') {
        fs.rmdirSync(fullPath);
      } else {
        fs.unlinkSync(fullPath);
      }

      return file;
    } catch (e) {
      throw serverError.BadRequest('file does not exits')
    }
  }
}

module.exports = new FileService();