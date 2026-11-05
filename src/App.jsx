import { Suspense, lazy, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CustomCursor from "./components/ui/CustomCursor";
import AnimatedBackground from "./components/ui/AnimatedBackground";
import LoadingScreen from "./components/ui/LoadingScreen";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import content from "./data";

const AdminLogin = lazy(() => import("./admin/AdminLogin"));
const Admin = lazy(() => import("./admin/Admin"));

const sections = { hero: Hero, about: About, experience: Experience, skills: Skills, projects: Projects, contact: Contact };

function Portfolio() {
  const [loaded, setLoaded] = useState(true);

  return (
    <>
      {/* Global UI */}
      <CustomCursor />
      <AnimatedBackground />
      <LoadingScreen onComplete={() => setLoaded(true)} />

      {/* Main content */}
      <div
        className="relative z-10"
        style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.5s ease", minHeight: "100vh" }}
        aria-hidden={!loaded}
      >
        <Navbar />
        <main>
          {content.sectionOrder.map((id) => {
            const Section = sections[id];
            return Section && <Section key={id} />;
          })}
        </main>
        <Footer />
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Portfolio />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
