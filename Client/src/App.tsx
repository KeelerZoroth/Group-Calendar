import { Outlet, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import { useEffect, useState } from 'react';
import { GroupData } from './interfaces/GroupData';
import UserContext from './components/UserContext';
import Auth from './utils/auth.js';
import { UserData } from './interfaces/UserData.js';
import { retrieveAllUsers } from './api/userAPI.js';


//imported images
import file_Image2 from "./pages/styles/image2.jpg";
import file_Image from "./pages/styles/image.jpg";
import file_Image4 from "./pages/styles/image4.jpg";
import file_Image3 from "./pages/styles/image3.jpg";
import file_Image5 from "./pages/styles/image5.jpg";


function App() {
  const [currentGroup, setCurrentGroup] = useState<GroupData | null>(null);
  const [currentUser, setCurrentUser] = useState<UserData>({} as UserData);
  const [pageBackgroundImage, setPageBackgroundImage] = useState<string>(`url(${file_Image})`);
  const location = useLocation();

  const updateCurrentGroup = async (groupData: GroupData | null) => {
    setCurrentGroup(groupData);
  }

  const updateCurrentUser = async () => {
    try{
      setCurrentUser((await retrieveAllUsers((Auth.getProfile() as {username: string}).username))[0])
    } catch {
      console.log("can't setup current user");
    }
  }

  useEffect(() => {
    (async () => {
      updateCurrentUser()
    })()
  }, []);



  useEffect(() => {
    switch(location.pathname) {
      case "/login":
        setPageBackgroundImage(`url(${file_Image})`);
      break;
      case "/register":
        setPageBackgroundImage(`url(${file_Image2})`);
      break;
      case "/viewgroups":
        setPageBackgroundImage(`url(${file_Image4})`);
      break;
      case "/groupinfo":
        setPageBackgroundImage(`url(${file_Image4})`);
      break;
      case "/modifydate":
        setPageBackgroundImage(`url(${file_Image5})`);
      break;
      default:
        setPageBackgroundImage(`url(${file_Image3})`);
      break;
    }
  }, [location.pathname])
  

  return (
    <UserContext.Provider value={{currentGroup, updateCurrentGroup, currentUser, updateCurrentUser}}>
      <div className='container'>
        {(location.pathname != "/login") && <Navbar />}
        <main>
          <Outlet />
        </main>
        <div style={{backgroundImage: pageBackgroundImage}} id='background-image-div' />
      </div>
    </UserContext.Provider>
  )
}

export default App
