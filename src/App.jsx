import React from "react";
import "./App.css";
import Menubar from "./common/menu/Menubar";
import Home from "./pages/home";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Menubar />
      </header>
      <Home />
    </div>
  );
}

export default App;
