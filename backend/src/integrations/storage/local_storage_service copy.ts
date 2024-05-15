import * as fs from 'fs'
import path from 'path'
import config from '../../config'
import { FileDetails, FileStorageResponse, StorageService } from './storage_service'

export class LocalStorageService extends StorageService {
  async upload(file: FileDetails): Promise<FileStorageResponse | undefined> {
    try {
      if (!fs.existsSync(config.storage.local.directory)) {
        fs.mkdirSync(config.storage.local.directory)
      }
      const filePath = path.join(config.storage.local.directory, file.fileName)
      const fileStream = fs.createWriteStream(filePath)
      return new Promise((resolve, reject) => {
        file.content.on('error', function (err) {
          reject(err)
        })

        file.content.pipe(fileStream)

        file.content.on('end', () => {
          resolve({
            id: file.id,
            path: filePath
          })
        })
      })
    } catch (err) {
      console.log(`storage-error : `, err)
      return undefined
    }
  }
}
