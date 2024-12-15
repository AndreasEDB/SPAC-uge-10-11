import { IconBaseProps } from "react-icons"

export default interface ButtonProps {
  text?: string
  icon?: (props?: IconBaseProps) => JSX.Element
  onClick: () => void
  type: "button" | "submit" | "reset"
  className?: string
  square?: boolean
}
