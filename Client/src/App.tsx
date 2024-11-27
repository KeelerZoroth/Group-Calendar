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
import file_4w8jxyi56if41 from "./pages/styles/4w8jxyi56if41.jpg";
import file_minimalistNatureWnwoego7t9s1kq22 from "./pages/styles/minimalist-nature-wnwoego7t9s1kq22.jpg";


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
      // updateCurrentGroup(await retrieveGroupById(1));
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
        setPageBackgroundImage(`url(${file_4w8jxyi56if41})`);
      break;
      case "/groupinfo":
        setPageBackgroundImage(`url(${file_4w8jxyi56if41})`);
      break;
      default:
        setPageBackgroundImage(`url(${file_minimalistNatureWnwoego7t9s1kq22})`);
      break;
    }
  }, [location.pathname])
  

  return (
    <UserContext.Provider value={{currentGroup, updateCurrentGroup, currentUser, updateCurrentUser}}>
      <div style={{backgroundImage: pageBackgroundImage}} className='container'>
        {(location.pathname != "/login") && <Navbar />}
        <main>
          <Outlet />
        </main>
      </div>
    </UserContext.Provider>
  )
}

export default App
