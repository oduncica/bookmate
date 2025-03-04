import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import LibraryView from "./pages/LibraryView";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

import IgnoredBooks from "./components/IgnoredBooks";
import AdvancedSearch from "./components/AvancedSearch";
import Questionnaire from "./components/Questionnaire";
import Navbar from "./components/Navbar";
import SignUpForm from "./components/SignUpForm";
import { useAuthStore } from "./store/useAuthStore";

function App() {
  const { checkAuth, authUser, checkingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (checkingAuth) return null;

  return (
    <div className="min-h-screen">
      {authUser && <Navbar />}
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route
            path="/auth"
            element={!authUser ? <AuthPage /> : <Navigate to="/home" />}
          />
          <Route
            path="/signup"
            element={!authUser ? <SignUpForm /> : <Navigate to="/home" />}
          />
          <Route
            path="/questionnaire"
            element={!authUser ? <Questionnaire /> : <Navigate to="/home" />}
          />
          <Route
            path="/home"
            element={authUser ? <HomePage /> : <Navigate to="/auth" />}
          />
          <Route
            path="/profile"
            element={authUser ? <ProfilePage /> : <Navigate to="/auth" />}
          />
          <Route
            path="/library"
            element={authUser ? <LibraryView /> : <Navigate to="/auth" />}
          />
          <Route
            path="/ignored-books"
            element={authUser ? <IgnoredBooks /> : <Navigate to="/auth" />}
          />
          <Route
            path="/search"
            element={authUser ? <AdvancedSearch /> : <Navigate to="/auth" />}
          />
          <Route path="/passwordreset" element={<ForgotPassword />} />
          <Route path="/passwordreset/:token" element={<ResetPassword />} />
        </Routes>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
