import { ReactNode, useState } from "react"
import Sidebar from "../sidebar/Sidebar"
import Modal from "../modal/Modal"
import Header from "./header/Header"
import AuthenticatedLayout from "./auth/AuthenticatedLayout"
import NotAuthenticatedLayout from "./auth/NotAuthenticatedLayout"
import Login from "../../pages/Login"

const MainLayout = ({ children }: { children: ReactNode }) => {
  const [headerHeight, setHeaderHeight] = useState<number>(4)

  return (
    <div className="relative">
      <AuthenticatedLayout>
        <Header height={headerHeight} />
        <main>{children}</main>
        <Sidebar />
        <Modal />
      </AuthenticatedLayout>
      <NotAuthenticatedLayout>
        <Login />
      </NotAuthenticatedLayout>
    </div>
  )
}

export default MainLayout
