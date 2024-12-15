import { createContext, ReactNode, useState } from "react"
import { ConnectionContextType } from "../interfaces/ConnectionContextType"
import { Connection } from "../interfaces/Connection"
import axios from "axios"
const { VITE_CONNECTION_URI } = import.meta.env

export const ConnectionContext = createContext<ConnectionContextType>(
  {} as ConnectionContextType
)

const ConnectionContextProvider = ({ children }: { children: ReactNode }) => {
  const [connections, setConnections] = useState<Connection[]>([])

  const getConnections = async () => {
    const res = await axios.get(`${VITE_CONNECTION_URI}/connections/`)

    setConnections(res.data)
  }

  const testConnection = (connection: Connection) => {
    console.log("testConnection")
    return true
  }

  const createConnection = (connection: Connection) => {
    console.log("createConnection")
  }

  const deleteConnection = (connection: Connection) => {
    console.log("deleteConnection")
  }

  return (
    <ConnectionContext.Provider
      value={{
        connections,
        getConnections,
        testConnection,
        createConnection,
        deleteConnection,
      }}
    >
      {children}
    </ConnectionContext.Provider>
  )
}
export default ConnectionContextProvider
