import { createContext, useState } from "react"
import SidebarContextType from "../interfaces/SidebarContextType"

export const SidebarContext = createContext<SidebarContextType>(
  {} as SidebarContextType
)

const SidebarContextProvider = ({ children }: { children: JSX.Element }) => {
  const [sidebarComponent, setSidebarComponent] = useState<JSX.Element | null>(
    null
  )
  const [sidebarTitle, setSidebarTitle] = useState<string | null>(null)
  const [wide, setWide] = useState<boolean>(false)

  const closeSidebar = () => {
    setSidebarComponent(null)
    setSidebarTitle(null)
    setWide(false)
  }

  return (
    <SidebarContext.Provider
      value={{
        sidebarComponent,
        setSidebarComponent,
        sidebarTitle,
        setSidebarTitle,
        wide,
        setWide,
        closeSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

export default SidebarContextProvider
