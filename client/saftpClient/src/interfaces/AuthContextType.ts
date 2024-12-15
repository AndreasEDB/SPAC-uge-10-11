import { LoginCredentials } from "./LoginCredentials"
import { User } from "./User"

export interface AuthContextType {
  user: User | undefined
  loading: boolean
  login: (credentials: LoginCredentials) => void
  logout: () => void
}
