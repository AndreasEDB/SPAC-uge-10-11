import Button from "../../interfaces/Button"

const BaseButton = ({
  text,
  icon,
  onClick,
  type,
  className,
  square = false,
  size = "medium",
  disabled = false,
}: Button) => {
  const assertedSize = icon ? "small" : size
  let assertedSquare = false

  if (square) {
    assertedSquare = true
  } else if (icon && !text) {
    assertedSquare = true
  }

  return (
    <button
      className={[
        className,
        assertedSquare ? "aspect-square" : "aspect-auto",
        "flex align-items-center justify-center rounded-md font-semibold",
        assertedSize == "small" ? "p-2" : undefined,
        assertedSize == "medium" ? "p-4" : undefined,
        assertedSize == "large" ? "p-5" : undefined,
      ].join(" ")}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {text && text}
      {icon && icon({})}
    </button>
  )
}
export default BaseButton
