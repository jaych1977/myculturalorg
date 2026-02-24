import React, { useState } from 'react';
import '../styles/EventCalendarPage.css';

function EventCalendarPage() {
  const [selectedMonth, setSelectedMonth] = useState('january');

  const events = {
    january: [
      { date: 15, name: 'Classical Music Festival', time: '6:00 PM' },
      { date: 28, name: 'New Year Cultural Celebration', time: '5:00 PM' }
    ],
    february: [
      { date: 5, name: 'Kathak Dance Workshop', time: '4:00 PM' },
      { date: 20, name: 'Traditional Folk Music Concert', time: '7:00 PM' }
    ],
    march: [
      { date: 10, name: 'Cultural Food Festival', time: '11:00 AM' },
      { date: 25, name: 'Spring Celebration', time: '6:00 PM' }
    ],
    april: [
      { date: 8, name: 'Art Exhibition Opening', time: '2:00 PM' },
      { date: 22, name: 'Artist Workshop Masterclass', time: '3:00 PM' }
    ],
    may: [
      { date: 5, name: 'Language & Literature Fest', time: '5:00 PM' },
      { date: 30, name: 'Poetry Reading & Discussion', time: '6:30 PM' }
    ],
    june: [
      { date: 15, name: 'Summer Cultural Camp (Begins)', time: '9:00 AM' },
      { date: 20, name: 'Youth Dance Showcase', time: '6:00 PM' }
    ],
    july: [
      { date: 10, name: 'Heritage Preservation Seminar', time: '4:00 PM' },
      { date: 25, name: 'Community Music Jam', time: '5:30 PM' }
    ],
    august: [
      { date: 5, name: 'Independence Day Cultural Show', time: '6:00 PM' },
      { date: 18, name: 'Traditional Crafts Exhibition', time: '2:00 PM' }
    ],
    september: [
      { date: 10, name: 'Harvest Festival Celebration', time: '5:00 PM' },
      { date: 28, name: 'Autumn Cultural Series', time: '7:00 PM' }
    ],
    october: [
      { date: 5, name: 'Dussehra Festival Events', time: '6:00 PM' },
      { date: 20, name: 'Cultural Art Walk', time: '4:00 PM' }
    ],
    november: [
      { date: 10, name: 'Diwali Celebrations', time: '5:30 PM' },
      { date: 25, name: 'Year-End Gala', time: '7:00 PM' }
    ],
    december: [
      { date: 15, name: 'Winter Festival', time: '6:00 PM' },
      { date: 31, name: 'New Year Eve Extravaganza', time: '8:00 PM' }
    ]
  };

  const months = [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december'
  ];

  const monthNames = {
    january: 'January',
    february: 'February',
    march: 'March',
    april: 'April',
    may: 'May',
    june: 'June',
    july: 'July',
    august: 'August',
    september: 'September',
    october: 'October',
    november: 'November',
    december: 'December'
  };

  return (
    <div className="event-calendar-page">
      <section className="calendar-hero">
        <h1>Events Calendar 2026</h1>
        <p>Explore our year-round cultural events and celebrations</p>
      </section>

      <div className="calendar-container">
        <div className="month-selector">
          {months.map(month => (
            <button
              key={month}
              className={`month-btn ${selectedMonth === month ? 'active' : ''}`}
              onClick={() => setSelectedMonth(month)}
            >
              {monthNames[month].substring(0, 3)}
            </button>
          ))}
        </div>

        <div className="events-list">
          <h2>{monthNames[selectedMonth]} 2026</h2>
          {events[selectedMonth].length > 0 ? (
            <div className="events-container">
              {events[selectedMonth].map((event, index) => (
                <div key={index} className="event-item">
                  <div className="event-date">
                    <span className="date-number">{event.date}</span>
                  </div>
                  <div className="event-details">
                    <h3>{event.name}</h3>
                    <p className="event-time">⏰ {event.time}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-events">No events scheduled for this month.</p>
          )}
        </div>

        <div className="calendar-notes">
          <h3>📌 Event Categories</h3>
          <ul>
            <li>🎵 Music & Concerts</li>
            <li>💃 Dance & Performances</li>
            <li>🎨 Art & Exhibitions</li>
            <li>🍜 Food & Culinary Arts</li>
            <li>📚 Literature & Workshops</li>
            <li>🎭 Theater & Drama</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default EventCalendarPage;
