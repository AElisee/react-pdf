import React, { useEffect } from "react";
import Header from "./components/Header.jsx";
import WebSite from "./pages/webSite.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchLettre } from "./assets/redux/lettres.slice.js";
import { ToastContainer } from "react-toastify";
import DetailsLettre from "./pages/DetailsLettre.jsx";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLettre());
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<WebSite />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/lettre/:id" element={<DetailsLettre />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
