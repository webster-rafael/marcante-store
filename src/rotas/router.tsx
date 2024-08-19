import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "../components/Header";
import Home from "../pages/Home";
import ProdutosDetails from "../pages/ProdutosDetails";
import ProdutosPage from "../pages/Produtos";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import Cart from "../pages/cart";
import FavoritePage from "../pages/Favorite";
import { TodosOsProdutos } from "../pages/ProdutosPage";

function AppRoutes() {
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:type" element={<ProdutosPage />} />
        <Route path="/produtos/:slug" element={<ProdutosDetails />} />
        <Route path="/produtos" element={<TodosOsProdutos />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/favorite" element={<FavoritePage />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
