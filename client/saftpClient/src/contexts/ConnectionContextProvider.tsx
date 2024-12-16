import { createContext, ReactNode, useEffect, useState } from "react"
import { ConnectionContextType } from "../interfaces/ConnectionContextType"
import { Connection } from "../interfaces/Connection"
import axios from "axios"
import { File as FileType } from "../interfaces/File"
const { VITE_CONNECTION_URI, VITE_CLIENT_URI } = import.meta.env

export const ConnectionContext = createContext<ConnectionContextType>(
  {} as ConnectionContextType
)

const ConnectionContextProvider = ({ children }: { children: ReactNode }) => {
  const [connections, setConnections] = useState<Connection[]>([])
  const [connection, setConnection] = useState<Connection | null>(null)
  const [files, setFiles] = useState<FileType[]>([])
  const [path, setPath] = useState<string[]>([])

  const getPathString = () => (path.length ? path.join("/") : "/")

  const getConnections = async () => {
    const res = await axios.get(`${VITE_CONNECTION_URI}/`)

    setConnections(res.data)
  }

  const testConnection = async (connection: Connection): Promise<boolean> => {
    const res = await axios.post(`${VITE_CONNECTION_URI}/test/`, connection)
    return res.status === 200
  }

  const createConnection = (connection: Connection) => {
    console.log("createConnection")
  }

  const deleteConnection = (connection: Connection) => {
    console.log("deleteConnection")
  }

  const setActiveConnection = async (id: number) => {
    const res = await axios.get(`${VITE_CONNECTION_URI}/${id}`)
    setConnection(res.data)
  }

  const getFiles = async () => {
    if (connection) {
      const res = await axios.get(
        encodeURI(
          `${VITE_CLIENT_URI}/directory/?path=${getPathString()}&connection=${
            connection?.id
          }`
        )
      )

      setFiles(
        res.data.filter(
          (file: FileType) => ![".", ".."].includes(file.file_name)
        )
      )
    }
  }

  useEffect(() => {
    getFiles()
  }, [connection, path])

  return (
    <ConnectionContext.Provider
      value={{
        connections,
        connection,
        path,
        setPath,
        getPathString,
        files,
        getFiles,
        setActiveConnection,
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
