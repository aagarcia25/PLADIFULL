import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import Home from "./pages/Home";
import Estatales from "./pages/Auditorias/Estatales/Estatales";
import Federales from "./pages/Auditorias/Federales/Federales";
import Inap from "./pages/INAP/Inap";
import SIREGOB from "./pages/SIREGOB/SIREGOB";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />

          <Route path="/home/*" element={<Main />}>
            <Route index element={<Home />} />
            <Route path="Estatales" element={<Estatales />} />
            <Route path="Federales" element={<Federales />} />
            <Route path="inap" element={<Inap />} />
            <Route path="siregob" element={<SIREGOB />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
