import Button from "../../interfaces/Button"
import BaseButton from "./BaseButton"

const ButtonArea = ({ buttons }: { buttons: Button[] }) => {
  return (
    <section className="w-full flex justify-stretch gap-2 pt-5">
      {buttons.map((button, index) => (
        <BaseButton
          key={index}
          text={button.text}
          icon={button.icon}
          onClick={button.onClick}
          type={button.type}
          className={button.className + " flex-1"}
        />
      ))}
    </section>
  )
}
export default ButtonArea
