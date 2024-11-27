import React, { useState, useEffect, useContext } from 'react';
import '../calendar.css';
import UserContext from '../components/UserContext';
import { retrieveGroupDays } from '../api/groupAPI';
import { Link } from 'react-router-dom';
import Auth from "../utils/auth.js";
import LoggedOutCard from '../components/LoggedOutCard.js';


const Calendar: React.FC = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [numOfComments, setNumOfComments] = useState<{[key: string]: number}>({});
  const { currentGroup } = useContext(UserContext);





  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  useEffect(() => {
    fetchNumOfComments();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentGroup]);

  const blankDays: {[key: string]: number} = {};
  const fetchNumOfComments = async () => {
    try {
      if(currentGroup){
        const response = await retrieveGroupDays(currentGroup.id as number);
        Object.keys(response).forEach((dateKey) => {
          blankDays[dateKey] = response[dateKey].length
        });
      }
      setNumOfComments(blankDays);
    } catch (error) {
      console.error('Error gathering comments:', error);
    }
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
      calendarDays.push(
          <Link to={'/modifydate'} className="calendar-cell" key={`day-${dayCounter}`}>

            <span className="date">{dayCounter}</span>
            {numOfComments[date] && 
                <div className="event">
                  {`${numOfComments[date]}`}
                </div>
            }
          </Link>
        
      );
      dayCounter++;
    }

    return calendarDays;
  };

  return (

    <>
    {Auth.loggedIn() !== '' ?
    (<div className="calendar-container">
      {currentGroup ? 
      <div>
      <div className="calendar-header">
      <button
         onClick={() => {
          if (currentMonth === 0) {
           setCurrentMonth(11); // December
            setCurrentYear((prevYear) => prevYear - 1); // Go to the previous year
          } else {
            setCurrentMonth(currentMonth - 1);
          }
        }}>
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
        }}>
        &gt;
      </button>

      </div>
        {renderDaysOfWeek()}
      <div className="calendar-grid">{renderCalendar()}</div>
      </div>
       : 
       <div>
        <h2>No Group Selected</h2>
       </div>
       }
    </div>)
    :
    <LoggedOutCard />
    }
    </>
  );
};



export default Calendar;
