import { Category } from "./Category"
import { Protocol } from "./Protocol"

export interface Connection {
  id?: number
  name: string
  host: string
  port?: number
  username?: string
  password?: string
  protocol: Protocol | string
  category: Category[]
}
