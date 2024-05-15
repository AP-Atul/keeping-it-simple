import config from './config'
import { AWSStorageService } from './integrations/storage/aws_storage_service'
import { LocalStorageService } from './integrations/storage/local_storage_service copy'
import { init } from './server'

process.on('uncaughtException', (error: Error) => {
  console.error(`uncaughtException ${error.message}`)
})

process.on('unhandledRejection', (reason: string) => {
  console.error(`unhandledRejection ${reason}`)
})

const start = async () => {
  console.log('LOADED STORAGE SERVICE = ', config.storage.service)
  const storage =
    config.storage.service === 'local'
      ? new LocalStorageService()
      : new AWSStorageService()

  const server = await init(storage)
  await server.start()
  console.log('Server running at: ', server.info.uri)
}

start().catch((err: unknown) => {
  console.error('Error starting server: ', err)
  throw err
})
