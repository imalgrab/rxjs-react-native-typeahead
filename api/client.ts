const API_URL = 'https://api.api-ninjas.com/v1';
const API_KEY = 'oZngOqxkGY1WsgZCm6sQwn0XKQElajKaHWxOBi90';

export async function getAirportsByName(name: string): Promise<Airport[]> {
  try {
    const response = await fetch(`${API_URL}/airports?name=${name}`, {
      method: 'GET',
      headers: {
        'X-Api-Key': API_KEY,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Not found');
  }
}

export type Airport = {
  icao: string;
  name: string;
  country: string;
};
