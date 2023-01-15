import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../components/layout/Header";
import NavBar from "../components/layout/NavBar";
import Aside from "../components/layout/Aside";
import Footer from "../components/layout/Footer";
import Index from "../components/pages/Index";
import Article from "../components/pages/Article";
import Articles from "../components/pages/Articles";
import Create from "../components/pages/Create";
import Edit from "../components/pages/Edit";
import Search from "../components/pages/Search";

const BlogRouter = () => {
  return (
    <BrowserRouter>
      {/* LAYOUT */}
      {/* Header */}
      <Header />
      {/* Navigation Bar */}
      <NavBar />
      {/* Main Content */}
      <main className="content">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/articulos" element={<Articles />} />
          <Route path="/crear" element={<Create />} />
          <Route path="/buscar/:busqueda" element={<Search />} />
          <Route path="/articulo/:id" element={<Article />} />
          <Route path="/editar/:id" element={<Edit />} />
          <Route path="*" element={<h1>Error 404</h1>} />
        </Routes>
      </main>
      {/* Aside */}
      <Aside />
      {/* Footer */}
      <Footer />
    </BrowserRouter>
  );
};

export default BlogRouter;