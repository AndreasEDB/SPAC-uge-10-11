import { useContext, useEffect } from "react"
import { ConnectionContext } from "../contexts/ConnectionContextProvider"

const Connections = () => {
  const { connections, getConnections } = useContext(ConnectionContext)

  useEffect(() => {
    getConnections()
  }, [])
  return (
    <main>
      <div>Connections</div>
      <pre>{JSON.stringify(connections, null, 2)}</pre>
    </main>
  )
}
export default Connections
