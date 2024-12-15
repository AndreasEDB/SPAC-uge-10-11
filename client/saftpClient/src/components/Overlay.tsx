const Overlay = ({
  display,
  onClick,
}: {
  display: boolean
  onClick: () => void
}) => {
  return (
    <div
      className={[
        "backdrop-blur-sm fixed top-0 right-0 bottom-0 left-0",
        display ? "visible" : "hidden",
      ].join(" ")}
      onClick={onClick}
    ></div>
  )
}
export default Overlay
