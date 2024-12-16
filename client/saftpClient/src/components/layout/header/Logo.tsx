import { Link } from "react-router-dom"

const Logo = () => {
  return (
    <Link to="/">
      <span className="text-3xl font-bold">
        SAFTp<span className="hidden md:inline"> - Super Awesome FTP</span>
      </span>
    </Link>
  )
}
export default Logo
