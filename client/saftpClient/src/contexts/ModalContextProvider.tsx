import { createContext, ReactNode, useState } from "react"
import ModalContextType from "../interfaces/ModalContextType"

export const ModalContext = createContext<ModalContextType>(
  {} as ModalContextType
)

const ModalContextProvider = ({ children }: { children: ReactNode }) => {
  const [modalComponent, setModalComponent] = useState<JSX.Element | null>(null)
  const [modalTitle, setModalTitle] = useState<string | null>(null)

  const closeModal = () => {
    setModalComponent(null)
    setModalTitle(null)
  }

  return (
    <ModalContext.Provider
      value={{
        modalComponent,
        setModalComponent,
        closeModal,
        modalTitle,
        setModalTitle,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}
export default ModalContextProvider
