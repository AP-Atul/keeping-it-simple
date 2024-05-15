import * as hapi from '@hapi/hapi'
import { StorageService } from 'src/integrations/storage/storage_service'
import { v4 as uuidv4 } from 'uuid'
import * as responses from '../utils/responses'
import * as repo from './repo'

export const upload =
  (storage: StorageService, bucket: string) =>
  async (
    request: hapi.Request,
    h: hapi.ResponseToolkit
  ): Promise<hapi.ResponseObject> => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const file = (request.payload as any).file
    const fileId = uuidv4()
    const filename = file.hapi.filename
    const extension = filename.split('.').pop()
    const newFileName = `${fileId}.${extension}`
    const details = {
      id: fileId,
      originalFilename: filename,
      fileName: newFileName,
      mimeType: file.hapi.headers['content-type'],
      content: file,
      bucket: bucket
    }
    const uploaded = await storage.upload(details)
    if (uploaded) {
      await repo.save({
        id: fileId,
        name: newFileName,
        bucket: bucket,
        metadata: uploaded
      })
      return responses.data(h, uploaded)
    } else {
      return responses.error(h, 'file-failed-to-upload', 'Error uploading file')
    }
  }
