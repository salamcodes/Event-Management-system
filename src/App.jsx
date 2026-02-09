import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./Providers/AuthProvider";
import ProtectedRoute from "./Routes/ProtectedRoute";
import AdminRoute from "./Routes/AdminRoute";

import Home from "./pages/Home";
import Login from './components/Login'
import SignUp from './components/SignUp'
import Dashboard from './pages/users/Dashboard'
import AdminPanel from './pages/admin/AdminPanel'
import Mytickets from "./pages/users/Mytickets";
import EventDetail from "./pages/users/EventDetail";
import AdminLayout from "./pages/admin/AdminLayout";
import ManageEvent from './pages/admin/ManageEvent'
import AttendeeList from "./pages/admin/AttendeeList";
import TicketValidation from "./pages/admin/TicketValidation";


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


          <Route path="/admin" element={<AdminPanel />}>

            <Route path="dashboard" element={<AdminPanel />} />
            <Route path="events" element={<ManageEvent />} />
            <Route path="attendees" element={<AttendeeList />} />
            <Route path="validate" element={<TicketValidation />} />
          </Route>

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
