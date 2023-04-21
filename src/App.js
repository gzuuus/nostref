
import React from "react";
import Footer from "./components/Footer";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SingleRelay from "./components/SingleRelay";
import NotFound from "./components/NotFound";
import Home from "./components/Home";
import MenuBar from "./components/MenuBar";


const App = () => {
  return (
    <div className="appContainer">
    <MenuBar  />
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/relay/:dynamicValue" element={<SingleRelay  />} />
        <Route path="*" element={<NotFound  />} />
      </Routes>
    </Router>
    <Footer />
    </div>
  );
};
export default App;