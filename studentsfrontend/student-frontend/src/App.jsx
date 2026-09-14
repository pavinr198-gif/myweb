import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Feedback from "./components/Feedback";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const user = localStorage.getItem("student");

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Login */}
        <Route
          path="/"
          element={
            user ? <Navigate to="/home" replace /> : <Login />
          }
        />

        {/* Register */}
        <Route
          path="/register"
          element={
            user ? <Navigate to="/home" replace /> : <Register />
          }
        />

        {/* Home */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* Feedback */}
        <Route
          path="/feedback"
          element={
            <ProtectedRoute>
              <Feedback />
            </ProtectedRoute>
          }
        />

        {/* Invalid URL */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;