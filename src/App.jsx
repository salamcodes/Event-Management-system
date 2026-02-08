import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./Providers/AuthProvider";
import ProtectedRoute from "./Routes/ProtectedRoute";
import AdminRoute from "./Routes/AdminRoute";

import Home from "./pages/Home";
import Login from './components/Login'
import SignUp from './components/SignUp'
import Dashboard from './pages/users/Dashboard'
import AdminPanel from './pages/admin/AdminPanel'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>

          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Logged-in users */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Admin only */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminPanel />
              </AdminRoute>
            }
          />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
