export interface FileDetails {
  id: string
  originalFilename: string
  fileName: string
  mimeType: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any
  bucket: string
}

export interface FileStorageResponse {
  id: string
  path: string
  metadata?: object
}

export abstract class StorageService {
  abstract upload(file: FileDetails): Promise<FileStorageResponse | undefined>
}
