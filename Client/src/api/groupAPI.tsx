import Auth from '../utils/auth';

// GET /groups - Get all groups
export const retrieveAllGroups = async (groupName?: string, hostUserId?: number ) => {
  try {
    let fetchString: string = `/api/groups?`;
    if(groupName) {fetchString = fetchString + `groupName=${groupName}&`}
    if(hostUserId) {fetchString = fetchString + `hostUserId=${hostUserId}&`}
    const response = await fetch((fetchString), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      },
    });
    const data = await response.json();

    if(!response.ok) {
      throw new Error('invalid group API response, check network tab!');
    }

    return data;

  } catch (err) { 
    console.log('Error from data retrieval:', err);
    return [];
  }
}

// GET /groups/:id - Get a Group by id
export const retrieveGroupById = async (groupId: number) => {
  try {
    const response = await fetch((`/api/groups/${groupId}`), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      }
    });
    const data = await response.json();

    if(!response.ok) {
      throw new Error('invalid group API response, check network tab!');
    }

    return data;

  } catch (err) { 
    console.log('Error from data retrieval:', err);
    return [];
  }
}

// GET /groups/:id/users
export const retrieveGroupUsers = async (groupId: number) => {
  try {
    const response = await fetch((`/api/groups/${groupId}/users`), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      }
    });
    const data = await response.json();

    if(!response.ok) {
      throw new Error('invalid group API response, check network tab!');
    }

    return data;

  } catch (err) { 
    console.log('Error from data retrieval:', err);
    return [];
  }
}

// GET /groups/:id/comments
export const retrieveGroupComments = async (groupId: number) => {
  try {
    const response = await fetch((`/api/groups/${groupId}/comments`), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      }
    });
    const data = await response.json();

    if(!response.ok) {
      throw new Error('invalid group API response, check network tab!');
    }

    return data;

  } catch (err) { 
    console.log('Error from data retrieval:', err);
    return [];
  }
}

// GET /groups/:id/days
export const retrieveGroupDays = async (groupId: number, query?: { year?: number, month?: number, day?: number }) => {
  try {
    let fetchString: string = `/api/groups/${groupId}/days?`;
    if(query){
      if(query!.year) {fetchString = fetchString + `year=${query!.year}&`}
      if(query!.month) {fetchString = fetchString + `month=${query!.month}&`}
      if(query!.day) {fetchString = fetchString + `day=${query!.day}&`}
    }

    const response = await fetch((fetchString), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      }
    });
    const data = await response.json();

    if(!response.ok) {
      throw new Error('invalid group API response, check network tab!');
    }

    return data;

  } catch (err) { 
    console.log('Error from data retrieval:', err);
    return [];
  }
}

// POST /groups - Create a new Group
export const createGroup = async (groupData: {groupName: string, hostUserId: number}) => {
  try {
    const response = await fetch((`/api/groups`), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      },
      body: JSON.stringify(groupData)
    });
    const data = await response.json();

    if(!response.ok) {
      throw new Error('invalid group API response, check network tab!');
    }

    return data;

  } catch (err) { 
    console.log('Error from data retrieval:', err);
    return [];
  }
}

// POST /groups/:groupId/users/:userId
export const addUserToGroup = async (groupId: number, userId: number) => {
  try {
    const response = await fetch((`/api/groups/${groupId}/users/${userId}`), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      },
    });
    const data = await response.json();

    if(!response.ok) {
      throw new Error('invalid group API response, check network tab!');
    }

    return data;

  } catch (err) { 
    console.log('Error from data retrieval:', err);
    return [];
  }
}

// PUT /groups/:id - Update a Group by id
export const updateGroup = async (groupId: number, groupData?: {groupName?: string, hostUserId?: number}) => {
  try {
    const response = await fetch((`/api/groups/${groupId}`), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      },
      body: JSON.stringify(groupData)
    });
    const data = await response.json();

    if(!response.ok) {
      throw new Error('invalid group API response, check network tab!');
    }

    return data;

  } catch (err) { 
    console.log('Error from data retrieval:', err);
    return [];
  }
}

// DELETE /groups/:id - Delete a Group by id
export const deleteGroup = async (groupId: number) => {
  try {
    const response = await fetch((`/api/groups/${groupId}`), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      },
    });
    const data = await response.json();

    if(!response.ok) {
      throw new Error('invalid group API response, check network tab!');
    }

    return data;

  } catch (err) { 
    console.log('Error from data retrieval:', err);
    return [];
  }
}

// DELETE /groups/:groupId/user/:userId
export const removeUserFromGroup = async (groupId: number, userId: number) => {
  try {
    const response = await fetch((`/api/groups/${groupId}/users/${userId}`), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      },
    });
    const data = await response.json();

    if(!response.ok) {
      throw new Error('invalid group API response, check network tab!');
    }

    return data;

  } catch (err) { 
    console.log('Error from data retrieval:', err);
    return [];
  }
}