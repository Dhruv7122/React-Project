// App.tsx
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Footer from "./Component/Footer";
import ProductListing from "./Pages/ProductListing";
import { Specific } from "./Pages/Specific";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { AuthContext, AuthProvider } from "./Context/authContext";
import { Provider } from "react-redux";
import store from "./Store/store";
import CheckoutPage from "./Pages/Checkout";
import Navbar from "./Component/Navbar";
import Cashout from "./Pages/Cashout";
import Contact from "./Component/Contact";
import Cart from "./Pages/Cart";


function App() {
  return (
    <Provider store={store}>
    <AuthProvider>
    <div className="App flex flex-col min-h-screen">
      <Navbar />
      <main className="flex flex-col">
        <Routes>
          <Route path="/" element={<ProductListing />} />
          <Route path="/all-products" element={<ProductListing />} />
          <Route path="/products/:_id" element={<Specific />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/check-out" element={<CheckoutPage />} />
          <Route path="/cash-out" element={<Cashout />} />
          {/* Add more routes as needed */}
        </Routes>
      </main>
      <Footer/>
    </div>
    </AuthProvider>
    </Provider>
  );
}

export default App;
