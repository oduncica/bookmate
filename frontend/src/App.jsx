import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/HomePage";
import WelcomeScreen from "./pages/WelcomeScreen";
import ProfilePage from "./pages/ProfilePage";
import LibraryView from "./pages/LibraryView";
import TermsPage from "./pages/TermsPage";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import PrivacyPolicy from "./components/PrivacyPolicy";

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
            element={!authUser ? <WelcomeScreen /> : <Navigate to="/home" />}
          />
          <Route
            path="/signup"
            element={!authUser ? <SignUpForm /> : <Navigate to="/home" />}
          />
          <Route path="/questionnaire" element={<Questionnaire />} />
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
          <Route 
            path="/terms" 
            element={authUser ? <TermsPage /> : <Navigate to="/auth" />}
          />
          <Route 
          path="/privacy"
          element={authUser ? <PrivacyPolicy /> : <Navigate to="/auth"/>} 
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
