import React, { useState } from 'react';
import '../styles/AboutPage.css';

function AboutPage() {
  const [events] = useState([
    {
      id: 1,
      name: 'Classical Music Festival',
      month: 'January',
      image: '🎵',
      description: 'A celebration of classical Indian music featuring renowned artists.'
    },
    {
      id: 2,
      name: 'Kathak Dance Workshop',
      month: 'February',
      image: '💃',
      description: 'Learn traditional Kathak dance from master choreographers.'
    },
    {
      id: 3,
      name: 'Cultural Food Festival',
      month: 'March',
      image: '🍜',
      description: 'Taste authentic dishes from various cultural traditions.'
    },
    {
      id: 4,
      name: 'Art Exhibition',
      month: 'April',
      image: '🎨',
      description: 'Showcase of contemporary and traditional art forms.'
    },
    {
      id: 5,
      name: 'Language & Literature Fest',
      month: 'May',
      image: '📚',
      description: 'Celebrate diverse languages and literary traditions.'
    },
    {
      id: 6,
      name: 'Summer Cultural Camp',
      month: 'June',
      image: '🏕️',
      description: 'Immersive cultural learning experience for all ages.'
    }
  ]);

  return (
    <div className="about-page">
      <section className="about-hero">
        <h1>About My Cultural Organisation</h1>
        <p>Preserving Heritage, Celebrating Diversity, Building Community</p>
      </section>

      <section className="about-content">
        <div className="about-text">
          <h2>Our Mission</h2>
          <p>
            My Cultural Organisation is dedicated to preserving, promoting, and celebrating cultural heritage. 
            We believe that cultural traditions enrich our communities and connect us to our roots. Through events, 
            workshops, and community engagement, we create spaces where people can learn, celebrate, and appreciate 
            diverse cultural expressions.
          </p>

          <h2>What We Do</h2>
          <ul>
            <li>Organize cultural events, concerts, and festivals</li>
            <li>Conduct workshops and training programs in various art forms</li>
            <li>Promote cultural awareness and appreciation</li>
            <li>Support emerging and established artists</li>
            <li>Foster community connections through shared cultural experiences</li>
          </ul>

          <h2>Why Support Us?</h2>
          <p>
            Your donation directly supports our mission to keep cultural traditions alive. Every contribution helps us:
          </p>
          <ul>
            <li>Organize world-class cultural events</li>
            <li>Provide mentorship to young artists</li>
            <li>Create accessible cultural programming for all</li>
            <li>Preserve traditional art forms for future generations</li>
          </ul>
        </div>

        <section className="featured-events">
          <h2>Featured Events</h2>
          <div className="events-grid">
            {events.map(event => (
              <div key={event.id} className="event-card">
                <div className="event-emoji">{event.image}</div>
                <h3>{event.name}</h3>
                <p className="event-month">{event.month}</p>
                <p>{event.description}</p>
              </div>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
}

export default AboutPage;
