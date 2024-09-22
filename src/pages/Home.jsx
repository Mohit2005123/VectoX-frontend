import React from "react";
import MyNavbar from "../components/MyNavbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import CallToAction from "../components/CallToAction";
import Footer from "../components/Footer";
import FAQ from "../components/FAQ";
import Testimonials from "../components/Testimonials";
import HowItWorks from "../components/HowItWorks";
function Home() {
  return(
    <div>
        <MyNavbar></MyNavbar>
        <Hero></Hero>
        <Features></Features>
        <CallToAction></CallToAction>
        <FAQ></FAQ>
        <Footer></Footer>
    </div>
  )
}

export default Home;