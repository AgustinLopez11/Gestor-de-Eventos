import { Route, Routes } from "react-router-dom"
import "./App.css"
import ProtectedRoute from "./protecteds/ProtectedRoute"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import ProtectedLogin from "./protecteds/ProtectedLogin"
import Header from "./pages/Header"

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ProtectedLogin> <Login /> </ProtectedLogin>} />
        <Route path="/dashboard" element={<ProtectedRoute> < Dashboard /> </ProtectedRoute>} />
      </Routes>
    </>
  )
}

export default App
