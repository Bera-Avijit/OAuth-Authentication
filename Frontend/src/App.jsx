import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { AuthProvider, useAuth } from "./Context/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";

const AppContext = () => {
  const { AuthStatus } = useAuth();

  useEffect(() => {
    AuthStatus();
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContext />
    </AuthProvider>
  );
}

export default App;
