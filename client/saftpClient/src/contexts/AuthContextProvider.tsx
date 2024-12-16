import { createContext, ReactNode, useEffect, useState } from "react"
import { AuthContextType } from "../interfaces/AuthContextType"
import { User } from "../interfaces/User"
import { LoginCredentials } from "../interfaces/LoginCredentials"
import axios, { AxiosResponse } from "axios"
const { VITE_AUTH_URI } = import.meta.env

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | undefined>()
  const [loading, setLoading] = useState(false)
  const [authToken, setAuthToken] = useState<string | undefined>()
  const [refreshToken, setRefreshToken] = useState<string | undefined>()

  const getUser = async () => {
    if (authToken) {
      const res: AxiosResponse = await axios.get(`${VITE_AUTH_URI}/self/`)
      setUser(res.data)
    }
  }

  const getToken = async (credentials: LoginCredentials | undefined) => {
    let res: AxiosResponse | null = null

    setLoading(true)

    try {
      if (credentials) {
        res = await axios.post(`${VITE_AUTH_URI}/token/`, credentials)
      } else {
        let refresh = refreshToken ?? localStorage.getItem("refresh")
        if (refresh) {
          res = await axios.post(`${VITE_AUTH_URI}/token/refresh/`, {
            refresh,
          })
        }
      }

      if (res?.status === 200) {
        setAuthToken(res.data.access)

        if (res.data.refresh) {
          setRefreshToken(res.data.refresh)
          localStorage.setItem("refresh", res.data.refresh)
        }
      }
    } catch (e) {}

    setLoading(false)
  }

  const login = async (credentials: LoginCredentials) => {
    await getToken(credentials)
  }

  const logout = () => {
    setUser(undefined)
    setAuthToken(undefined)
    setRefreshToken(undefined)
    localStorage.removeItem("refresh")
  }

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`
    getUser()
  }, [authToken])

  useEffect(() => {
    getToken(undefined)
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
export default AuthContextProvider
