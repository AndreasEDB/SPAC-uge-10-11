import { Link } from "react-router-dom"

const Nav = () => {
  return (
    <nav className="flex justify-between gap-3">
      <Link to="/">Products</Link>
      {/* <Link to="productattributes">Product Attributes</Link> */}
    </nav>
  )
}
export default Nav
