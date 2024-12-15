import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import MainLayout from "./components/layout/MainLayout"
import Connections from "./pages/Connections"
import Login from "./pages/Login"

const App = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route
            path="/"
            element={<Connections />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
        </Routes>
      </MainLayout>
    </Router>
  )
}

export default App
