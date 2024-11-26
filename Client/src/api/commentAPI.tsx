import Auth from '../utils/auth';

// GET /comments - Get all comments
export const retrieveAllComments = async () => {
  try {
    const response = await fetch(('/api/comments'), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      },
    });
    const data = await response.json();

    if(!response.ok) {
      throw new Error('invalid comment API response, check network tab!');
    }

    return data;

  } catch (err) { 
    console.log('Error from data retrieval:', err);
    return [];
  }
}

// GET /comments/:id - Get a comment by id
export const retrieveCommentById = async (commentId: number) => {
  try {
    const response = await fetch((`/api/comments/${commentId}`), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      }
    });
    const data = await response.json();

    if(!response.ok) {
      throw new Error('invalid comment API response, check network tab!');
    }

    return data;

  } catch (err) { 
    console.log('Error from data retrieval:', err);
    return [];
  }
}

// POST /comments - Create a new comment
export const createUser = async (commentData: { content: string, calendarYear: number, calendarMonth: number, calendarDay: number, groupId: number, createdByUserId: number }) => {
  try {
    const response = await fetch((`/api/comments`), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      },
      body: JSON.stringify(commentData)
    });
    const data = await response.json();

    if(!response.ok) {
      throw new Error('invalid comment API response, check network tab!');
    }

    return data;

  } catch (err) { 
    console.log('Error from data retrieval:', err);
    return [];
  }
}

// PUT /comments/:id - Update a comment by id
export const updateComment = async (commentId: number, commentData?: { content?: string, calendarYear?: number, calendarMonth?: number, calendarDay?: number, groupId?: number, createdByUserId?: number }) => {
  try {
    const response = await fetch((`/api/comments/${commentId}`), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      },
      body: JSON.stringify(commentData)
    });
    const data = await response.json();

    if(!response.ok) {
      throw new Error('invalid comment API response, check network tab!');
    }

    return data;

  } catch (err) { 
    console.log('Error from data retrieval:', err);
    return [];
  }
}

// DELETE /comments/:id - Delete a comment by id
export const deleteComment = async (commentId: number) => {
  try {
    const response = await fetch((`/api/comments/${commentId}`), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      },
    });
    const data = await response.json();

    if(!response.ok) {
      throw new Error('invalid comment API response, check network tab!');
    }

    return data;

  } catch (err) { 
    console.log('Error from data retrieval:', err);
    return [];
  }
}