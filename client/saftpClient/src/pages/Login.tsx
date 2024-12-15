import { useContext } from "react"
import ButtonArea from "../components/buttons/ButtonArea"
import ButtonTypes from "../interfaces/ButtonTypes"
import { AuthContext } from "../contexts/AuthContextProvider"

const Login = () => {
  const { login } = useContext(AuthContext)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    login({
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    })
  }

  return (
    <main className="flex top-0 left-0 right-0 bottom-0 bg-gray-100 h-screen w-screen p-4 justify-center items-center div">
      <div className="p-4 rounded-lg shadow-lg w-96 max-w-full  bg-slate-300">
        <h1 className="text-2xl font-semibold text-center">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              name="username"
              id=""
              className="p-2 rounded w-full"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id=""
              className="p-2 rounded w-full"
            />
          </div>
          <ButtonArea buttons={[ButtonTypes.Login()]} />
        </form>
      </div>
    </main>
  )
}
export default Login
