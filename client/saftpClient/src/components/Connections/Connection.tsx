import { useContext } from "react"
import { ConnectionContext } from "../../contexts/ConnectionContextProvider"
import ButtonTypes from "../../interfaces/ButtonTypes"
import { Connection as ConnectionType } from "../../interfaces/Connection"
import ButtonArea from "../buttons/ButtonArea"
import { useNavigate } from "react-router-dom"
import Button from "../../interfaces/Button"
import { LuPlus } from "react-icons/lu"
import { IconBaseProps } from "react-icons"
import { Protocol } from "../../interfaces/Protocol"
import { SidebarContext } from "../../contexts/SidebarContextProvider"
import CreateConnection from "../sidebar/sidebarComponents/CreateConnection"

const Connection = ({
  connection,
}: {
  connection: ConnectionType | undefined
}) => {
  const navigate = useNavigate()
  const { setSidebarComponent } = useContext(SidebarContext)

  const buttons: Button[] = []

  if (connection !== undefined) {
    buttons.push(ButtonTypes.Connect(() => navigate("/files/" + connection.id)))
  } else {
    buttons.push({
      icon: () => <LuPlus size="5rem" />,
      type: "button",
      onClick: () => {
        setSidebarComponent(<CreateConnection />)
      },
      size: "large",
    } as Button)
  }

  return (
    <>
      <article className="bg-slate-300 shadow-xl p-5 flex text-center justify-evenly align-middle">
        <div>
          <h3 className="text-xl font-semibold">
            {connection?.name ?? "Add connection"}
          </h3>
          {connection !== undefined && <em>{connection.host}</em>}
          <ButtonArea buttons={buttons} />
        </div>
      </article>
    </>
  )
}
export default Connection
