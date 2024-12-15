import { useContext } from "react"
import CloseButton from "../buttons/CloseButton"
import { SidebarContext } from "../../contexts/SidebarContextProvider"
import Overlay from "../Overlay"
import SidebarContextType from "../../interfaces/SidebarContextType"

const Sidebar = () => {
  const { sidebarComponent, sidebarTitle, closeSidebar } =
    useContext<SidebarContextType>(SidebarContext)

  return (
    <>
      <Overlay
        display={!!sidebarComponent}
        onClick={closeSidebar}
      />
      <aside
        className={[
          "fixed top-0 bottom-0 w-[35rem] max-w-full bg-white shadow-2xl right-0 transition-transform duration-300 h-full pb-10",
          sidebarComponent ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        <header className="bg-gradient-to-r from-slate-500 to-slate-300 h-12 flex justify-between">
          <h2 className="text-slate-100 text-xl font-semibold p-3">
            {sidebarTitle}
          </h2>
          <CloseButton onClick={closeSidebar} />
        </header>
        <main className="p-3 h-full overflow-scroll">{sidebarComponent}</main>
      </aside>
    </>
  )
}

export default Sidebar
