import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import TripsPage from "./pages/TripPage";
import Navbar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateTripPage from "./pages/CreateTripPage";
import SingleTripPage from "./pages/SingleTripPage";
import EditTripPage from "./pages/EditTripPage";
import Logout from "./pages/Logout";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<Logout />} />
        <Route
          path="/profile/:userId"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/trips"
          element={
            <ProtectedRoute>
              <TripsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-trip"
          element={
            <ProtectedRoute>
              <CreateTripPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-trip/:id"
          element={
            <ProtectedRoute>
              <EditTripPage />
            </ProtectedRoute>
          }
        />
        <Route path="/trips/:id" element={<SingleTripPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
