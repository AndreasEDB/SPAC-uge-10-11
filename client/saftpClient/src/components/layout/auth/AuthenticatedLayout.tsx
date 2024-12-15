import { ReactNode, useContext } from "react"
import { AuthContext } from "../../../contexts/AuthContextProvider"

const AuthenticatedLayout = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useContext(AuthContext)

  if (loading)
    return (
      <>
        <br />
        <br />
        <br />
        <br />
        <h1>Please wait...</h1>
      </>
    )
  if (!user) return null
  return <>{children}</>
}
export default AuthenticatedLayout
