import Logo from "./Logo"
import Nav from "./Nav"
import UserInfo from "./UserInfo"

const Header = ({ height }: { height: number }) => {
  return (
    <header
      style={{ height: height + "rem" }}
      className={`bg-white shadow-lg p-3 w-full fixed top-0 left-0 right-0 flex justify-between justify-items-center`}
    >
      <Logo />
      <div></div>
      <UserInfo />
      {/* <Nav /> */}
    </header>
  )
}
export default Header
