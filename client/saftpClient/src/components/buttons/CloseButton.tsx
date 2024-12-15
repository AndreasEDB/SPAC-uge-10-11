import { MdClose } from "react-icons/md"

const CloseButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      className="h-full"
      onClick={onClick}
    >
      <MdClose size="100%" />
    </button>
  )
}

export default CloseButton
