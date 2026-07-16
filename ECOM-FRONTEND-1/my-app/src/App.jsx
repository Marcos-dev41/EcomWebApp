import{BrowserRouter, Routes, Route} from "react-router-dom"
import './App.css'
import ProductComp from './components/ProductComp';
import ProductList from './pages/ProductPage';
import RegistrationPage from './pages/RegistrationPage'
import LoginPage from './pages/LoginPage'

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductList/>}></Route>
        <Route path="/products" element={<ProductList/>}></Route>
        <Route path="/register" element={<RegistrationPage/>}></Route>
        <Route path="/login" element={<LoginPage/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App