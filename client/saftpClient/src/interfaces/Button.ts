import { IconBaseProps } from "react-icons"

export default interface Button {
  text?: string
  onClick: () => void
  type: "button" | "submit" | "reset"
  className?: string
  icon?: (props?: IconBaseProps) => JSX.Element
  square?: boolean
}
