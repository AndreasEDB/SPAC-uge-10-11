import { Category } from "./Category"

export interface Connection {
  id: number
  name: string
  host: string
  port?: number
  username?: string
  password?: string
  protocol: string
  category: Category[]
}
