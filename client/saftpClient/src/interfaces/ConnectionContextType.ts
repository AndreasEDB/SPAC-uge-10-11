import { Connection } from "./Connection"

export interface ConnectionContextType {
  connections: Connection[]
  getConnections: () => void
  testConnection: (connection: Connection) => boolean
  createConnection: (connection: Connection) => void
  deleteConnection: (connection: Connection) => void
}
