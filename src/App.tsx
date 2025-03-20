import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './componentes/Navbar';
import Home from "./views/home/Home";
import Users from "./views/users/Users";
import Products from "./views/productos/Productos";
import Categories from "./views/categories/Categories";

const App = () => {
  return (
    <div className="app-background">
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/products" element={<Products />} />
        <Route path="/categories" element={<Categories />} />
      </Routes>
    </Router>
    </div>
  );
};

export default App;
