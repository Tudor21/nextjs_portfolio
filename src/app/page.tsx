import Footer from "@/components/sections/Footer";
import Hero from "@/components/sections/Hero";
import NavBar from "@/components/NavBar";
import AboutMe from "@/components/sections/AboutMe";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Message from "@/components/sections/Message";
import Contact from "@/components/sections/Contact";
import DownloadCV from "@/components/sections/DownloadCV";

export default function Home() {
  return (
    <div>
      <NavBar />
      <Hero />
      <AboutMe />
      <Experience />
      <Message />
      <Skills />
      <Message />
      <Projects />
      <Message />
      <Contact />
      <DownloadCV />
      <Footer />
    </div>
  );
}
