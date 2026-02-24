import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

function HomePage() {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>My Cultural Organisation</h1>
          <p>Celebrating Culture, Supporting Community</p>
          <Link to="/about" className="btn btn-primary">
            Learn More About Us
          </Link>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <h3>🎭 About Us</h3>
          <p>Learn about our mission, vision, and the cultural events we organize throughout the year.</p>
          <Link to="/about" className="btn btn-secondary">Explore</Link>
        </div>

        <div className="feature-card">
          <h3>📅 Event Calendar</h3>
          <p>Browse our complete event calendar for the year and mark your favorites.</p>
          <Link to="/events" className="btn btn-secondary">View Events</Link>
        </div>

        <div className="feature-card">
          <h3>💝 Support Us</h3>
          <p>Help us continue our cultural mission by making a donation today.</p>
          <Link to="/payment" className="btn btn-secondary">Donate Now</Link>
        </div>
      </section>

      <section className="cta-section">
        <h2>Join Our Community</h2>
        <p>Be part of a vibrant cultural movement. Your support helps us preserve and celebrate our heritage.</p>
        <Link to="/payment" className="btn btn-primary">Make a Donation</Link>
      </section>
    </div>
  );
}

export default HomePage;
