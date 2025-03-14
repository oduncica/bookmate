import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  checkingAuth: true,
  loading: false,

  signup: async (signupData, navigate) => {
    try {
      set({ loading: true });
      const res = await axiosInstance.post("/auth/signup", signupData);
      set({ authUser: res.data.user });
      localStorage.setItem("jwt", res.data.token); // Stocker le token JWT
      // await axiosInstance.post("/auth/preferences", {
      //   bookPreferences: signupData.bookPreferences,
      // });
      toast.success("Account created successfully");
      navigate("/home"); // Rediriger vers la page d'accueil
    } catch (error) {
      toast.error(error.response?.data?.message);
      // toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      set({ loading: false });
    }
  },

  login: async (loginData) => {
    try {
      set({ loading: true });
      const res = await axiosInstance.post("/auth/login", loginData);
      set({ authUser: res.data.user });
      localStorage.setItem("jwt", res.data.token); // Stocker le token JWT
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(error.response?.data?.message);
      // toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      const res = await axiosInstance.post("/auth/logout");
      if (res.status === 200) {
        set({ authUser: null });
        localStorage.removeItem("jwt"); // Supprimer le token JWT
        toast.success("Logged out successfully");
      } else {
        toast.error("Failed to log out");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  },

  updateProfile: async ({ newBookPreferences, oldPassword, newPassword }) => {
    try {
      const response = await axiosInstance.put("/profile/update", {
        newBookPreferences,
        oldPassword,
        newPassword,
      });
      set({ authUser: response.data.user }); // Mettez à jour l'utilisateur dans le store
      toast.success("Profil mis à jour avec succès");
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour du profil:",
        error.response?.data?.message || error.message
      );
      toast.error("Erreur lors de la mise à jour du profil");
    }
  },

  checkAuth: async () => {
    try {
      const token = localStorage.getItem("jwt");
      if (token) {
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token}`;
        const res = await axiosInstance.get("/auth/me");
        set({ authUser: res.data.user });
      } else {
        set({ authUser: null });
      }
    } catch (error) {
      set({ authUser: null });
      console.log(error);
    } finally {
      set({ checkingAuth: false });
    }
  },

  setAuthUser: (user) => set({ authUser: user }),
}));
