import React, { useState } from 'react';
import "./styles.css";
import ChatBookingWidget from './components/ChatBookingWidget.jsx';
import Hero from './components/Hero.jsx';

export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false);

  const services = [
    {
      title: "Mini Splits",
      desc: "High-efficiency heating and cooling with fast installs.",
      image: "/assets/services/mini-splits.png"
    },
    {
      title: "Central Heat Pumps",
      desc: "Whole-home comfort designed for our climate.",
      image: "/assets/services/central-heat-pumps.png"
    },
    {
      title: "Insulation",
      desc: "Keep the heat in, lower your bills, and improve comfort.",
      image: "/assets/services/insulation.png"
    },
    {
      title: "Air Exchangers & Ventilation",
      desc: "Cleaner air, better airflow, and balanced humidity.",
      image: "/assets/services/air-exchangers.png"
    },
    {
      title: "Heat Pump & Ventilation Cleaning",
      desc: "Boost efficiency, airflow, and extend equipment life.",
      image: "/assets/services/cleaning.png"
    },
    {
      title: "Water Treatment",
      desc: "Alkaline water conditioners for better tasting water and plumbing protection (not RO).",
      image: "/assets/services/water.png"
    }
  ];

  return (
    <div id="home">
      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand">
            <img src="/assets/logo.png" alt="Maritime HVAC" className="brand-logo" />
          </div>

          <nav className="nav-links">
            <a href="#home" className="active">HOME</a>
            <a href="#services">SERVICES</a>
            <a href="#about">ABOUT</a>
            <a href="#contact">CONTACT</a>
          </nav>

          <a className="topbar-cta" href="#booking">
            REQUEST SERVICE
          </a>
        </div>
      </header>

      <Hero onOpenBooking={() => setBookingOpen(true)} />

      <div className="proof-bar">
        <span>Licensed & Insured</span>
        <span>Residential + Commercial</span>
        <span>Serving the Maritimes</span>
        <span>Fast Response Times</span>
      </div>

      <section className="services-modern" id="services">
        <div className="services-head">
          <h2>Services Built for Maritime Weather</h2>
          <p>
            Heating, cooling, electrical, and water solutions — installed clean,
            sized correctly, and built to last.
          </p>
        </div>

        <div className="services-cards">
          {services.map((service, i) => (
            <div className="service-card" key={i}>
              <img
                src={service.image}
                alt={service.title}
                className={`service-image ${service.isIcon ? 'is-icon' : ''}`}
              />
              <div className="service-body">
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
                <button className="service-btn">View Service</button>
              </div>
            </div>
          ))}
        </div>

        <div className="services-actions">
          <button className="svc-main-btn">VIEW ALL SERVICES</button>
        </div>
      </section>
      <ChatBookingWidget open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}