import { useContext, useEffect } from "react"
import ButtonTypes from "../../../interfaces/ButtonTypes"
import ButtonArea from "../../buttons/ButtonArea"
import { ModalContext } from "../../../contexts/ModalContextProvider"

const ConnectionTestFailed = () => {
  const { closeModal, setModalTitle } = useContext(ModalContext)

  useEffect(() => {
    setModalTitle("Connection Test Failed")
  })
  return (
    <>
      <p>Please review your entries and try again...</p>
      <ButtonArea buttons={[ButtonTypes.Ok(closeModal)]} />
    </>
  )
}
export default ConnectionTestFailed
