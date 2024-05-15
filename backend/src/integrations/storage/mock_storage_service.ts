import path from 'path'
import config from '../../config'
import { FileDetails, FileStorageResponse, StorageService } from './storage_service'

export class MockStorageService extends StorageService {
  async upload(file: FileDetails): Promise<FileStorageResponse | undefined> {
    console.log('uploading file ', file.fileName)
    if (file.originalFilename.includes('fail')) {
      return undefined
    }
    const filePath = path.join(config.storage.local.directory, file.fileName)
    return {
      id: file.id,
      path: filePath
    }
  }
}
