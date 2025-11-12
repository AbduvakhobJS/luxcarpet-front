// App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Blog from "./pages/Blog";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Design from "./pages/Design";
import Product from "./pages/Product";
import ProductDetail from "./pages/ProductDetail";
import Order from "./pages/Order";
import Search from "./pages/Search";
import CategoryProducts from "./pages/CategoryProducts";


function App() {
  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      minHeight: "100vh", 
      backgroundColor: "#fff" 
    }}>
      <Navbar />

      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order/:id" element={<Order />} />
          <Route path="/design/:categoryId" element={<Design/>} />
          <Route path="/products" element={<Product />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/blog" element={<Blog/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/search" element={<Search />} />
          <Route path="/category/:id/products" element={<CategoryProducts />} />

        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
