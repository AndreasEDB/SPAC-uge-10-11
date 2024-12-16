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
      <h1 className="text-3xl font-semibold">Connections</h1>
      <p className="mb-5">Manage your connections to remote servers here.</p>

      <section className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 w-full">
        {connections.map(connection => (
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
