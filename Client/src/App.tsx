import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';
import { useEffect, useState } from 'react';
import { GroupData } from './interfaces/GroupData';
import UserContext from './components/UserContext';
import { retrieveGroupById } from './api/groupAPI';

function App() {
  const [currentGroup, setCurrentGroup] = useState<GroupData | null>(null);

  const updateCurrentGroup = (groupData: GroupData | null) => {
    setCurrentGroup(groupData);
  }

  // this code is temporary
  useEffect(() => {
    (async () => {
    updateCurrentGroup(await retrieveGroupById(1))
    })()
  }, []);
  

  return (
    <UserContext.Provider value={{currentGroup, updateCurrentGroup}}>
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
