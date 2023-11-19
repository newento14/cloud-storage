const fileService = require('../services/fileService')
const serverError = require('../exception/serverError')
const fs = require('fs')

class FileController {
  async createFolder(req, res, next) {
    try {
      const {pathId, pathName} = req.body;
      const folder = await fileService.createFolder(pathId, pathName, req.user.id);
      return res.json(folder);

    } catch (e) {
      next(e);
    }
  }

  async getAllFiles(req, res, next) {
    try {
      const {pathId, pathName} = req.body;
      console.log(pathId, pathName);
      const files = await fileService.getFiles(pathId, pathName, req.user.id);
      return res.json(files);
    } catch (e) {
      next(e);
    }
  }

  async setStarred(req, res, next) {
    try {
      const {id, state} = req.body;
      await fileService.setStarred(id, state);
      return res.json({message: "ok"})
    } catch (e) {
      next(e);
    }
  }

  async uploadFile(req, res, next) {
    try {
      const file = req.files.file
      const {fileName, pathId, pathName, storageSize, storageUsed} = req.body;
      const dbFile = await fileService.uploadFile(fileName, file, pathId, pathName, storageSize, storageUsed, req.user.id);
      return res.json(dbFile);
    } catch (e) {
      next(e);
    }
  }

  async downloadFile(req, res, next) {
    try {
      const {path} = req.query;
      const fullPath = fileService.getFullPath(path, req.user.id);
      console.log(fullPath);
      if (fs.existsSync(fullPath)) {

        return res.download(fullPath, fullPath.split('\\').pop());
      } else {
        throw serverError.BadRequest('download error');
      }

    } catch (e) {
      next(e);
    }
  }

  async deleteFile(req, res, next) {
    try {
      const {path, id} = req.query;
      const file = await fileService.deleteFile(path, id, req.user.id);
      return res.json(file);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new FileController();