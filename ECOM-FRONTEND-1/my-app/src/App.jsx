import{BrowserRouter, Routes, Route} from "react-router-dom"
import './App.css'
import ProductComp from './components/ProductComp';
import ProductList from './pages/ProductPage';
import RegistrationPage from './pages/RegistrationPage'
import LoginPage from './pages/LoginPage'
import CartPage from "./pages/CartPage";
import CartProvider from "./pages/CartContext";
import Checkout from "./pages/Checkout";
import NotificationsPage from "./pages/NotificationsPage";
import PassResetPage from "./pages/PassResetPage";

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
        <Route path="/passresetpage" element={<PassResetPage/>}></Route>
        <Route path="/checkout/:orderId" element={<Checkout />} />  
        <Route path="/notifications" element={<NotificationsPage/>}></Route>
     </Routes>
    </BrowserRouter>
   </CartProvider>

  )
}

export default App