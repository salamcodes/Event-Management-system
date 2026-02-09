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
import MyTickets from "./pages/users/MyTickets";
import EventDetail from "./pages/users/EventDetail";

import ManageEvent from './pages/admin/ManageEvent'
import AttendeeList from "./pages/admin/AttendeeList";
import TicketValidation from "./pages/admin/TicketValidation";
import AddEvent from './pages/admin/AddEvent'
import BookTicket from "./pages/users/BookTicket";
import TicketPage from "./pages/users/TicketPage";
import About from "./pages/About";


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>

          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
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
                <MyTickets />
              </ProtectedRoute>
            }
          />
          <Route
            path="/book-ticket/:id"
            element={
              <ProtectedRoute>
                <BookTicket />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ticket-success/:id"
            element={
              <ProtectedRoute>
                <TicketPage />
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



          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
        </Routes>


      </AuthProvider>
    </BrowserRouter >
  );
}

export default App;
