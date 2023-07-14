import { paramsToQueryString } from './misc.js';

// TODO: It seems like CORS headers are missing on the server. Prefixing the URL with the "cors anywhere" host
//       is a workaround. It needs to be activated for your browser though by going to
//       https://cors-anywhere.herokuapp.com/corsdemo and clicking on the button.
const TM_API_URL = `https://cors-anywhere.herokuapp.com/${process.env.REACT_APP_API_URL}/tasks`;

const getTasks = async (category = null, sortBy = null, sortDir = null) => {
  const queryString = paramsToQueryString({ category, sortBy, sortDir });
  const url = `${TM_API_URL}${queryString}`;

  try {
    const res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

const createTask = async (data) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  };

  try {
    const res = await fetch(TM_API_URL, options);
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

const updateTask = async ({ status, name, category, dueDate, id }) => {
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status, name, category, dueDate }),
  };

  try {
    const res = await fetch(`${TM_API_URL}/${id}`, options);
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

const deleteTask = async (taskId) => {
  try {
    const res = await fetch(`${TM_API_URL}/${taskId}`, { method: 'DELETE' });
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

export {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
