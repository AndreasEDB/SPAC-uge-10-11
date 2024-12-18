import { createContext, ReactNode, useEffect, useState } from "react"
import { ConnectionContextType } from "../interfaces/ConnectionContextType"
import { Connection } from "../interfaces/Connection"
import axios, { AxiosResponse } from "axios"
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

  const testConnection = async (connection: Connection) => {
    try {
      const res: AxiosResponse = await axios.post(
        `${VITE_CONNECTION_URI}/test/`,
        connection,
        {
          timeout: 5000,
        }
      )
      return res.status === 200
    } catch (error) {
      return false
    }
  }

  const createConnection = async (connection: Connection) => {
    const res: AxiosResponse = await axios.post(
      `${VITE_CONNECTION_URI}/`,
      connection
    )
    return res.status === 200
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

  const downloadFile = async (path: string[]) => {
    const res = await axios.get(
      `${VITE_CLIENT_URI}/file/?path=${path.join("/")}&connection=${
        connection?.id
      }`,
      {
        responseType: "blob",
      }
    )

    if (res.status === 200) {
      const url = window.URL.createObjectURL(res.data)

      return url
    }
    return ""
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
        downloadFile,
      }}
    >
      {children}
    </ConnectionContext.Provider>
  )
}
export default ConnectionContextProvider
