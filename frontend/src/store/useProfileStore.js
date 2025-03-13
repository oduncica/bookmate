import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";

export const useProfileStore = create((set) => ({
  user: null,
  fetchUserProfile: async () => {
    try {
      const response = await axios.get("/auth/user");
      set({ user: response.data });
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des informations de l'utilisateur:",
        error.response?.data?.message || error.message
      );
    }
  },
  updateProfile: async (profileData) => {
    try {
      const response = await axios.put("/profile/update", profileData);
      set({ user: response.data });
      toast.success("Profil mis à jour avec succès");
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour du profil:",
        error.response?.data?.message || error.message
      );
      toast.error("Erreur lors de la mise à jour du profil");
    }
  },
}));

export default useProfileStore;
