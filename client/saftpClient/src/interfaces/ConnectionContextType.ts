import { Connection } from "./Connection"
import { File as FileType } from "./File"

export interface ConnectionContextType {
  connections: Connection[]
  connection: Connection | null
  setActiveConnection: (id: number) => void
  path: string[]
  setPath: (path: string[]) => void
  getPathString: () => string
  files: FileType[]
  getFiles: () => void
  getConnections: () => void
  testConnection: (connection: Connection) => Promise<boolean>
  createConnection: (connection: Connection) => Promise<boolean>
  deleteConnection: (connection: Connection) => void
  downloadFile: (path: string[]) => Promise<string>
}
