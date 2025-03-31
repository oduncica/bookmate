import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";

export const useSuggestionsStore = create((set) => ({
  suggestions: [],
  fetchSuggestions: async () => {
    try {
      const response = await axios.get("/match/suggestions");
      console.log("Suggestions récupérées :", response.data); // Vérifiez que response.data est un tableau avec plusieurs livres
      set({ suggestions: response.data });
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des suggestions de livres:",
        error.response?.data?.message || error.message
      );
      set({ suggestions: [] }); // Assurez-vous que suggestions est toujours un tableau
    }
  },
  likeBook: async (bookId) => {
    try {
      await axios.post(`/match/like/${bookId}`);
      set((state) => {
        const updatedSuggestions = state.suggestions.filter(
          (book) => book.id !== bookId
        );
        if (updatedSuggestions.length === 0) {
          useSuggestionsStore.getState().fetchSuggestions(); // Rechargez les suggestions si la liste est vide
        }
        return { suggestions: updatedSuggestions };
      });
      toast.success('Livre ajouté à la catégorie "à lire"');
    } catch (error) {
      console.error(
        'Erreur lors de l\'ajout du livre à la catégorie "à lire":',
        error.response?.data?.message || error.message
      );
      toast.error('Erreur lors de l\'ajout du livre à la catégorie "à lire"');
    }
  },
  dislikeBook: async (bookId) => {
    try {
      await axios.post(`/match/dislike/${bookId}`);
      set((state) => {
        const updatedSuggestions = state.suggestions.filter(
          (book) => book.id !== bookId
        );
        if (updatedSuggestions.length === 0) {
          useSuggestionsStore.getState().fetchSuggestions(); // Rechargez les suggestions si la liste est vide
        }
        return { suggestions: updatedSuggestions };
      });
      toast.success('Livre ajouté à la catégorie "Pas intéressé"');
    } catch (error) {
      console.error(
        'Erreur lors de l\'ajout du livre à la catégorie "Pas intéressé":',
        error.response?.data?.message || error.message
      );
      toast.error(
        'Erreur lors de l\'ajout du livre à la catégorie "Pas intéressé"'
      );
    }
  },
  readBook: async (bookId) => {
    try {
      await axios.post(`/match/read/${bookId}`);
      set((state) => {
        const updatedSuggestions = state.suggestions.filter(
          (book) => book.id !== bookId
        );
        if (updatedSuggestions.length === 0) {
          useSuggestionsStore.getState().fetchSuggestions(); // Rechargez les suggestions si la liste est vide
        }
        return { suggestions: updatedSuggestions };
      });
      toast.success('Livre ajouté à la catégorie "Lu"');
    } catch (error) {
      console.error(
        'Erreur lors de l\'ajout du livre à la catégorie "Lu":',
        error.response?.data?.message || error.message
      );
      toast.error('Erreur lors de l\'ajout du livre à la catégorie "Lu"');
    }
  },
}));

export default useSuggestionsStore;
