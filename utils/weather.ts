import axios from 'axios';

export const getWeather = async (input: { lat: number; lon: number }): Promise<Object> => {
  const { lat, lon } = input;
  const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=ce1facfcbc13ddc8f017c1d19fef24f6`;

  try {
    const { data } = await axios.get(url);
    const { weather, main, dt } = data;
    const { main: state } = weather[0];
    const { temp, humidity } = main;

    return { state, temp, humidity, time: dt };
  } catch (error: any) {
    throw new Error(error);
  }
};
