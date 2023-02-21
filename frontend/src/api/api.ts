import {API_URL} from '../config';
import {Clients} from '../interfaces/api';

const options = {
  method: 'GET',
};

export const getAllClients = async () => {
  try {
    const response = await fetch(API_URL, options);
    const data = await response.json();

    return data;
  } catch (e) {
    console.log('error', e);
  }
};
export const createClient = async (data: Clients) => {
  try {
    await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    window.location.reload();
  } catch (e) {
    console.log('error', e);
  }
};

export const updateClient = async (id: string, data: Clients) => {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    window.location.reload();
  } catch (e) {
    console.log('error', e);
  }
};

export const deleteClient = async (id: string) => {
  try {
    await fetch(`${API_URL}/${id}`, {method: 'DELETE'});
    window.location.reload();
  } catch (e) {
    console.log('error', e);
  }
};
