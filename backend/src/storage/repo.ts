import db from '../db/db'
import { SaveFile, StorageFile } from './types'
const table = 'storage.files'

export const save = async (file: SaveFile): Promise<StorageFile> => {
  return db<StorageFile>(table)
    .insert(file)
    .returning('*')
    .then((rows) => rows[0])
}
