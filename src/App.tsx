import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import FacultyPage from "./pages/FacultyPage";
import CoursesPage from "./pages/CoursesPage";
import FoundationPage from "./pages/course/FoundationPage";
import FoundationLecturePage from "./pages/course/FoundationLecturePage";
import FoundationEnrollPage from "./pages/FoundationEnrollPage";
import CorePage from "./pages/course/CorePage";
import CoreLecturePage from "./pages/course/CoreLecturePage";
import AdvancedPage from "./pages/course/AdvancedPage";
import MasterclassPage from "./pages/course/MasterclassPage";
import FAQPage from "./pages/FAQPage";
import ContactPage from "./pages/ContactPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import RegistrationPage from "./pages/RegistrationPage";
import VideoPage from "./pages/VideoPage";
import ProtectedPanel from "./panel/shared/ProtectedPanel";
import PanelLayout from "./panel/shared/PanelLayout";
import PanelIndex from "./panel/shared/PanelIndex";
import MyCourses from "./panel/student/MyCourses";
import AdminDashboard from "./panel/admin/Dashboard";
import GrantAccess from "./panel/admin/GrantAccess";
import SuperDashboard from "./panel/superadmin/Dashboard";
import AllUsers from "./panel/superadmin/Users";
import ManageAdmins from "./panel/superadmin/Admins";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>

          {/* Main site — with Nav + Footer */}
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="verify-email" element={<VerifyEmailPage />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
            <Route path="reset-password" element={<ResetPasswordPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="faculty" element={<FacultyPage />} />
            <Route path="courses" element={<CoursesPage />} />
            <Route path="course/foundation" element={<FoundationPage />} />
            <Route path="course/foundation/enroll" element={<FoundationEnrollPage />} />
            <Route path="course/foundation/lecture/:num" element={<FoundationLecturePage />} />
            <Route path="course/core" element={<CorePage />} />
            <Route path="course/core/lecture/:num" element={<CoreLecturePage />} />
            <Route path="course/advanced" element={<AdvancedPage />} />
            <Route path="course/masterclass" element={<MasterclassPage />} />
            <Route path="foundation" element={<Navigate to="/course/foundation" replace />} />
            <Route path="foundation/enroll" element={<Navigate to="/course/foundation/enroll" replace />} />
            <Route path="core" element={<Navigate to="/course/core" replace />} />
            <Route path="faq" element={<FAQPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="registration" element={<RegistrationPage />} />
            <Route path="video" element={<VideoPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>

          {/* Panel — own sidebar layout, no main Nav/Footer */}
          <Route path="/panel" element={<ProtectedPanel />}>
            <Route index element={<PanelIndex />} />
            <Route element={<PanelLayout />}>
              <Route path="my-courses" element={<MyCourses />} />
              <Route path="admin" element={<AdminDashboard />} />
              <Route path="admin/grant" element={<GrantAccess />} />
              <Route path="super" element={<SuperDashboard />} />
              <Route path="super/users" element={<AllUsers />} />
              <Route path="super/admins" element={<ManageAdmins />} />
            </Route>
          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
