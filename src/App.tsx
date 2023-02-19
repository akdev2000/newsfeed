import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Home } from "./pages";

function App() {
  return (
    // <Router>
    //   <Route element={<Home />} path="/" />
    // </Router>
    <Home/>
  );
}

export default App;
