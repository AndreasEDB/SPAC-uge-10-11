import { useContext } from "react"
import ModalContextType from "../../interfaces/ModalContextType"
import { ModalContext } from "../../contexts/ModalContextProvider"
import Overlay from "../Overlay"
import CloseButton from "../buttons/CloseButton"

const Modal = () => {
  const { modalComponent, modalTitle, closeModal } =
    useContext<ModalContextType>(ModalContext)

  return (
    <>
      <Overlay
        display={!!modalComponent}
        onClick={closeModal}
      />
      <div
        className={[
          "absolute left-1/2  -translate-x-1/2 -translate-y-1/2  w-96 max-w-full max-h-full bg-white shadow-2xl transition-all duration-300",
          modalComponent
            ? "top-1/2 -translate-y-1/2 "
            : "-top-full -translate-y-full",
        ].join(" ")}
      >
        <header className="bg-gradient-to-r from-slate-500 to-slate-300 h-12 flex justify-between">
          <h2 className="text-slate-100 text-xl font-semibold p-3">
            {modalTitle}
          </h2>
          <CloseButton onClick={closeModal} />
        </header>
        <main className="p-3">{modalComponent}</main>
      </div>
    </>
  )
}
export default Modal
