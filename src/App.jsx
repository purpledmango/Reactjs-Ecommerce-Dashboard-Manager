import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Base from "./pages/Base"
import { UserProvider } from "./contexts/UserContext"

function App() {

  return (


    <Router>
      <ToastContainer />

      <UserProvider>
        <Base />
      </UserProvider>


    </Router>
  )
}

export default App
