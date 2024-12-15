export default interface ModalContextType {
  modalComponent: JSX.Element | null
  setModalComponent: (component: JSX.Element) => void
  modalTitle: string | null
  setModalTitle: (title: string) => void
  closeModal: () => void
}
