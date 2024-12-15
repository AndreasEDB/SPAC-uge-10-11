import { useContext } from "react"
import { AuthContext } from "../../../contexts/AuthContextProvider"
import ButtonTypes from "../../../interfaces/ButtonTypes"
import BaseButton from "../../buttons/BaseButton"

const UserInfo = () => {
  const { user, logout } = useContext(AuthContext)

  const logoutButton = ButtonTypes.Logout(() => logout())
  logoutButton.className += " py-1"

  if (user)
    return (
      <div className="flex justify-between gap-2">
        <em>
          {user.first_name} {user.last_name}
        </em>
        <BaseButton {...logoutButton} />
      </div>
    )
  else return null
}
export default UserInfo
