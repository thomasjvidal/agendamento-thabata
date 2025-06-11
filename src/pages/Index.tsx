import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HumanoidSection from "@/components/HumanoidSection";
import SpecsSection from "@/components/SpecsSection";
import FeaturedServices from "@/components/FeaturedServices";
import DetailsSection from "@/components/DetailsSection";
import ImageShowcaseSection from "@/components/ImageShowcaseSection";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import MadeByHumans from "@/components/MadeByHumans";
import Footer from "@/components/Footer";
import AppointmentForm from "@/components/AppointmentForm";
import InstagramGallery from "@/components/InstagramGallery";
import ThabataHeroSection from "@/components/ThabataHeroSection";

const Index = () => {
  // Initialize intersection observer to detect when elements enter viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));
    
    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  useEffect(() => {
    // This helps ensure smooth scrolling for the anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href')?.substring(1);
        if (!targetId) return;
        
        const targetElement = document.getElementById(targetId);
        if (!targetElement) return;
        
        // Increased offset to account for mobile nav
        const offset = window.innerWidth < 768 ? 100 : 80;
        
        window.scrollTo({
          top: targetElement.offsetTop - offset,
          behavior: 'smooth'
        });
      });
    });
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="space-y-4 sm:space-y-8">
        <Hero />
        <HumanoidSection />
        <SpecsSection />
        <section className="py-20 bg-gray-50" id="services">
          <div className="section-container">
            <div className="text-center mb-12 sm:mb-20">
              <div className="pulse-chip mx-auto mb-3 sm:mb-4 fade-in-element">
                <span>Serviços</span>
              </div>
              <h2 className="section-title mb-3 sm:mb-4 fade-in-element">Serviços</h2>
              <p className="section-subtitle mx-auto fade-in-element">
                Conheça nossos principais serviços de beleza e maquiagem profissional.
              </p>
            </div>
            <ThabataHeroSection />
          </div>
        </section>
        <FeaturedServices />
        <AppointmentForm />
        <InstagramGallery />
        {/* <DetailsSection /> */}
        {/* <ImageShowcaseSection /> */}
        {/* <Features /> */}
        {/* <Testimonials /> */}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
