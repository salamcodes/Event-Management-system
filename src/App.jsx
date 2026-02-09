import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./Providers/AuthProvider";
import ProtectedRoute from "./Routes/ProtectedRoute";
import AdminRoute from "./Routes/AdminRoute";
import { Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from './components/Login'
import SignUp from './components/SignUp'
import Dashboard from './pages/users/Dashboard'
import AdminPanel from './pages/admin/AdminPanel'
import Mytickets from "./pages/users/Mytickets";
import EventDetail from "./pages/users/EventDetail";

import ManageEvent from './pages/admin/ManageEvent'
import AttendeeList from "./pages/admin/AttendeeList";
import TicketValidation from "./pages/admin/TicketValidation";
import AddEvent from './pages/admin/AddEvent'


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>

          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<EventDetail />} />
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
          <Route
            path="/mytickets"
            element={
              <ProtectedRoute>
                <Mytickets />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminPanel />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/events"
            element={
              <AdminRoute>
                <ManageEvent />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/events/add"
            element={
              <AdminRoute>
                <AddEvent />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/attendees"
            element={
              <AdminRoute>
                <AttendeeList />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/validate"
            element={
              <AdminRoute>
                <TicketValidation />
              </AdminRoute>
            }
          />



          {/* Default Routes */}
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
        </Routes>


      </AuthProvider>
    </BrowserRouter >
  );
}

export default App;
