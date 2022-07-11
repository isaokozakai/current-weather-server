import { register, login } from './utils/auth';
import { getCities } from './utils/cities';
import { getWeather } from './utils/weather';

export default {
  Query: {
    login: async (root: any, { name, password }: { name: string; password: string }) => {
      try {
        const user = await login({ name, password });

        return user;
      } catch (error: any) {
        throw error;
      }
    },
    cities: async (root: any, { search }: { search: string }, { user }: { user: string }) => {
      if (!user) {
        throw new Error('You are not authenticated!');
      }
      try {
        const cities = getCities(search);

        return cities;
      } catch (error: any) {
        throw error;
      }
    },
    weather: async (root: any, input: { lat: number; lon: number }, { user }: { user: string }) => {
      if (!user) {
        throw new Error('You are not authenticated!');
      }
      try {
        const weather = getWeather(input);

        return weather;
      } catch (error: any) {
        throw error;
      }
    },
  },
  Mutation: {
    register: async (root: any, { name, password }: { name: string; password: string }) => {
      try {
        const user = await register({ name, password });

        return user;
      } catch (error: any) {
        throw error;
      }
    },
  },
  Weather: {
    time: (root: any) => {
      return new Date(root.time).toISOString();
    },
  },
};
