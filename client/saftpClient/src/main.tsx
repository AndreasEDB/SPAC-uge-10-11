import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./tailwind.css"
import App from "./App.tsx"
import { IconContext } from "react-icons"
import SidebarContextProvider from "./contexts/SidebarContextProvider.tsx"
import ModalContextProvider from "./contexts/ModalContextProvider.tsx"
import AuthContextProvider from "./contexts/AuthContextProvider.tsx"
import ConnectionContextProvider from "./contexts/ConnectionContextProvider.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <IconContext.Provider value={{ className: "align-middle aspect-square" }}>
      <AuthContextProvider>
        <SidebarContextProvider>
          <ModalContextProvider>
            <ConnectionContextProvider>
              <App />
            </ConnectionContextProvider>
          </ModalContextProvider>
        </SidebarContextProvider>
      </AuthContextProvider>
    </IconContext.Provider>
  </StrictMode>
)
