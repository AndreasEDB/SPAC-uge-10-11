import { FormEvent, useContext, useEffect, useRef, useState } from "react"
import { SidebarContext } from "../../../contexts/SidebarContextProvider"
import ButtonTypes from "../../../interfaces/ButtonTypes"
import ButtonArea from "../../buttons/ButtonArea"
import { ConnectionContext } from "../../../contexts/ConnectionContextProvider"
import { get } from "http"
import { ModalContext } from "../../../contexts/ModalContextProvider"
import ConnectionTestFailed from "../../modal/modalComponents/ConnectionTestFailed"

const CreateConnection = () => {
  const { setSidebarTitle, closeSidebar } = useContext(SidebarContext)
  const { testConnection, createConnection, getConnections } =
    useContext(ConnectionContext)
  const { setModalComponent } = useContext(ModalContext)
  const [passed, setPassed] = useState<boolean>(false)

  const formRef = useRef<HTMLFormElement | null>(null)

  const handleTest = async () => {
    let form = formRef.current

    let formData = new FormData(form!)

    let testPassed = await testConnection({
      name: formData.get("name") as string,
      host: formData.get("host") as string,
      port: parseInt(formData.get("port") as string) || undefined,
      username: (formData.get("username") as string | undefined) || undefined,
      password: (formData.get("password") as string | undefined) || undefined,
      protocol: formData.get("protocol") as string,
      category: [],
    })

    if (testPassed) setPassed(testPassed)
    else setModalComponent(<ConnectionTestFailed />)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    let formData = new FormData(e.target as HTMLFormElement)

    let connection = {
      name: formData.get("name") as string,
      host: formData.get("host") as string,
      port: parseInt(formData.get("port") as string) || undefined,
      username: (formData.get("username") as string | undefined) || undefined,
      password: (formData.get("password") as string | undefined) || undefined,
      protocol: formData.get("protocol") as string,
      category: [],
    }

    if (await createConnection(connection)) {
      getConnections()
      closeSidebar()
    }
  }

  useEffect(() => {
    setSidebarTitle("Create Connection")
  }, [])

  return (
    <form
      onSubmit={handleSubmit}
      ref={formRef}
      className="grid grid-cols-1 gap-3 w-full"
    >
      <label>
        <span>Name</span>
      </label>
      <input
        type="text"
        name="name"
        className="p-2 border-2 border-gray-300"
      />
      <label>
        <span>Host</span>
      </label>
      <input
        type="text"
        name="host"
        className="p-2 border-2 border-gray-300"
      />
      <label>
        <span>Port</span>
      </label>
      <input
        type="number"
        name="port"
        className="p-2 border-2 border-gray-300"
      />
      <label>
        <span>Username</span>
      </label>
      <input
        type="text"
        name="username"
        className="p-2 border-2 border-gray-300"
      />
      <label>
        <span>Password</span>
      </label>
      <input
        type="password"
        name="password"
        className="p-2 border-2 border-gray-300"
      />
      <label>
        <span>Protocol</span>
      </label>
      <select
        name="protocol"
        className="p-2 border-2 border-gray-300"
      >
        <option value="ftp">FTP</option>
        <option value="sftp">SFTP</option>
        <option value="ftps">FTPS</option>
      </select>
      <label>
        <span>Category</span>
      </label>
      <select
        name="category"
        className="p-2 border-2 border-gray-300"
      >
        <option value="ftp">FTP</option>
        <option value="sftp">SFTP</option>
        <option value="ftps">FTPS</option>
      </select>
      <ButtonArea
        buttons={[
          passed ? ButtonTypes.Create() : ButtonTypes.Test(handleTest),
          ButtonTypes.Cancel(closeSidebar),
        ]}
      />
    </form>
  )
}
export default CreateConnection
