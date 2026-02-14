import { Toaster } from "react-hot-toast";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import WhyChooseUs from "./components/WhyChooseUs";
import CTA from "./components/CTA";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Toaster position="top-right" />

      <Header />
      <main className="main-content">
        <Hero />
        <Services />
        <About />
        <WhyChooseUs />
        <CTA />
        <Contact />
        <Footer />
      </main>
    </>
  );
}

export default App;
