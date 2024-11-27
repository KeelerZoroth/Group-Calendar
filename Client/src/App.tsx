import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';
import { useEffect, useState } from 'react';
import { GroupData } from './interfaces/GroupData';
import UserContext from './components/UserContext';
import { retrieveGroupById } from './api/groupAPI';
import Auth from './utils/auth.js';
import { login } from './api/authAPI';
import { UserData } from './interfaces/UserData.js';
import { retrieveAllUsers } from './api/userAPI.js';

function App() {
  const [currentGroup, setCurrentGroup] = useState<GroupData | null>(null);
  const [currentUser, setCurrentUser] = useState<UserData>({} as UserData);

  const updateCurrentGroup = (groupData: GroupData | null) => {
    setCurrentGroup(groupData);
  }

  const updateCurrentUser = (userData: UserData) => {
    setCurrentUser(userData);
  }



  // this code is temporary
  useEffect(() => {
    (async () => {
      updateCurrentGroup(await retrieveGroupById(1))
      const someUserData = { username: 'SunnyScribe', password: 'password'};
      Auth.login((await login(someUserData)).token)
      updateCurrentUser((await retrieveAllUsers((Auth.getProfile() as {username: string}).username))[0])
    })()
  }, []);
  
  console.log(currentUser);

  return (
    <UserContext.Provider value={{currentGroup, updateCurrentGroup, currentUser, updateCurrentUser}}>
      <div className='container'>
        <Navbar />
        <main>
          <Outlet />
        </main>
      </div>
    </UserContext.Provider>
  )
}

export default App
