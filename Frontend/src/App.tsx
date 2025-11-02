import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Dashboard from "./components/pages/Dashboard";
import ProtectedRoute from "./components/pages/ProtectedComponent"; // Import the protected route component
import ApiDocs from "./components/pages/ApiDocs";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/api-docs" element={<ApiDocs />} />
      </Routes>
    </Router>
  );
}

export default App;
