import Routers from "./routers/Routers";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import AuthSuccess from "./pages/AuthSuccess";
import GoogleCallback from "./pages/GoogleCallback.jsx";
import OAuthRedirect from "./pages/OAuthRedirect ";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Routers />} />
          <Route path="/auth/success" element={<AuthSuccess />} />
          <Route
            path="/api/users/auth/google/callback"
            element={<OAuthRedirect />}
          />
          <Route path="/google/callback" element={<GoogleCallback />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
