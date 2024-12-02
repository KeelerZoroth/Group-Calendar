import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../components/UserContext';
import { retrieveGroupDays } from '../api/groupAPI';
import LoggedOutCard from '../components/LoggedOutCard.js';
import Auth from "../utils/auth.js";
import '../navbar.css';
import { PlusCircle, ArrowLeft, ArrowRight } from 'react-feather'; // Import icons

import CommentCard from '../components/CommentCard.js';

import { CommentData } from '../interfaces/CommentData.js';
import { createComment } from '../api/commentAPI.js';

const Calendar: React.FC = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [numOfComments, setNumOfComments] = useState<{[key: string]: number}>({});
  const { currentGroup, currentUser } = useContext(UserContext);
  
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [dateComments, setDateComments] = useState<CommentData[]>([]);
  const [commentInputContent, setCommentInputContent] = useState<string>('')



  const updateDateComments = async () => {
    try {
      if(currentGroup && selectedDate){
        const response = await retrieveGroupDays(currentGroup.id as number, {year: currentYear, month: currentMonth + 1});
        if(response[selectedDate]){
          setDateComments(response[selectedDate]);
        } else {
          setDateComments([]);
        }
      }
    } catch (error) {
      console.error('Error gathering comments:', error);
    }
  }

  const createNewComment = async ({content, calendarDay, calendarMonth, calendarYear, groupId, createdByUserId}: {content: string, calendarDay: number, calendarMonth: number, calendarYear: number, groupId: number, createdByUserId: number}) => {
    console.log(await createComment({content, calendarDay, calendarMonth, calendarYear, groupId, createdByUserId}))
    updateDateComments()
  };


  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  useEffect(() => {
    fetchNumOfComments();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentGroup, dateComments]);


  useEffect(() => {
    updateDateComments();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate])


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
          <div onClick={() => {
            setSelectedDate(date)
          }} className="calendar-cell" key={`day-${dayCounter}`}>

            <span className="date">{dayCounter}</span>
            {numOfComments[date] && 
                <div className="events">
                  {`${numOfComments[date]}`}
                </div>
            }
          </div>
        
      );
      dayCounter++;
    }
    return calendarDays;
  };


  const renderDateInfo = () => {

    return (

    //New Event Stylizing
      <div className='event-form'>
        <div className="event-form-header">

        
        <button className='event-form-back-button' onClick={() => {
          setSelectedDate(null);
        }}>
          <ArrowLeft className="event-form-back-icon" />
          Back
        </button>
       
       
          <h2>
            {`${new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} 
            ${parseInt(selectedDate?.split('-')[2] as string)},
            ${currentYear}`}
          </h2>

        </div>
        <div  className="event-form-input-container">
          <input
              type="text"
              id="comment"
              value={commentInputContent}
              onChange={(e) => setCommentInputContent(e.target.value)}
              placeholder="New Event"
              required
          />
          <button className='event-form-create-button' onClick={
            () => {
              const newCommentData = {
                content: commentInputContent,
                calendarDay: parseInt(selectedDate?.split('-')[2] as string),
                calendarMonth: currentMonth + 1, 
                calendarYear: currentYear, 
                groupId: currentGroup!.id  as number, 
                createdByUserId: currentUser.id as number
              }
              createNewComment(newCommentData);
              setCommentInputContent('');
          }}>
            Add Event <PlusCircle className="event-form-plus-icon" /> {/* Add the icon here */}
          </button>
        </div>

      <div>


            {
            dateComments.map((nextComment, keyIndex) => {
              return (
                <CommentCard comment={nextComment} updateCommentsFunc={updateDateComments} key={keyIndex}/>
                )
            })}
        </div>

      </div>
    )
  }




  return (

    <>
    {Auth.loggedIn() !== '' ?
    (<div className="calendar-container">
      {currentGroup ? 
      
      <>
        { selectedDate === null ?
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
            <ArrowLeft className="event-form-arrows-icon" />
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
            <ArrowRight className="event-form-arrows-icon" />
          </button>

          </div>
            {renderDaysOfWeek()}
          <div className="calendar-grid">{renderCalendar()}</div>
        </div>
        :
        <>{renderDateInfo()}</>
        }
        </>
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
