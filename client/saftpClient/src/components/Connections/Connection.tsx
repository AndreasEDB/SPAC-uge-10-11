import { useContext } from "react"
import { ConnectionContext } from "../../contexts/ConnectionContextProvider"
import ButtonTypes from "../../interfaces/ButtonTypes"
import { Connection as ConnectionType } from "../../interfaces/Connection"
import ButtonArea from "../buttons/ButtonArea"
import { useNavigate } from "react-router-dom"
import Button from "../../interfaces/Button"
import { LuPlus } from "react-icons/lu"
import { IconBaseProps } from "react-icons"

const Connection = ({
  connection,
}: {
  connection: ConnectionType | undefined
}) => {
  const navigate = useNavigate()
  return (
    <>
      {connection && (
        <article className="bg-slate-300 shadow-xl p-5 flex justify-evenly align-middle sm:basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
          <div>
            <h3 className="text-xl font-semibold">{connection.name}</h3>
            <em>{connection.host}</em>
            <ButtonArea
              buttons={[
                ButtonTypes.Connect(() => navigate("/files/" + connection.id)),
              ]}
            />
          </div>
        </article>
      )}
      {connection === undefined && (
        <article className="bg-slate-400 shadow-xl p-5 flex justify-center align-middle basis-1 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
          <div>
            <h3 className="text-xl font-semibold">Add connection</h3>
            <ButtonArea
              buttons={[
                {
                  icon: () => <LuPlus size="5rem" />,
                  type: "button",
                  onClick: () => {},
                  size: "large",
                } as Button,
              ]}
            />
          </div>
        </article>
      )}
    </>
  )
}
export default Connection
