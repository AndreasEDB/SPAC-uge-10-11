import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import { ConnectionContext } from "../contexts/ConnectionContextProvider"
import DirListTable from "../components/tables/DirListTable"
import BreadCrumbs from "../components/layout/dirList.tsx/BreadCrumbs"

const Files = () => {
  const { connectionId } = useParams()
  const { setPath, setActiveConnection } = useContext(ConnectionContext)

  useEffect(() => {
    setActiveConnection(parseInt(connectionId ?? "0"))
    setPath([])
  }, [connectionId])

  return (
    <main>
      <h1 className="font-2xl">Directory listing</h1>
      <BreadCrumbs />
      <DirListTable />
    </main>
  )
}
export default Files
