import { useContext, useEffect } from "react"
import { ConnectionContext } from "../contexts/ConnectionContextProvider"
import Connection from "../components/Connections/Connection"

const Connections = () => {
  const { connections, getConnections } = useContext(ConnectionContext)

  useEffect(() => {
    getConnections()
  }, [])

  return (
    <main className="p-3">
      <h1 className="text-3xl font-semibold mb-5">Connections</h1>
      <section className="flex gap-2 w-full">
        {connections.map((connection) => (
          <Connection
            key={connection.id}
            connection={connection}
          />
        ))}
        <Connection connection={undefined} />
      </section>
    </main>
  )
}
export default Connections
