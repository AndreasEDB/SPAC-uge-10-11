import { useContext } from "react"
import { ConnectionContext } from "../../../contexts/ConnectionContextProvider"

const BreadCrumbs = () => {
  const { path, setPath } = useContext(ConnectionContext)

  const navigate = (index: number) => {
    setPath(path.slice(0, index + 1))
  }

  return (
    <div className="flex">
      <a
        className="text-blue-500"
        onClick={() => setPath([])}
      >
        <strong>Root dir</strong>
      </a>
      {path.map((dir, index) => (
        <div>
          <strong className="px-2">/</strong>
          <a
            key={index}
            className="text-blue-500"
            onClick={(): void => navigate(index)}
          >
            {dir}
          </a>
        </div>
      ))}
    </div>
  )
}
export default BreadCrumbs
