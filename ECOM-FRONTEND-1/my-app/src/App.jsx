import{BrowserRouter, Routes, Route} from "react-router-dom"
import './App.css'
import ProductComp from './components/ProductComp';
import ProductList from './pages/ProductPage';
import RegistrationPage from './pages/RegistrationPage'
import LoginPage from './pages/LoginPage'
import CartPage from "./pages/CartPage";

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductList/>}></Route>
        <Route path="/products" element={<ProductList/>}></Route>
        <Route path="/register" element={<RegistrationPage/>}></Route>
        <Route path="/login" element={<LoginPage/>}></Route>
        <Route path="/cart" element={<CartPage/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App