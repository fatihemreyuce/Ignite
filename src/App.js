import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Nav from "./components/Nav";
import GameDetail from "./components/GameDetail";
import GlobalStyles from "./components/GlobalStyles";

function App() {
  return (
    <Router>
      <div className="App">
        <GlobalStyles />
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game/:id" element={<GameDetail />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;
