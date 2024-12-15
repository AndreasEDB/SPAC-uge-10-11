export default interface SidebarContextType {
  sidebarComponent: JSX.Element | null
  setSidebarComponent: (component: JSX.Element) => void
  sidebarTitle: string | null
  setSidebarTitle: (title: string) => void
  closeSidebar: () => void
}
