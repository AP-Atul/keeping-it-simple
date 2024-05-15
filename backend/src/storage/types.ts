export type FileAPIResponseCodes = 'file-uploaded' | 'file-failed-to-upload'

export interface SaveFile {
  id: string
  name: string
  bucket?: string
  metadata: object
}

export interface StorageFile extends SaveFile {
  created_at: string
}
