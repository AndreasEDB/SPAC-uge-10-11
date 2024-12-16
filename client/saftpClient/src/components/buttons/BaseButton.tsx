import Button from "../../interfaces/Button"

const BaseButton = ({
  text,
  icon,
  onClick,
  type,
  className,
  square = false,
  size = "medium",
}: Button) => {
  let assertedSqaure = false

  if (square) {
    assertedSqaure = true
  } else if (icon && !text) {
    assertedSqaure = true
  }

  return (
    <button
      className={[
        className,
        assertedSqaure ? "aspect-square" : "aspect-auto",
        "flex align-items-center justify-center rounded-md text-white font-semibold",
        size == "small" ? "py-2" : undefined,
        size == "medium" ? "py-4" : undefined,
        size == "large" ? "py-5" : undefined,
      ].join(" ")}
      onClick={onClick}
      type={type}
    >
      {text && text}
      {icon && icon({})}
    </button>
  )
}
export default BaseButton
