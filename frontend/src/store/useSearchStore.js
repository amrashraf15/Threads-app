import { create } from 'zustand';
import axios from 'axios';

const API_URL = import.meta.env.MODE === "development" ? "http://localhost:8080/api/auth" : "/api/auth";
axios.defaults.withCredentials = true;

export const useSearchStore = create((set, get) => ({
  query: '',
  users: [],
  threads: [],
  loading: false,

  setQuery: (q) => set({ query: q }),

  search: async () => {
    const query = get().query.trim();
    if (!query) return;

    set({ loading: true });

    try {
      const res = await axios.get(`${API_URL}/search?query=${query}`);
      set({
        users: res.data.users,
        threads: res.data.threads,
      });
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      set({ loading: false });
    }
  },
}));
