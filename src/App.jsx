import Routers from "./routers/Routers";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import AuthSuccess from "./pages/AuthSuccess";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Routers />} />
          <Route path="/auth/success" element={<AuthSuccess />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
