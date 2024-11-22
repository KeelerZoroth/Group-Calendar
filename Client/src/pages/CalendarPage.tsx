import React, { useState, useEffect } from 'react';
import '../calendar.css';

interface Event {
  id: number;
  date: string; // ISO date string (e.g., '2024-11-19')
  title: string;
}

const eventsData: Event[] = [
  { id: 1, date: '2024-11-19', title: 'Birthday' },
  { id: 2, date: '2024-11-25', title: 'Meeting' },
  { id: 3, date: '2024-11-30', title: 'Conference' },
];
const Calendar: React.FC = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [newEventTitle, setNewEventTitle] = useState<string>('');
  
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      // const response = await fetch('http://localhost:3000/api/events');
      // const data = await response.json();
      // setEvents(data);
      setEvents(eventsData); //delete later
    } catch (error) {
      console.error('Error gathering events:', error);
    }
  };

  const handleAddEvent = async () => {
    if (selectedDate && newEventTitle.trim()) {
      const newEvent = { date: selectedDate, title: newEventTitle.trim()} as Event;
      newEvent.id = Date.now();//delete later
      setEvents([...events, newEvent]);//delete later
      // try {
      //   const response = await fetch('http://localhost:3000/api/events', {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify(newEvent),
      //   });

      //   if (response.ok) {
      //     const addedEvent = await response.json();
      //     setEvents([...events, addedEvent]);
      //     setNewEventTitle('');
      //     setSelectedDate(null);
      //   }
      // } catch (error) {
      //   console.error('Error adding event:', error);
      // }
    }
  };

  const handleDeleteEvent = async (id: number) => {
    setEvents(events.filter((event) => event.id !== id));//delete later
    // try {
    //   const response = await fetch(`http://localhost:3000/api/events/${id}`, {
    //     method: 'DELETE',
    //   });

    //   if (response.ok) {
    //     setEvents(events.filter((event) => event.id !== id));
    //   }
    // } catch (error) {
    //   console.error('Error deleting event:', error);
    // }
  };

  const renderDaysOfWeek = () => {
    // Render a row of days of the week
    return (
      <div className="days-of-week">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="day-label">
            {day}
          </div>
        ))}
      </div>
    );
  };
  
  const renderCalendar = () => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const calendarDays: JSX.Element[] = [];
    let dayCounter = 1;

    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(<div className="calendar-cell empty" key={`empty-${i}`}></div>);
    }

    while (dayCounter <= daysInMonth) {
      const date = new Date(currentYear, currentMonth, dayCounter).toISOString().split('T')[0];
      const dayEvents = events.filter((event) => event.date === date);
      calendarDays.push(
        <div className="calendar-cell" key={`day-${dayCounter}`} onClick={() => setSelectedDate(date)}>
          <span className="date">{dayCounter}</span>
          <div className="events">
            {dayEvents.map((event) => (
              <div
                key={event.id}
                className="event"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteEvent(event.id);
                }}
              >
                {event.title} (x)
              </div>
            ))}
          </div>
        </div>
      );
      dayCounter++;
    }

    return calendarDays;
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
      <button
  onClick={() => {
    if (currentMonth === 0) {
      setCurrentMonth(11); // December
      setCurrentYear((prevYear) => prevYear - 1); // Go to the previous year
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  }}
>
  &lt;
</button>
<h2>
  {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} {currentYear}
</h2>
<button
  onClick={() => {
    if (currentMonth === 11) {
      setCurrentMonth(0); // January
      setCurrentYear((prevYear) => prevYear + 1); // Go to the next year
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  }}
>
  &gt;
</button>

      </div>
      {renderDaysOfWeek()}
      <div className="calendar-grid">{renderCalendar()}</div>
      {selectedDate && (
        <div className="event-form">
          <h3>Add Event for {selectedDate}</h3>
          <input
            type="text"
            value={newEventTitle}
            onChange={(e) => setNewEventTitle(e.target.value)}
            placeholder="Event Title"
          />
          <button onClick={handleAddEvent}>Add Event</button>
          <button onClick={() => setSelectedDate(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};



export default Calendar;
