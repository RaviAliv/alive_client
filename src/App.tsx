import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import FacultyPage from "./pages/FacultyPage";
import CoursesPage from "./pages/CoursesPage";
import FoundationPage from "./pages/FoundationPage";
import FAQPage from "./pages/FAQPage";
import ContactPage from "./pages/ContactPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />

          {/* <Route path="about" element={<AboutPage />} /> */}
          {/* <Route path="faculty" element={<FacultyPage />} /> */}
          <Route path="courses" element={<CoursesPage />} />
          <Route path="foundation" element={<FoundationPage />} />
          {/* <Route path="faq" element={<FAQPage />} /> */}
          {/* <Route path="contact" element={<ContactPage />} /> */}
          {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
