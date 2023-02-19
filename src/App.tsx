import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages";
import { SearchPage } from "./pages/SearchPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} path="/" />
        <Route index element={<SearchPage />} path="/search" />
      </Routes>
    </Router>
    // <Home/>
  );
}

export default App;
