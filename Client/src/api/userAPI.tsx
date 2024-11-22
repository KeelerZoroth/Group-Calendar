import { UserData } from '../interfaces/UserData';
import { UserLogin } from '../interfaces/UserLogin';
import Auth from '../utils/auth';

// GET /users - Get all users
export const retrieveAllUsers = async (username: string) => {
  try {
    const response = await fetch(('/api/users'), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      },
      body: JSON.stringify({username})
    });
    const data = await response.json();

    if(!response.ok) {
      throw new Error('invalid user API response, check network tab!');
    }

    return data;

  } catch (err) { 
    console.log('Error from data retrieval:', err);
    return [];
  }
}

// GET /users/:id - Get a user by id
export const retrieveUserById = async (userId: number) => {
  try {
    const response = await fetch((`/api/users/${userId}`), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      }
    });
    const data = await response.json();

    if(!response.ok) {
      throw new Error('invalid user API response, check network tab!');
    }

    return data;

  } catch (err) { 
    console.log('Error from data retrieval:', err);
    return [];
  }
}

// GET /users/:id/groups
export const retrieveUserGroups = async (userId: number) => {
  try {
    const response = await fetch((`/api/users/${userId}/groups`), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      }
    });
    const data = await response.json();

    if(!response.ok) {
      throw new Error('invalid user API response, check network tab!');
    }

    return data;

  } catch (err) { 
    console.log('Error from data retrieval:', err);
    return [];
  }
}

// GET /users/:id/comments
export const retrieveUserComments = async (userId: number) => {
  try {
    const response = await fetch((`/api/users/${userId}/comments`), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      }
    });
    const data = await response.json();

    if(!response.ok) {
      throw new Error('invalid user API response, check network tab!');
    }

    return data;

  } catch (err) { 
    console.log('Error from data retrieval:', err);
    return [];
  }
}

// POST /users - Create a new user
export const createUser = async (userData: UserLogin) => {
  try {
    const response = await fetch((`/api/users`), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      },
      body: JSON.stringify(userData)
    });
    const data = await response.json();

    if(!response.ok) {
      throw new Error('invalid user API response, check network tab!');
    }

    return data;

  } catch (err) { 
    console.log('Error from data retrieval:', err);
    return [];
  }
}

// PUT /users/:id - Update a user by id
export const updateUser = async (userId: number, userData?: UserData) => {
  try {
    const response = await fetch((`/api/users/${userId}`), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      },
      body: JSON.stringify(userData)
    });
    const data = await response.json();

    if(!response.ok) {
      throw new Error('invalid user API response, check network tab!');
    }

    return data;

  } catch (err) { 
    console.log('Error from data retrieval:', err);
    return [];
  }
}

// DELETE /users/:id - Delete a user by id
export const deleteUser = async (userId: number) => {
  try {
    const response = await fetch((`/api/users/${userId}`), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      },
    });
    const data = await response.json();

    if(!response.ok) {
      throw new Error('invalid user API response, check network tab!');
    }

    return data;

  } catch (err) { 
    console.log('Error from data retrieval:', err);
    return [];
  }
}