import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
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

function App() {
  const [loaded, setLoaded] = useState(true);

  return (
    <BrowserRouter>
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
          <Hero />
          <About />
          <Experience />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
