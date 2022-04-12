import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import GameListPage from "./pages/GameListPage";
import GameDetailPage from "./pages/GameDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import { AnimatePresence } from "framer-motion";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      Testing GH workflow
      <Nav />
      <AnimatePresence>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/popular" element={<GameListPage />} />
          <Route path="/new" element={<GameListPage />} />
          <Route path="/upcoming" element={<GameListPage />} />
          <Route path="/search" element={<GameListPage />} />
          <Route path="/game/:gameSlug" element={<GameDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;