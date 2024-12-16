import Button from "./Button"

let baseStyle: string = "text-white font-bold px-4 rounded"

const okButton = (onClick?: () => void): Button => {
  return {
    text: "Ok",
    onClick: onClick ?? (() => {}),
    type: "button",
    className: baseStyle + " bg-green-500 hover:bg-green-700",
  }
}

const cancelButton = (onClick?: () => void): Button => {
  return {
    text: "Cancel",
    onClick: onClick ?? (() => {}),
    type: "reset",
    className: baseStyle + " bg-red-500 hover:bg-red-700",
  }
}

const yesButton = (onClick?: () => void): Button => {
  return {
    text: "Yes",
    onClick: onClick ?? (() => {}),
    type: "button",
    className: baseStyle + " bg-green-500 hover:bg-green-700",
  }
}

const noButton = (onClick?: () => void): Button => {
  return {
    text: "No",
    onClick: onClick ?? (() => {}),
    type: "button",
    className: baseStyle + " bg-red-500 hover:bg-red-700",
  }
}

const saveButton = (onClick?: () => void): Button => {
  return {
    text: "Save",
    onClick: onClick ?? (() => {}),
    type: "submit",
    className: baseStyle + " bg-blue-500 hover:bg-blue-700",
  }
}

const createButton = (onClick?: () => void): Button => {
  return {
    text: "Create",
    onClick: onClick ?? (() => {}),
    type: "submit",
    className: baseStyle + " bg-blue-500 hover:bg-blue-700",
  }
}

const loginButton = (onClick?: () => void): Button => {
  return {
    text: "Log in",
    onClick: onClick ?? (() => {}),
    type: "submit",
    className: baseStyle + " bg-blue-500 hover:bg-blue-700",
  }
}

const logoutButton = (onClick?: () => void): Button => {
  return {
    text: "Log out",
    onClick: onClick ?? (() => {}),
    type: "submit",
    className: baseStyle + " bg-blue-500 hover:bg-blue-700",
  }
}

const connectButton = (onClick?: () => void): Button => {
  return {
    text: "Connect",
    onClick: onClick ?? (() => {}),
    type: "button",
    className: baseStyle + " bg-blue-500 hover:bg-blue-700",
  }
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
}

export default ButtonTypes
