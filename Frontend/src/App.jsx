import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './Pages/Login'
import VisitorRegister from './Pages/VisitorRegister'
import EmployeeDashboard from './Pages/EmployeeDashboard'
import SecurityDashboard from './Pages/SecurityDashboard'
import AdminDashboard from './Pages/AdminDashboard'
import Protection from './Components/ProtectedRoutes'
import GetUserRole from './Components/RoleRoute'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<VisitorRegister />} />
        <Route path='/employee' element={<Protection><GetUserRole role='employee'><EmployeeDashboard /></GetUserRole></Protection>} />
        <Route path='/security' element={<Protection><GetUserRole role='security'><SecurityDashboard /></GetUserRole></Protection>} />
        <Route path='/admin' element={<Protection><GetUserRole role='admin'><AdminDashboard /></GetUserRole></Protection>} />
      </Routes>
    </>
  )
}

export default App
