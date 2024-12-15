import Button from "../../interfaces/Button"

const BaseButton = ({
  text,
  icon,
  onClick,
  type,
  className,
  square = false,
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
        "flex align-items-center justify-center rounded-md px-4 py-4 text-white font-semibold",
        className,
        assertedSqaure ? "aspect-square" : "aspect-auto",
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
