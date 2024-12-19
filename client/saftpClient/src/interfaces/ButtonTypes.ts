import { on } from "events"
import Button from "./Button"

let baseStyle: string = "font-bold rounded"

const whiteButton = (props: Button): Button => {
  return {
    text: props.text,
    onClick: props.onClick,
    type: props.type,
    disabled: props.disabled,
    className:
      baseStyle +
      " text-slate-900 bg-white border-2 border-slate-900 hover:bg-gray-300",
  }
}

const blueButton = (props: Button): Button => {
  return {
    text: props.text,
    onClick: props.onClick,
    type: props.type,
    disabled: props.disabled,
    className: baseStyle + " text-white bg-blue-500 hover:bg-blue-700",
  }
}

const greenButton = (props: Button): Button => {
  return {
    text: props.text,
    onClick: props.onClick,
    type: props.type,
    disabled: props.disabled,
    className: baseStyle + " text-white bg-green-500 hover:bg-green-700",
  }
}

const redButton = (props: Button): Button => {
  return {
    text: props.text,
    onClick: props.onClick,
    type: props.type,
    disabled: props.disabled,
    className: baseStyle + " text-white bg-red-500 hover:bg-red-700",
  }
}

const okButton = (
  onClick?: () => void | {},
  disabled: boolean = false
): Button => {
  return greenButton({
    text: "Ok",
    onClick: onClick,
    type: "button",
    disabled,
  })
}

const cancelButton = (
  onClick?: () => void | {},
  disabled: boolean = false
): Button => {
  return redButton({
    text: "Cancel",
    onClick: onClick,
    type: "reset",
    disabled,
  })
}

const yesButton = (
  onClick?: () => void | {},
  disabled: boolean = false
): Button => {
  return greenButton({
    text: "Yes",
    onClick: onClick,
    type: "button",
    disabled,
  })
}

const noButton = (
  onClick?: () => void | {},
  disabled: boolean = false
): Button => {
  return redButton({
    text: "No",
    onClick: onClick,
    type: "button",
    disabled,
  })
}

const saveButton = (
  onClick?: () => void | {},
  disabled: boolean = false
): Button => {
  return blueButton({
    text: "Save",
    onClick: onClick,
    type: "submit",
    disabled,
  })
}

const createButton = (
  onClick?: () => void | {},
  disabled: boolean = false
): Button => {
  return blueButton({
    text: "Create",
    onClick: onClick,
    type: "submit",
    disabled,
  })
}

const loginButton = (
  onClick?: () => void | {},
  disabled: boolean = false
): Button => {
  return blueButton({
    text: "Log in",
    onClick: onClick,
    type: "submit",
    disabled,
  })
}

const logoutButton = (
  onClick?: () => void | {},
  disabled: boolean = false
): Button => {
  return blueButton({
    text: "Log out",
    onClick: onClick,
    type: "submit",
    disabled,
  })
}

const connectButton = (
  onClick?: () => void | {},
  disabled: boolean = false
): Button => {
  return blueButton({
    text: "Connect",
    onClick: onClick,
    type: "button",
    disabled,
  })
}

const testButton = (
  onClick?: () => void | {},
  disabled: boolean = false
): Button => {
  return whiteButton({
    text: "Test",
    onClick: onClick,
    type: "button",
    disabled,
  })
}

const downloadButton = (
  onCLick?: () => void | {},
  disabled: boolean = false
): Button => {
  return whiteButton({
    text: "Download",
    onClick: onCLick,
    type: "button",
    disabled,
  })
}

const editButton = (onClick?: () => void | {}, disabled: boolean = false) => {
  return whiteButton({
    text: "Edit",
    onClick: onClick,
    type: "button",
    disabled,
  })
}

const ButtonTypes = {
  Ok: okButton,
  Cancel: cancelButton,
  Yes: yesButton,
  No: noButton,
  Save: saveButton,
  Create: createButton,
  Login: loginButton,
  Logout: logoutButton,
  Connect: connectButton,
  Test: testButton,
  Download: downloadButton,
  Edit: editButton,
}

export default ButtonTypes
