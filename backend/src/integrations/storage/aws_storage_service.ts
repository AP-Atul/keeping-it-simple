import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import config from '../../config'
import { FileDetails, FileStorageResponse, StorageService } from './storage_service'

export class AWSStorageService extends StorageService {
  private s3: S3Client
  constructor() {
    super()
    this.s3 = new S3Client({
      credentials: {
        accessKeyId: config.storage.aws.accessKeyId,
        secretAccessKey: config.storage.aws.secretAccessKey
      }
    })
  }

  async upload(file: FileDetails): Promise<FileStorageResponse | undefined> {
    try {
      const response = await this.s3.send(
        new PutObjectCommand({
          Bucket: file.bucket,
          Key: file.fileName,
          Body: file.content,
          ContentDisposition: `attachment; filename=${file.originalFilename}`
        })
      )
      return {
        id: file.id,
        path: response.ETag!,
        metadata: response
      }
    } catch (err) {
      console.log(`storage-error : `, err)
      return undefined
    }
  }
}
