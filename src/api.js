export const BASE_URL = 'https://swapi.dev/api';

export const request = async(url, options) => {
  const response = await fetch(`${BASE_URL}${url}`, options);

  if (!response.ok) {
    throw new Error(`Failed to load data ${url}`);
  }

  try {
    const people = await response.json();
    return people.results;
  } catch {
    return response.text();
  }
};

export const getPeople = () => request('/people');
