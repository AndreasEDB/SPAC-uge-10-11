import { ReactNode, useContext } from "react"
import { AuthContext } from "../../../contexts/AuthContextProvider"

const NotAuthenticatedLayout = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useContext(AuthContext)

  if (user || loading) return null
  return <>{children}</>
}
export default NotAuthenticatedLayout
