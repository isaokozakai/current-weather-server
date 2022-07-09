import { citySearch } from './utils/cities';
import { weatherSearch } from './utils/weather';

export default {
  Query: {
    citySearch: async (root: any, { search }: { search: string }) => {
      try {
        return citySearch(search);
      } catch (error: any) {
        throw new Error(error);
      }
    },
    weatherSearch: async (root: any, input: { lat: number; lon: number }) => {
      try {
        return weatherSearch(input);
      } catch (error: any) {
        throw new Error(error);
      }
    },
  },
  Weather: {
    time: (root: any) => {
      return new Date(root.time).toISOString();
    },
  },
};
