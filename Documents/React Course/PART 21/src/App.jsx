import { Route, Routes } from "react-router-dom"
import LandingPage from "./components/LandingPage"
import PizzaOrderForm from "./components/PizzaOrderForm"
import Order from "./components/Order"
import Registered from "./components/Registered"
import RegistrationForm from "./components/RegistrationForm"

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<LandingPage />}/>
      <Route path="/orderform" element={<PizzaOrderForm />}/>
      <Route path="/orderconfirm" element={<Order />}/>
      <Route path="/registerform" element={<RegistrationForm />}/>
      <Route path="/registered" element={<Registered/>}/>
    </Routes>
    </>
  )
}

export default App
