import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './Pages/Login'
import EmployeeDashboard from './Pages/EmployeeDashboard'
import SecurityDashboard from './Pages/SecurityDashboard'
import AdminDashboard from './Pages/AdminDashboard'
import Protection from './Components/ProtectedRoutes'
import GetUserRole from './Components/RoleRoute'
import HomePage from './Pages/HomePage'
import Navbar from './Components/Navbar'
import VisitorDashboard from './Pages/VisitorDashboard'
import VisitorRegister from './Components/VisitorRegister'
import VisitorLogin from './Components/VisitorLogin'

function App() {
  return (
    <>

      <Routes>
        <Route  element={<Navbar />}>
          <Route path='/' element={<HomePage />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/visitor-register' element={<VisitorRegister />} />
        <Route path='/visitor-login' element={<VisitorLogin />} />
        <Route path='/register' element={<VisitorRegister />} />
        <Route path='/employee' element={<Protection><GetUserRole role='employee'><EmployeeDashboard /></GetUserRole></Protection>} />
        <Route path='/security' element={<Protection><GetUserRole role='security'><SecurityDashboard /></GetUserRole></Protection>} />
        <Route path="/visitor" element={<Protection><GetUserRole role="visitor"><VisitorDashboard /></GetUserRole></Protection>} />
        <Route path='/admin' element={<Protection><GetUserRole role='admin'><AdminDashboard /></GetUserRole></Protection>} />
      </Routes>
    </>
  )
}

export default App
