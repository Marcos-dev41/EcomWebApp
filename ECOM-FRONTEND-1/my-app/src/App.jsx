import{BrowserRouter, Routes, Route} from "react-router-dom"
import './App.css'
import ProductComp from './components/ProductComp';
import ProductList from './pages/ProductPage';
import RegistrationPage from './pages/RegistrationPage'
import LoginPage from './pages/LoginPage'
import CartPage from "./pages/CartPage";
import CartProvider from "./pages/CartContext";
import Checkout from "./pages/Checkout";

function App() {
 
  return (
  <CartProvider>     
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductList/>}></Route>
        <Route path="/products" element={<ProductList/>}></Route>
        <Route path="/register" element={<RegistrationPage/>}></Route>
        <Route path="/login" element={<LoginPage/>}></Route>
        <Route path="/cart" element={<CartPage/>}></Route>
        <Route path="/checkout" element={<Checkout/>}></Route>

      </Routes>
    </BrowserRouter>
   </CartProvider>

  )
}

export default App