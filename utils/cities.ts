import axios from 'axios';

export const citySearch = async (search: string) => {
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=ce1facfcbc13ddc8f017c1d19fef24f6`;

  try {
    const { data } = await axios.get(url);

    const cities = data.map((city: any) => {
      const { name, state, country, lat, lon } = city;

      return { name, state, country, lat, lon };
    });

    return cities;
  } catch (error: any) {
    throw new Error(error);
  }
};
